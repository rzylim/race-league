const express = require("express");
const router = express.Router();

const collections = require("../models/collections");
const checkPermissions = require("../client/src/authorisation/authorisation");

router.route("/new").post(async (req, res) => {
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

router
  .route("/:_id")
  .put(async (req, res) => {
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
  })
  .delete(async (req, res) => {
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

module.exports = router;
