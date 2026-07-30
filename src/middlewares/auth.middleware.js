import jwt from "jsonwebtoken";

async function isLoggedIn(req, res, next) {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
}
async function isUserAdminAndHrAndAccounts(req, res, next) {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({
        message: "Unauthrized",
      });
    }
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (decoded.role == "employee" || decoded.role == "it") {
      return res.status(401).json({
        message: "You Have Not Access",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function isUserHrandAdmin(req, res, next) {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (decoded.role != "admin" && decoded.role != "hr") {
      return res.status(401).json({
        message: "You Have Not Access This Page",
      });
    }
    req.user=decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
export { isLoggedIn, isUserAdminAndHrAndAccounts ,isUserHrandAdmin};
