import React from "react";
import * as Yup from "yup";

import { Field, ErrorMessage } from "formik";
import { Form as BSForm, Col } from "react-bootstrap";

import FieldSelect from "../../components/field-select/field-select.component";
import FieldEasyMultiSelect from "../../components/field-easy-multi-select/field-easy-multi-select.component";

import CarItem from "../../components/car-item/car-item.component";
import TrackItem from "../../components/track-item/track-item.component";

import { yearRange } from "../../utilities/yearRange";

export const itemDict = () => ({
  series: {
    modelName: "Series",
    plural: "series",
    relatedCollections: [],
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
    initialValues: (item) =>
      item
        ? { ...item, cars: new Set(item.cars), tracks: new Set(item.tracks) }
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
    initialValues: (item) => (item ? item : { _id: "", name: "" }),
    validationSchema: () =>
      Yup.object({
        name: Yup.string().required("Required"),
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
});
