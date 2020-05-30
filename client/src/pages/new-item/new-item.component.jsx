import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { submitNewItem } from "../../redux/ui/ui.actions";
import { itemDict } from "./new-item.definitions";

import { Formik } from "formik";

import Container from "react-bootstrap/Container";

import Can from "../../components/can/can.component";

import "./new-item.styles.scss";

const NewItemPage = ({
  match: {
    params: { item },
  },
  uiData,
  ...otherProps
}) => {
  const dict = { item, ...itemDict[item] };

  if (!uiData || !uiData[dict.plural]) return <div />;

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
        <NewItemPageCore
          currItems={uiData[dict.plural]}
          relatedCollections={relatedCollections}
          dict={dict}
          {...otherProps}
        />
      )}
      no={() => <Redirect to="/dashboard" />}
    />
  );
};

const NewItemPageCore = ({
  currItems,
  relatedCollections,
  dict: { item, modelName, initialValues, validationSchema, form },
  submitNewItem,
  history,
}) => (
  <Container id="new-item-page">
    <h2>{`New ${modelName}`}</h2>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema(currItems)}
      onSubmit={(formValues, { setSubmitting }) => {
        setSubmitting(false);
        submitNewItem({
          collection: modelName,
          link: item,
          formValues,
          history,
        });
      }}
    >
      {form(relatedCollections)}
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
)(withRouter(NewItemPage));
