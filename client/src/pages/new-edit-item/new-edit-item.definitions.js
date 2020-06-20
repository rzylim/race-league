import React from "react";
import * as Yup from "yup";

import { Field, ErrorMessage } from "formik";
import { Form as BSForm, Col } from "react-bootstrap";

import FieldSelect from "../../components/field-select/field-select.component";
import FieldEasyMultiSelect from "../../components/field-easy-multi-select/field-easy-multi-select.component";

import CarItem from "../../components/car-item/car-item.component";
import TrackItem from "../../components/track-item/track-item.component";
import DriverItem from "../../components/driver-item/driver-item.component";
import TeamItem from "../../components/team-item/team-item.component";

import { yearRange } from "../../utilities/yearRange";

export const itemDict = () => ({
  series: {
    modelName: "Series",
    plural: "series",
    relatedCollections: [],
    perform: ["dashboard:edit"],
    initialValues: (item) => (item ? item : { _id: "", name: "", link: "" }),
    validationSchema: (currItems) =>
      Yup.object({
        name: Yup.string()
          .min(2, "Must be 2 characters or more")
          .max(15, "Must be 15 characters or less")
          .notOneOf(currItems.map(({ name }) => name))
          .required("Required"),
        link: Yup.string()
          .min(2, "Must be 2 characters or more")
          .max(15, "Must be 15 characters or less")
          .notOneOf(currItems.map(({ link }) => link))
          .required("Required"),
      }),
    form: () => (
      <>
        <BSForm.Row>
          <BSForm.Group as={Col} xs={8}>
            <BSForm.Label htmlFor="name">Name</BSForm.Label>
            <BSForm.Control as={Field} name="name" type="text" />
            <BSForm.Text className="text-danger">
              <ErrorMessage name="name" />
            </BSForm.Text>
          </BSForm.Group>
          <BSForm.Group as={Col} xs={4}>
            <BSForm.Label htmlFor="link">Link</BSForm.Label>
            <BSForm.Control as={Field} name="link" type="text" />
            <BSForm.Text className="text-danger">
              <ErrorMessage name="link" />
            </BSForm.Text>
          </BSForm.Group>
        </BSForm.Row>
      </>
    ),
  },
  region: {
    modelName: "Region",
    plural: "regions",
    relatedCollections: [],
    perform: ["dashboard:edit"],
    initialValues: (item) => (item ? item : { _id: "", name: "" }),
    validationSchema: (currItems) =>
      Yup.object({
        name: Yup.string()
          .min(2, "Must be 2 characters or more")
          .max(15, "Must be 15 characters or less")
          .notOneOf(currItems.map(({ name }) => name))
          .required("Required"),
      }),
    form: () => (
      <>
        <BSForm.Row>
          <BSForm.Group as={Col}>
            <BSForm.Label htmlFor="name">Name</BSForm.Label>
            <BSForm.Control as={Field} name="name" type="text" />
            <BSForm.Text className="text-danger">
              <ErrorMessage name="name" />
            </BSForm.Text>
          </BSForm.Group>
        </BSForm.Row>
      </>
    ),
  },
  tier: {
    modelName: "Tier",
    plural: "tiers",
    relatedCollections: [],
    perform: ["dashboard:edit"],
    initialValues: (item) => (item ? item : { _id: "", name: "", colour: "" }),
    validationSchema: (currItems) =>
      Yup.object({
        name: Yup.string()
          .max(15, "Must be 15 characters or less")
          .notOneOf(currItems.map(({ name }) => name))
          .required("Required"),
        colour: Yup.string(),
      }),
    form: () => (
      <>
        <BSForm.Row>
          <BSForm.Group as={Col} xs={12} md={8}>
            <BSForm.Label htmlFor="name">Name</BSForm.Label>
            <BSForm.Control as={Field} name="name" type="text" />
            <BSForm.Text className="text-danger">
              <ErrorMessage name="name" />
            </BSForm.Text>
          </BSForm.Group>
          <BSForm.Group as={Col} xs={12} md={4}>
            <BSForm.Label htmlFor="colour">Colour</BSForm.Label>
            <BSForm.Control as={Field} name="colour" type="text" />
            <BSForm.Text className="text-danger">
              <ErrorMessage name="colour" />
            </BSForm.Text>
          </BSForm.Group>
        </BSForm.Row>
      </>
    ),
  },
  game: {
    modelName: "Game",
    plural: "games",
    relatedCollections: ["cars", "tracks"],
    perform: ["dashboard:edit"],
    initialValues: (item) =>
      item
        ? {
            ...item,
            cars: new Set(Object.keys(item.cars)),
            tracks: new Set(Object.keys(item.tracks)),
          }
        : {
            _id: "",
            name: "",
            cars: new Set(),
            tracks: new Set(),
          },
    validationSchema: (currItems) =>
      Yup.object({
        name: Yup.string()
          .max(20, "Must be 20 characters or less")
          .notOneOf(currItems.map(({ name }) => name))
          .required("Required"),
      }),
    form: ({ cars, tracks }) => (
      <>
        <BSForm.Row>
          <BSForm.Group as={Col} xs={12} md={12}>
            <BSForm.Label htmlFor="name">Name</BSForm.Label>
            <BSForm.Control as={Field} name="name" type="text" />
            <BSForm.Text className="text-danger">
              <ErrorMessage name="name" />
            </BSForm.Text>
          </BSForm.Group>
          <FieldEasyMultiSelect
            name="cars"
            label="Cars"
            options={cars}
            Component={CarItem}
          />
          <FieldEasyMultiSelect
            name="tracks"
            label="Tracks"
            options={tracks}
            Component={TrackItem}
          />
        </BSForm.Row>
      </>
    ),
  },
  car: {
    modelName: "Car",
    plural: "cars",
    relatedCollections: [],
    perform: ["dashboard:edit"],
    initialValues: (item) =>
      item ? item : { _id: "", model: "", make: "", year: yearRange()[0] },
    validationSchema: () =>
      Yup.object({
        model: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        make: Yup.string().required("Required"),
      }),
    form: () => (
      <>
        <BSForm.Row>
          <BSForm.Group as={Col} xs={12} md={6}>
            <BSForm.Label htmlFor="model">Model</BSForm.Label>
            <BSForm.Control as={Field} name="model" type="text" />
            <BSForm.Text className="text-danger">
              <ErrorMessage name="model" />
            </BSForm.Text>
          </BSForm.Group>
          <BSForm.Group as={Col} xs={9} md={4}>
            <BSForm.Label htmlFor="make">Make</BSForm.Label>
            <BSForm.Control as={Field} name="make" type="text" />
            <BSForm.Text className="text-danger">
              <ErrorMessage name="make" />
            </BSForm.Text>
          </BSForm.Group>
          <BSForm.Group as={Col} xs={3} md={2}>
            <BSForm.Label htmlFor="year">Year</BSForm.Label>
            <BSForm.Control
              as={FieldSelect}
              name="year"
              options={yearRange().map((year) => ({
                value: year,
                text: year,
              }))}
            />
            <BSForm.Text className="text-danger">
              <ErrorMessage name="year" />
            </BSForm.Text>
          </BSForm.Group>
        </BSForm.Row>
      </>
    ),
  },
  track: {
    modelName: "Track",
    plural: "tracks",
    relatedCollections: [],
    perform: ["dashboard:edit"],
    initialValues: (item) =>
      item ? item : { _id: "", name: "", year: yearRange()[0] },
    validationSchema: () =>
      Yup.object({
        name: Yup.string().required("Required"),
      }),
    form: () => (
      <>
        <BSForm.Row>
          <BSForm.Group as={Col} xs={9} md={10}>
            <BSForm.Label htmlFor="name">Name</BSForm.Label>
            <BSForm.Control as={Field} name="name" type="text" />
            <BSForm.Text className="text-danger">
              <ErrorMessage name="name" />
            </BSForm.Text>
          </BSForm.Group>
          <BSForm.Group as={Col} xs={3} md={2}>
            <BSForm.Label htmlFor="year">Year</BSForm.Label>
            <BSForm.Control
              as={FieldSelect}
              name="year"
              options={yearRange().map((year) => ({
                value: year,
                text: year,
              }))}
            />
            <BSForm.Text className="text-danger">
              <ErrorMessage name="year" />
            </BSForm.Text>
          </BSForm.Group>
        </BSForm.Row>
      </>
    ),
  },
  team: {
    modelName: "Team",
    plural: "teams",
    relatedCollections: [],
    perform: ["dashboard:edit"],
    initialValues: (item) => (item ? item : { _id: "", name: "" }),
    validationSchema: () =>
      Yup.object({
        name: Yup.string()
          .required("Required")
          .min(2, "Must be 20 characters or less")
          .max(20, "Must be 20 characters or less"),
      }),
    form: () => (
      <>
        <BSForm.Row>
          <BSForm.Group as={Col}>
            <BSForm.Label htmlFor="name">Name</BSForm.Label>
            <BSForm.Control as={Field} name="name" type="text" />
            <BSForm.Text className="text-danger">
              <ErrorMessage name="name" />
            </BSForm.Text>
          </BSForm.Group>
        </BSForm.Row>
      </>
    ),
  },
  championship: {
    modelName: "Championship",
    plural: "championships",
    relatedCollections: ["users", "teams"],
    perform: ["series:edit"],
    initialValues: (championship, thisSeries, uiData) =>
      championship
        ? {
            _id: championship._id,
            name: championship.name,
            abbreviation: championship.abbreviation,
            series: championship.series._id,
            game: championship.game._id,
            region: championship.region._id,
            tier: championship.tier._id,
            drivers: new Set(Object.keys(championship.drivers)),
            teams: new Set(Object.keys(championship.teams)),
          }
        : {
            _id: "",
            name: "",
            abbreviation: "",
            series: thisSeries._id,
            game: Object.keys(uiData.games)[0],
            region: Object.keys(uiData.regions)[0],
            tier: Object.keys(uiData.tiers)[0],
            drivers: new Set(),
            teams: new Set(),
          },
    validationSchema: (currItems) =>
      Yup.object({
        name: Yup.string()
          .max(60, "Must be 60 characters or less")
          .notOneOf(currItems.map(({ name }) => name))
          .required("Required"),
        abbreviation: Yup.string()
          .max(15, "Must be 15 characters or less")
          .notOneOf(currItems.map(({ abbreviation }) => abbreviation))
          .required("Required"),
      }),
    form: ({ users, teams }, uiData) => (
      <>
        <BSForm.Row>
          <BSForm.Group as={Col} xs={12} md={9}>
            <BSForm.Label htmlFor="name">Name</BSForm.Label>
            <BSForm.Control as={Field} name="name" type="text" />
            <BSForm.Text className="text-danger">
              <ErrorMessage name="name" />
            </BSForm.Text>
          </BSForm.Group>
          <BSForm.Group as={Col} xs={12} md={3}>
            <BSForm.Label htmlFor="abbreviation">Abbreviation</BSForm.Label>
            <BSForm.Control as={Field} name="abbreviation" type="text" />
            <BSForm.Text className="text-danger">
              <ErrorMessage name="abbreviation" />
            </BSForm.Text>
          </BSForm.Group>
        </BSForm.Row>
        <BSForm.Row>
          <BSForm.Group as={Col} xs={6} md={4}>
            <BSForm.Label htmlFor="series">Series</BSForm.Label>
            <BSForm.Control
              as={FieldSelect}
              name="series"
              options={Object.entries(uiData.series).map(([_id, { name }]) => ({
                value: _id,
                text: name,
              }))}
            />
          </BSForm.Group>
          <BSForm.Group as={Col} xs={6} md={3}>
            <BSForm.Label htmlFor="game">Game</BSForm.Label>
            <BSForm.Control
              as={FieldSelect}
              name="game"
              options={Object.entries(uiData.games).map(([_id, { name }]) => ({
                value: _id,
                text: name,
              }))}
            />
          </BSForm.Group>
          <BSForm.Group as={Col} xs={8} md={3}>
            <BSForm.Label htmlFor="region">Region</BSForm.Label>
            <BSForm.Control
              as={FieldSelect}
              name="region"
              options={Object.entries(uiData.regions).map(
                ([_id, { name }]) => ({
                  value: _id,
                  text: name,
                })
              )}
            />
          </BSForm.Group>
          <BSForm.Group as={Col} xs={4} md={2}>
            <BSForm.Label htmlFor="tier">Tier</BSForm.Label>
            <BSForm.Control
              as={FieldSelect}
              name="tier"
              options={Object.entries(uiData.tiers).map(([_id, { name }]) => ({
                value: _id,
                text: name,
              }))}
            />
          </BSForm.Group>
          <FieldEasyMultiSelect
            name="drivers"
            label="Drivers"
            options={users}
            Component={DriverItem}
          />
          <FieldEasyMultiSelect
            name="teams"
            label="Teams"
            options={teams}
            Component={TeamItem}
          />
        </BSForm.Row>
      </>
    ),
  },
});
