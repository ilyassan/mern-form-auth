require("dotenv").config();
const express = require("express");
const app = express();
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");

const mongoose = require("mongoose");
const connectDB = require("./config/dbConnection");

const registerRoute = require("./routes/register");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const refreshRoute = require("./routes/refresh");
const logoutRoute = require("./routes/logout");

const PORT = process.env.PORT || 3500;

// connect to database
connectDB();

// Access-Control-Allow-Credentials
app.use(credentials);

// CORS
app.use(cors(corsOptions));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// routes
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);
app.use("/auth", authRoute);
app.use("/refresh", refreshRoute);

app.use(verifyJWT); //  verify jwt only in the routes under
app.use("/", usersRoute);

mongoose.connection.on("error", () => {
  console.log("Connection Error!");
});

mongoose.connection.once("open", () => {
  console.log("connect to database");
  // start server listening
  app.listen(PORT, () => console.log(`server listen on port ${PORT}`));
});
