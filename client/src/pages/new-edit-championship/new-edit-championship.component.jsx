import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

import {
  newChampionship,
  updateChampionship,
  deleteChampionship,
} from "../../redux/crud/crud.actions";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Container, Form as BSForm, Col, Button } from "react-bootstrap";

import Can from "../../components/can/can.component";
import FieldSelect from "../../components/field-select/field-select.component";

import "./new-edit-championship.styles.scss";

const NewEditChampionshipPage = ({
  match: {
    params: { s, chId },
  },
  uiData,
  ...otherProps
}) => {
  // wait for ui data to load.
  if (!uiData) return null;
  const thisSeries = uiData.series.find((e) => e.link === s);
  // return to dashboard if item type doesn't exist.
  if (!thisSeries) return <Redirect to="/" />;

  const championship = uiData.championships.find((e) => e._id === chId);

  return (
    <Can
      perform={["series:edit"]}
      on={{ seriesId: thisSeries._id }}
      yes={() => (
        <NewEditChampionshipPageCore
          thisSeries={thisSeries}
          championship={championship}
          currChampionships={uiData.championships.filter((e) => e._id !== chId)}
          uiData={uiData}
          {...otherProps}
        />
      )}
      no={() =>
        s ? (
          <Redirect to={`/${s}/championships`} />
        ) : (
          <Redirect to="/championships" />
        )
      }
    />
  );
};

const NewEditChampionshipPageCore = ({
  thisSeries,
  championship,
  currChampionships,
  uiData,
  newChampionship,
  updateChampionship,
  deleteChampionship,
  history,
}) => (
  <Container id="new-championship-page">
    <h2>{(championship ? "Edit" : "New") + " Championship"}</h2>
    <Formik
      initialValues={{
        _id: "",
        name: "",
        abbreviation: "",
        series: thisSeries._id,
        game: uiData.games[0]._id,
        region: uiData.regions[0]._id,
        tier: uiData.tiers[0]._id,
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(60, "Must be 60 characters or less")
          .notOneOf(currChampionships.map(({ name }) => name))
          .required("Required"),
        abbreviation: Yup.string()
          .max(15, "Must be 15 characters or less")
          .notOneOf(currChampionships.map(({ abbreviation }) => abbreviation))
          .required("Required"),
      })}
      onSubmit={(formValues, { setSubmitting }) => {
        const submission = {
          seriesLink: thisSeries.link,
          formValues,
          history,
        };
        if (championship) {
          updateChampionship(submission);
        } else {
          newChampionship(submission);
        }
        setSubmitting(false);
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
              disabled
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

const mapStateToProps = ({ ui: { uiData } }) => ({
  uiData,
});

const mapDispatchToProps = (dispatch) => ({
  newChampionship: (data) => dispatch(newChampionship(data)),
  updateChampionship: (data) => dispatch(updateChampionship(data)),
  deleteChampionship: (data) => dispatch(deleteChampionship(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewEditChampionshipPage));
