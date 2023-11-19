const User = require("../models/usersModel");

exports.handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  try {
    // if exist will delete the refresh token
    await User.findOneAndUpdate(
      { refreshToken },
      { $unset: { refreshToken } }
    ).exec();

    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      // secure: true,        (for https)
    });

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
