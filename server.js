const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const compression = require("compression");
const enforce = require("express-sslify");

const passport = require("passport");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

require("./models/User");
require("./services/passport");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());

app.use(passport.initialize());

require("./routes/authRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(compression());
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(PORT, error => {
  if (error) throw error;
  console.log("Server running on port " + PORT);
});
