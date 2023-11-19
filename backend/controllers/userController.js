const User = require("../models/usersModel");
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().exec();
    if (!users) return res.json({ message: "No users found." });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.registerUser = async (req, res) => {
  const name = req.body.name.toLowerCase();
  const password = req.body.password;

  if (!name || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  try {
    const isNameUsed = await User.findOne({ name: name }).exec();

    if (isNameUsed)
      return res.status(409).json({ message: "Username is taken." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const userInfo = {
      name,
      password: hashedPassword,
    };

    await User.create(userInfo);

    res
      .status(201)
      .json({ message: `User ${userInfo.name} signup successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const currentName = req.body.currentName?.toLowerCase();
  const password = req.body.password;
  const newName = req.body.newName?.toLowerCase();

  if (!currentName || !password || !newName)
    return res.status(400).json({
      message: "The infos are required ( oldName, password, newName )",
    });

  if (currentName === newName)
    return res.status(400).json({
      message: "New username must be different of the current",
    });

  try {
    const usersFound = await User.find({
      name: { $in: [currentName, newName] },
    }).exec();

    if (usersFound.length === 0 || usersFound[0]?.name === newName)
      return res
        .status(401)
        .json({ message: "Your current username not found." });

    const PwdMatched = await bcrypt.compare(password, usersFound[0].password);
    if (!PwdMatched)
      return res.status(401).json({ message: "Password is incorrect." });

    if (usersFound.length === 2)
      return res.status(409).json({ message: "Username you choose is taken." });

    await usersFound[0].updateOne({ name: newName });

    res.status(200).json({
      message: `Your username has been change successfully to ${newName}`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
