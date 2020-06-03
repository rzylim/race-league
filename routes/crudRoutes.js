const collections = require("../models/collections");

const checkPermissions = require("../client/src/authorisation/authorisation");

module.exports = (app) => {
  app.route("/api/item/new").post(async (req, res) => {
    if (!checkPermissions(global.roles, req.user.role, ["dashboard:edit"])) {
      res.status(403).send({ error: "Access denied." });
      return;
    }

    const {
      collection,
      formValues: { _id, ...data },
    } = req.body;

    try {
      const newItem = await collections[collection].create(data);
      res.status(200).send(newItem);
    } catch (error) {
      res.status(422).send(error);
    }
  });

  app.route("/api/item/:_id").put(async (req, res) => {
    if (!checkPermissions(global.roles, req.user.role, ["dashboard:edit"])) {
      res.status(403).send({ error: "Access denied." });
      return;
    }

    const {
      collection,
      formValues: { _id, ...update },
    } = req.body;

    try {
      await collections[collection].findByIdAndUpdate(_id, update);
      res.status(200).send("Update successful!");
    } catch (error) {
      res.status(422).send(error);
    }
  });

  app.route("/api/item/:_id").delete(async (req, res) => {
    if (!checkPermissions(global.roles, req.user.role, ["dashboard:edit"])) {
      res.status(403).send({ error: "Access denied." });
      return;
    }

    const { collection } = req.body;

    try {
      await collections[collection].findByIdAndDelete(req.params._id);
      res.status(200).send("Delete successful!");
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
