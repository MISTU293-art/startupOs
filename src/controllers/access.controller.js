import accessModel from "../models/access.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function AuthRegister(req, res) {
  try {
    const {
      fullName,
      email,
      username,
      password,
      role,
      status = "active",
    } = req.body;

    const isUserExists = await accessModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserExists) {
      return res.status(409).json({
        message: "User Exists Already",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await accessModel.create({
      fullName,
      email,
      username,
      password: hashedPassword,
      role,
      status,
    });

    const accessToken = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "7d",
      },
    );
    const refreshToken = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.REFRSH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
    );
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();
    return res.status(201).json({
      message: "User Created",
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await accessModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "No user Found",
      });
    }

    if (user.status === "blocked") {
      return res.status(401).json({
        message: "Your Account is Blocked .Contact Your Hr.",
      });
    }
    const isPassowrdMatched = await bcrypt.compare(password, user.password);
    if (!isPassowrdMatched) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }
    const accessToken = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
    );
    const refreshToken = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.REFRSH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      },
    );

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Logged Is SuccessFull",
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
async function logOut(req, res) {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "strict",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
        message:"Logout SuccessFully"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        message:"Can't Logout Please Try After Sometime later. "
    })
  }
}
export { AuthRegister, loginUser,logOut };
