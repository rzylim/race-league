import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";

import {
  dashboardNewItem,
  dashboardUpdateItem,
  dashboardDeleteItem,
  newChampionship,
  updateChampionship,
  deleteChampionship,
} from "../../redux/crud/crud.actions";
import { itemDict } from "./new-edit-item.definitions";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, Form as BSForm, Col, Button, Modal } from "react-bootstrap";

import Can from "../../components/can/can.component";

import { convertShallowSetsToArrays } from "../../utilities/set";
import { shallowFindByKeyValue } from "../../utilities/search";

import "./new-edit-item.styles.scss";

const NewEditItemPage = ({ uiData, ...otherProps }) => {
  const { s, itemType, itemId } = useParams();
  // wait for ui data to load.
  if (!uiData) return null;

  let dict = null;

  // used in championship creation/ editing only
  let thisSeries = null;
  let on = null;

  if (s) {
    dict = itemDict().championship;
    thisSeries = shallowFindByKeyValue(uiData.series, "link", s);
    on = { seriesId: thisSeries._id };
  } else {
    dict = itemDict()[itemType];
    // return to dashboard if item type doesn't exist.
    if (!dict || !uiData[dict.plural]) return <Redirect to="/dashboard" />;
  }

  const item = uiData[dict.plural][itemId];

  const relatedCollections = dict.relatedCollections.reduce(
    (acc, collectionName) => ({
      ...acc,
      [collectionName]: uiData[collectionName],
    }),
    {}
  );

  return (
    <Can
      perform={dict.perform}
      on={on}
      yes={() => (
        <NewEditItemPageCore
          thisSeries={thisSeries}
          itemType={itemType}
          itemId={itemId}
          item={item}
          dict={dict}
          currItems={Object.keys(uiData[dict.plural]).filter(
            (_id) => _id !== itemId
          )}
          relatedCollections={relatedCollections}
          uiData={uiData}
          {...otherProps}
        />
      )}
      no={() =>
        s ? (
          <Redirect to={`/${s}/championship/${itemId}`} />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
  );
};

// item used to differentiate between editing or creation
const NewEditItemPageCore = ({
  thisSeries,
  itemType,
  itemId,
  item,
  dict: { modelName, initialValues, validationSchema, form },
  currItems,
  relatedCollections,
  uiData,
  dashboardNewItem,
  dashboardUpdateItem,
  dashboardDeleteItem,
  newChampionship,
  updateChampionship,
  deleteChampionship,
}) => {
  const newItem = thisSeries ? newChampionship : dashboardNewItem;
  const updateItem = thisSeries ? updateChampionship : dashboardUpdateItem;
  const deleteItem = thisSeries ? deleteChampionship : dashboardDeleteItem;

  const history = useHistory();
  const [modalShow, setModalShow] = useState(false);

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  const handleDelete = () => {
    deleteItem({
      collection: modelName,
      itemType,
      _id: itemId,
      history,
    });
    setModalShow(false);
  };

  return (
    <Container id="new-item-page">
      <h2>{(item ? "Edit" : "New") + ` ${modelName}`}</h2>
      <Formik
        initialValues={initialValues(item, itemId, thisSeries, uiData)}
        validationSchema={validationSchema(currItems)}
        onSubmit={(formValues, { setSubmitting }) => {
          formValues = convertShallowSetsToArrays(formValues);
          const selectedSeries = uiData.series[formValues.series];
          const submission = {
            seriesLink: selectedSeries ? selectedSeries.link : null,
            collection: modelName,
            itemType,
            formValues,
            history,
          };
          if (item) {
            updateItem(submission);
          } else {
            newItem(submission);
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
          {form(relatedCollections, uiData)}
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
              <Modal.Title>{`Warning: Delete ${modelName} Item`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {thisSeries
                ? "All associated races and results will also be deleted. Proceed?"
                : "Proceed with deletion?"}
            </Modal.Body>
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

const mapStateToProps = ({ ui: { uiData } }) => ({
  uiData,
});

const mapDispatchToProps = (dispatch) => ({
  dashboardNewItem: (data) => dispatch(dashboardNewItem(data)),
  dashboardUpdateItem: (data) => dispatch(dashboardUpdateItem(data)),
  dashboardDeleteItem: (data) => dispatch(dashboardDeleteItem(data)),
  newChampionship: (data) => dispatch(newChampionship(data)),
  updateChampionship: (data) => dispatch(updateChampionship(data)),
  deleteChampionship: (data) => dispatch(deleteChampionship(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewEditItemPage);
