const collections = require("../models/collections");

const checkPermissions = require("../client/src/authorisation/authorisation");

module.exports = (app) => {
  app.route("/api/item").post(async (req, res) => {
    if (!checkPermissions(global.roles, req.user.role, ["dashboard:edit"])) {
      res.status(403).send({ error: "Access denied." });
      return;
    }

    const { collection, formValues } = req.body;

    try {
      const Collection = collections[collection];
      const newItem = new Collection(formValues);
      await newItem.save();
      res.status(200).send(newItem);
    } catch (error) {
      res.status(422).send(error);
    }
  });

  app.route("/api/:driverId").get(async (req, res) => {
    console.log("test");
    try {
      // let data = await Result.find({ driverId: req.params.driverId });
    } catch (error) {
      res.json(error);
    }
  });
};
