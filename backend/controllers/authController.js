const User = require("../models/usersModel");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.handleLogin = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  try {
    const userFound = await User.findOne({ name: name }).exec();
    if (!userFound)
      return res.status(401).json({ message: "Username not found." });

    const PwdMatched = await bcrypt.compare(password, userFound.password);
    if (PwdMatched) {
      // create JWT
      const accessToken = jwt.sign(
        { username: userFound.name },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
      );
      const refreshToken = jwt.sign(
        { username: userFound.name },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      await userFound.updateOne({ refreshToken }).exec();

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        // secure: true,        (for https)
        maxAge: 24 * 60 * 60 * 100,
      });
      return res.json({ accessToken });
    }

    res.status(401).json({ message: "Password is incorrect" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
