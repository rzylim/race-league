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
      modelName,
      formValues: { _id, ...data },
    } = req.body;

    try {
      const newItem = await collections[modelName].create(data);
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
      modelName,
      formValues: { _id, ...update },
    } = req.body;

    try {
      const updatedItem = await collections[modelName].findByIdAndUpdate(
        _id,
        update,
        { new: true }
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

    const {
      modelName,
      formValues: { _id },
    } = req.body;

    try {
      await collections[modelName].findByIdAndDelete(_id);
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

router.route("/championship/sub").put(async (req, res) => {
  const { seriesPermissions, championshipPermissions } = req.user;

  const {
    formValues: { seriesId, championshipId, _id, ...data },
  } = req.body;

  if (
    !checkPermissions(
      global.roles,
      req.user.role,
      ["championships:edit"],
      {
        seriesId,
        championshipId,
      },
      { seriesPermissions, championshipPermissions }
    )
  ) {
    res.status(403).send({ error: "Access denied." });
    return;
  }

  try {
    const series = await collections.Series.findById(seriesId);
    const championship = await collections.Championship.findById(
      championshipId
    );

    if (!series || !championship) {
      res.status(422).send({ error: "Invalid seriesId or championshipId" });
      return;
    }

    if (!_id) {
      // create new subitem
      championship.rounds.push(data);
    } else if (data.name) {
      // update item
      const ind = championship.rounds.findIndex((round) => round._id == _id);
      Object.entries(data).forEach(([key, value]) => {
        championship.rounds[ind][key] = value;
      });
    } else {
      // delete item
      const ind = championship.rounds.findIndex((round) => round._id == _id);
      championship.rounds = championship.rounds.filter(
        (round) => round._id != _id
      );
    }
    await championship.save();

    const updatedChampionship = await collections.Championship.findById(
      championshipId
    )
      .select("-__v")
      .populate("series")
      .populate("game")
      .populate("region")
      .populate("tier");
    res.status(200).send(updatedChampionship);
  } catch (error) {
    res.status(422).send(error);
  }
});

module.exports = router;
