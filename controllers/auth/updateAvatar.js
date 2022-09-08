const fs = require("fs/promises");
const path = require("path");
const jimp = require("jimp");
const { User } = require("../../models/user");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
const updateAvatar = async (req, res) => {
  try {
    const { path: tmpUpload, filename } = req.file;
    const { _id } = req.user;
    const [extension] = filename.split(".").reverse();
    const avatarName = `${_id}.${extension}`;
    const resultUpload = path.join(avatarsDir, avatarName);
    // Read the image.
    const image = await jimp.read(tmpUpload);
    await image.resize(250, 250);
    // Save and overwrite the image
    await image.writeAsync(tmpUpload);

    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join("avatar", resultUpload);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
