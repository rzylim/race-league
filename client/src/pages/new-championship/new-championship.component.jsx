import React from "react";
import { connect } from "react-redux";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Container from "react-bootstrap/Container";
import { Form as BSForm, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import FieldSelect from "../../components/field-select/field-select.component";

import "./new-championship.styles.scss";

const NewChampionshipPage = ({
  match: {
    params: { s },
  },
  uiData,
}) => {
  if (!uiData) return <div />;

  // check series type
  const thisSeries = uiData.series.find((e) => e.link === s);
  console.log(thisSeries);

  return (
    <Container className="new-championship-page">
      <h2 className="title">New Championship</h2>
      <Formik
        initialValues={{ name: "", abbreviation: "", email: "" }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(60, "Must be 60 characters or less")
            .required("Required"),
          abbreviation: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <BSForm as={Form}>
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
                options={uiData.series.map(({ _id, name }) => ({
                  value: _id,
                  text: name,
                }))}
                defaultValue={thisSeries._id}
              />
            </BSForm.Group>
            <BSForm.Group as={Col} xs={6} md={3}>
              <BSForm.Label htmlFor="game">Game</BSForm.Label>
              <BSForm.Control
                as={FieldSelect}
                name="game"
                options={uiData.games.map(({ _id, name }) => ({
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
                options={uiData.regions.map(({ _id, name }) => ({
                  value: _id,
                  text: name,
                }))}
              />
            </BSForm.Group>
            <BSForm.Group as={Col} xs={4} md={2}>
              <BSForm.Label htmlFor="tier">Tier</BSForm.Label>
              <BSForm.Control
                as={FieldSelect}
                name="tier"
                options={uiData.tiers.map(({ _id, name }) => ({
                  value: _id,
                  text: name,
                }))}
              />
            </BSForm.Group>
          </BSForm.Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </BSForm>
      </Formik>
    </Container>
  );
};

const mapStateToProps = ({ ui: { uiData } }) => ({
  uiData,
});

export default connect(mapStateToProps)(NewChampionshipPage);
