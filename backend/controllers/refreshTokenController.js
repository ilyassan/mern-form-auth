const User = require("../models/usersModel");

const jwt = require("jsonwebtoken");

exports.handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  try {
    const userFound = await User.findOne({ refreshToken }).exec();
    if (!userFound) return res.sendStatus(403); // Forbidden

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decode) => {
        if (err) return res.sendStatus(403);

        const accessToken = jwt.sign(
          { username: decode.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "10s" }
        );

        res.json({ accessToken });
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
