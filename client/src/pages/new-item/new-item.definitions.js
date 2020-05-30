import React from "react";
import * as Yup from "yup";

import { Form, Field, ErrorMessage } from "formik";
import { Form as BSForm, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import FieldSelect from "../../components/field-select/field-select.component";
import FieldMultiSelect from "../../components/field-multiselect/field-multiselect.component";

import { yearRange } from "../../utilities/yearRange";

export const itemDict = {
  series: {
    modelName: "Series",
    plural: "series",
    relatedCollections: [],
    initialValues: { name: "", link: "" },
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
      <BSForm as={Form}>
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </BSForm>
    ),
  },
  region: {
    modelName: "Region",
    plural: "regions",
    relatedCollections: [],
    initialValues: { name: "" },
    validationSchema: (currItems) =>
      Yup.object({
        name: Yup.string()
          .min(2, "Must be 2 characters or more")
          .max(15, "Must be 15 characters or less")
          .notOneOf(currItems.map(({ name }) => name))
          .required("Required"),
      }),
    form: () => (
      <BSForm as={Form}>
        <BSForm.Row>
          <BSForm.Group as={Col}>
            <BSForm.Label htmlFor="name">Name</BSForm.Label>
            <BSForm.Control as={Field} name="name" type="text" />
            <BSForm.Text className="text-danger">
              <ErrorMessage name="name" />
            </BSForm.Text>
          </BSForm.Group>
        </BSForm.Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </BSForm>
    ),
  },
  tier: {
    modelName: "Tier",
    plural: "tiers",
    relatedCollections: [],
    initialValues: { name: "", colour: "" },
    validationSchema: (currItems) =>
      Yup.object({
        name: Yup.string()
          .max(15, "Must be 15 characters or less")
          .notOneOf(currItems.map(({ name }) => name))
          .required("Required"),
        colour: Yup.string(),
      }),
    form: () => (
      <BSForm as={Form}>
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </BSForm>
    ),
  },
  game: {
    modelName: "Game",
    plural: "games",
    relatedCollections: ["cars", "tracks"],
    initialValues: { name: "", year: [] },
    validationSchema: () =>
      Yup.object({
        name: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
      }),
    form: ({ cars, tracks }) => (
      <BSForm as={Form}>
        <BSForm.Row>
          <BSForm.Group as={Col} xs={12} md={12}>
            <BSForm.Label htmlFor="name">Name</BSForm.Label>
            <BSForm.Control as={Field} name="name" type="text" />
            <BSForm.Text className="text-danger">
              <ErrorMessage name="model" />
            </BSForm.Text>
          </BSForm.Group>
          <BSForm.Group as={Col} xs={12} md={6}>
            <BSForm.Label htmlFor="cars">Cars</BSForm.Label>
            <BSForm.Control
              as={FieldMultiSelect}
              name="cars"
              options={cars.map(({ _id, year, make, model }) => ({
                value: _id,
                text: `${year} ${make} ${model}`,
              }))}
            />
            <BSForm.Text className="text-danger">
              <ErrorMessage name="cars" />
            </BSForm.Text>
          </BSForm.Group>
          <BSForm.Group as={Col} xs={12} md={6}>
            <BSForm.Label htmlFor="tracks">Tracks</BSForm.Label>
            <BSForm.Control
              as={FieldMultiSelect}
              name="tracks"
              options={tracks.map(({ _id, name, year }) => ({
                value: _id,
                text: `${year} ${name}`,
              }))}
            />
            <BSForm.Text className="text-danger">
              <ErrorMessage name="cars" />
            </BSForm.Text>
          </BSForm.Group>
        </BSForm.Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </BSForm>
    ),
  },
  car: {
    modelName: "Car",
    plural: "cars",
    relatedCollections: [],
    initialValues: { model: "", make: "", year: yearRange()[0] },
    validationSchema: () =>
      Yup.object({
        model: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        make: Yup.string().required("Required"),
      }),
    form: () => (
      <BSForm as={Form}>
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </BSForm>
    ),
  },
  track: {
    modelName: "Track",
    plural: "tracks",
    relatedCollections: [],
    initialValues: { name: "", year: yearRange()[0] },
    validationSchema: () =>
      Yup.object({
        name: Yup.string().required("Required"),
      }),
    form: () => (
      <BSForm as={Form}>
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </BSForm>
    ),
  },
};
