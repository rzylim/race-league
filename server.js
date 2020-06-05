const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const compression = require("compression");
const enforce = require("express-sslify");

const passport = require("passport");
const cookieSession = require("cookie-session");

const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);
require("./models/registerModels");
require("./services/passport");

// for role authorisation, sets global.roles asynchronously
require("./services/roles");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

const authRouter = require("./routes/authRoutes");
const uiRouter = require("./routes/uiRoutes");
const crudRouter = require("./routes/crudRoutes");

app.use("/auth", authRouter);
app.use("/api/ui_data", uiRouter);
app.use("/api/item", crudRouter);

if (process.env.NODE_ENV === "production") {
  app.use(compression());
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log("Server running on port " + PORT);
});
