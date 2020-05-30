import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { submitNewItem } from "../../redux/ui/ui.actions";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Container from "react-bootstrap/Container";
import { Form as BSForm, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import Can from "../../components/can/can.component";

import "./new-region.styles.scss";

const NewRegionPage = ({ uiData, ...otherProps }) => {
  if (!uiData || !uiData.regions) return null;

  return (
    <Can
      perform={["dashboard:edit"]}
      yes={() => <NewRegionPageCore regions={uiData.regions} {...otherProps} />}
      no={() => <Redirect to="/dashboard" />}
    />
  );
};

const NewRegionPageCore = ({ regions, submitNewItem, history }) => (
  <Container id="new-region-page">
    <h2>New Region</h2>
    <Formik
      initialValues={{ name: "" }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, "Must be 2 characters or more")
          .max(20, "Must be 15 characters or less")
          .notOneOf(regions.map(({ name }) => name))
          .required("Required"),
      })}
      onSubmit={(formValues, { setSubmitting }) => {
        submitNewItem({
          collection: "Region",
          link: "regions",
          formValues,
          history,
        });
        setSubmitting(false);
      }}
    >
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
    </Formik>
  </Container>
);

const mapStateToProps = ({ ui: { uiData } }) => ({
  uiData,
});

const mapDispatchToProps = (dispatch) => ({
  submitNewItem: (data) => dispatch(submitNewItem(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewRegionPage));
