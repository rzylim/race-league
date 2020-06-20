import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";

import { itemsDict } from "./new-edit-item.definitions";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, Form as BSForm, Col, Button, Modal } from "react-bootstrap";

import Can from "../../components/can/can.component";

import { convertShallowSetsToArrays } from "../../utilities/set";
import { getRelatedCollections } from "../../utilities/relatedCollections";

import "./new-edit-item.styles.scss";

const NewEditItemPage = ({ uiData, ...otherProps }) => {
  const history = useHistory();
  const { parentItemType, parentItemId, itemType, itemId } = useParams();

  // wait for ui data to load.
  if (!uiData) return null;

  let itemDict = null;
  let item = null;

  let parentDict = null;
  let parent = null;

  let on = null;
  let relatedCollections = null;
  let currItems = null;

  // for items that are part of a Championship document
  if (parentItemType === "championship") {
    on = {
      ...on,
      seriesId: uiData.championships[parentItemId].series._id,
      championshipId: parentItemId,
    };
  }

  itemDict = itemsDict()[itemType];
  if (!itemDict) {
    history.goBack();
  }

  // retrieve item and currItems
  if (!parentItemType) {
    if (!uiData[itemDict.plural]) return <Redirect to="/dashboard" />;

    item = uiData[itemDict.plural][itemId];
    currItems = Object.values(uiData[itemDict.plural]).filter(
      (value) => value._id !== itemId
    );
  } else {
    parentDict = itemsDict()[parentItemType];
    if (!parentDict || !uiData[parentDict.plural]) history.goBack();

    parent = uiData[parentDict.plural][parentItemId];
    if (!parent[itemDict.plural]) history.goBack();

    item = parent[itemDict.plural][itemId];
    currItems = Object.values(parent[itemDict.plural]).filter(
      (value) => value._id !== itemId
    );
  }

  relatedCollections = getRelatedCollections(
    itemDict.relatedCollections,
    uiData
  );

  return (
    <Can
      perform={itemDict.perform}
      on={on}
      yes={() => (
        <NewEditItemPageCore
          seriesId={on ? on.seriesId : null}
          championshipId={on ? on.championshipId : null}
          parentItemType={parentItemType}
          parentItemId={parentItemId}
          parent={parent}
          parentDict={parentDict}
          itemType={itemType}
          itemId={itemId}
          item={item}
          itemDict={itemDict}
          currItems={currItems}
          relatedCollections={relatedCollections}
          uiData={uiData}
          {...otherProps}
        />
      )}
      no={() =>
        !parentItemType ? <Redirect to="/dashboard" /> : history.goBack()
      }
    />
  );
};

// item used to differentiate between editing or creation
const NewEditItemPageCore = ({
  seriesId,
  championshipId,
  parentItemType,
  parentItemId,
  parent,
  parentDict,
  itemType,
  itemId,
  item,
  itemDict: {
    modelName,
    plural,
    initialValues,
    validationSchema,
    actions,
    form,
  },
  currItems,
  relatedCollections,
  uiData,
  dispatch,
}) => {
  const history = useHistory();
  const [modalShow, setModalShow] = useState(false);

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  const handleDelete = () => {
    actions(dispatch).delete({
      modelName,
      collection: plural,
      itemType,
      formValues: { _id: itemId, seriesId, championshipId },
      history,
    });
    setModalShow(false);
  };

  return (
    <Container id="new-item-page">
      <h2>{(item ? "Edit" : "New") + ` ${modelName}`}</h2>
      <Formik
        initialValues={initialValues({
          seriesId,
          championshipId,
          item,
          uiData,
        })}
        validationSchema={validationSchema(currItems)}
        onSubmit={(formValues, { setSubmitting }) => {
          formValues = convertShallowSetsToArrays(formValues);
          const submission = {
            modelName,
            collection: plural,
            itemType,
            formValues,
            history,
          };
          if (item) {
            actions(dispatch).update(submission);
          } else {
            actions(dispatch).new(submission);
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
              {itemType === "championship"
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
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewEditItemPage);
