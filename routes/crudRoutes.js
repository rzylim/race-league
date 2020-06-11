const express = require("express");
const router = express.Router();

const collections = require("../models/collections");
const checkPermissions = require("../client/src/authorisation/authorisation");

router
  .route("/item")
  .post(async (req, res) => {
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
  })
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
      const updatedItem = await collections[collection].findByIdAndUpdate(
        _id,
        update
      );
      res.status(200).send(updatedItem);
    } catch (error) {
      res.status(422).send(error);
    }
  })
  .delete(async (req, res) => {
    if (!checkPermissions(global.roles, req.user.role, ["dashboard:edit"])) {
      res.status(403).send({ error: "Access denied." });
      return;
    }

    const { collection, _id } = req.body;

    try {
      await collections[collection].findByIdAndDelete(_id);
      res.status(200).send("Delete successful!");
    } catch (error) {
      res.status(422).send(error);
    }
  });

router
  .route("/championship")
  .post(async (req, res) => {
    const { seriesPermissions, championshipPermissions } = req.user;
    if (
      !checkPermissions(
        global.roles,
        req.user.role,
        ["series:edit"],
        { seriesId: req.body.formValues.series },
        { seriesPermissions, championshipPermissions }
      )
    ) {
      res.status(403).send({ error: "Access denied." });
      return;
    }

    const {
      formValues: { _id, ...data },
    } = req.body;

    try {
      const newChampionship = await collections.Championship.create(data);
      res.status(200).send(newChampionship);
    } catch (error) {
      res.status(422).send(error);
    }
  })
  .put(async (req, res) => {
    const { seriesPermissions, championshipPermissions } = req.user;
    if (
      !checkPermissions(
        global.roles,
        req.user.role,
        ["series:edit"],
        { seriesId: req.body.formValues.series },
        { seriesPermissions, championshipPermissions }
      )
    ) {
      res.status(403).send({ error: "Access denied." });
      return;
    }

    const {
      formValues: { _id, ...update },
    } = req.body;

    try {
      const updatedChampionship = await collections.Championship.findByIdAndUpdate(
        _id,
        update
      );
      res.status(200).send(updatedChampionship);
    } catch (error) {
      res.status(422).send(error);
    }
  });

module.exports = router;
