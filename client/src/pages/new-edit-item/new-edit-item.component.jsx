import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";

import {
  dasbboardNewItem,
  dashboardUpdateItem,
  dashboardDeleteItem,
} from "../../redux/crud/crud.actions";
import { itemDict } from "./new-edit-item.definitions";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { Form as BSForm, Col, Button, Modal } from "react-bootstrap";

import Container from "react-bootstrap/Container";

import Can from "../../components/can/can.component";

import "./new-edit-item.styles.scss";

const NewEditItemPage = ({
  match: {
    params: { itemType, itemId },
  },
  uiData,
  ...otherProps
}) => {
  const dict = itemDict(itemId)[itemType];
  if (!uiData) return null;
  if (!uiData[dict.plural]) return <Redirect to="/dashboard" />;

  const item = uiData[dict.plural].find((e) => e._id === itemId);

  const relatedCollections = dict.relatedCollections.reduce(
    (acc, collectionName) => ({
      ...acc,
      [collectionName]: uiData[collectionName],
    }),
    {}
  );

  return (
    <Can
      perform={["dashboard:edit"]}
      yes={() => (
        <NewEditItemPageCore
          currItems={uiData[dict.plural].filter((e) => e._id !== itemId)}
          relatedCollections={relatedCollections}
          dict={{ itemType, item, ...dict }}
          {...otherProps}
        />
      )}
      no={() => <Redirect to="/dashboard" />}
    />
  );
};

// item used to differentiate between editing or creation
const NewEditItemPageCore = ({
  currItems,
  relatedCollections,
  dict: { itemType, item, modelName, initialValues, validationSchema, form },
  dasbboardNewItem,
  dashboardUpdateItem,
  dashboardDeleteItem,
  history,
}) => {
  const [modalShow, setModalShow] = useState(false);

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  const handleDelete = () => {
    dashboardDeleteItem({
      collection: modelName,
      itemType,
      _id: item._id,
      history,
    });
    setModalShow(false);
  };

  return (
    <Container id="new-item-page">
      <h2>{(item ? "Edit" : "New") + ` ${modelName}`}</h2>
      <Formik
        initialValues={initialValues(item)}
        validationSchema={validationSchema(currItems)}
        onSubmit={(formValues, { setSubmitting }) => {
          formValues = convertShallowSetsToArrays(formValues);
          const submission = {
            collection: modelName,
            itemType,
            formValues,
            history,
          };
          if (item) {
            dashboardUpdateItem(submission);
          } else {
            dasbboardNewItem(submission);
          }
          setSubmitting(false);
        }}
      >
        <BSForm as={Form}>
          {item ? (
            <BSForm.Row>
              <BSForm.Group as={Col} xs={12}>
                <BSForm.Label htmlFor="_id">_id</BSForm.Label>
                <BSForm.Control as={Field} name="_id" type="text" disabled />
                <BSForm.Text className="text-danger">
                  <ErrorMessage name="_id" />
                </BSForm.Text>
              </BSForm.Group>
            </BSForm.Row>
          ) : null}
          {form(relatedCollections)}
          <BSForm.Row>
            {item ? (
              <Col>
                <Button variant="danger" onClick={handleShow}>
                  Delete
                </Button>
              </Col>
            ) : null}
            <Col className="submit">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </BSForm.Row>
          <Modal show={modalShow} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Warning: Delete Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>Proceed with deletion?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Confirm deletion
              </Button>
            </Modal.Footer>
          </Modal>
        </BSForm>
      </Formik>
    </Container>
  );
};

const convertShallowSetsToArrays = (obj) =>
  Object.entries(obj).reduce(
    (acc, [key, value]) =>
      value instanceof Set
        ? {
            ...acc,
            [key]: [...value],
          }
        : { ...acc, [key]: value },
    {}
  );

const mapStateToProps = ({ ui: { uiData } }) => ({
  uiData,
});

const mapDispatchToProps = (dispatch) => ({
  dasbboardNewItem: (data) => dispatch(dasbboardNewItem(data)),
  dashboardUpdateItem: (data) => dispatch(dashboardUpdateItem(data)),
  dashboardDeleteItem: (data) => dispatch(dashboardDeleteItem(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewEditItemPage));
