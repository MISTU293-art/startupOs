import ImageKit from "@imagekit/nodejs";

const imagekitClient = new ImageKit({
  privateKey: "private_SxJWcktmKFa5go1xag3HvEhPKWA=",
});

async function uploadFile(buffer) {
  try {
    const result = await imagekitClient.files.upload({
      file:buffer,
      fileName: "file",
      folder: "startupOs",
    });
    return result;
  } catch (error) {
    console.log("Imagekit Error", error);
  }
}

export { uploadFile };
