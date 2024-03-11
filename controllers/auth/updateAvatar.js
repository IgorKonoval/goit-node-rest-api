const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/users.js");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  if (!req.file) {
    res.status(400).json({ message: "Please upload an image file" });
  }

  const { path: tmpDir, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultDir = path.join(avatarsDir, filename);
  await fs.rename(tmpDir, resultDir);
  
  const img = await Jimp.read(resultDir);
  await img.resize(250, 250).write(resultDir);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };
