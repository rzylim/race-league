import React, { useState } from "react";

import { useField } from "formik";

import {
  Form as BSForm,
  Container,
  Row,
  Col,
  Accordion,
  Card,
} from "react-bootstrap";

import { searchStringProps } from "../../utilities/search";

import "./field-easy-multi-select.styles.scss";

const FieldEasyMultiSelect = ({ name, label, options, Component }) => {
  const [, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  const onClickSelect = (_id) => setValue(value.add(_id));
  const onClickDeselect = (_id) => {
    value.delete(_id);
    setValue(value);
  };

  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <BSForm.Group as={Col} xs={12} className="field-easy-multi-select">
      <BSForm.Label>{label}</BSForm.Label>
      <Row className="selection">
        {options
          .filter(({ _id }) => value.has(_id))
          .map(({ _id, ...otherProps }) => (
            <Component
              key={_id}
              {...otherProps}
              onClick={() => onClickDeselect(_id)}
            />
          ))}
      </Row>
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="select">
            Select
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="select">
            <Card.Body>
              <Row>
                <Col xs={12}>
                  <Container className="search">
                    <BSForm.Control
                      type="text"
                      placeholder="Search"
                      onChange={handleSearchChange}
                    />
                  </Container>
                </Col>
                {options
                  .filter(
                    ({ _id, __v, ...otherProps }) =>
                      !value.has(_id) && searchStringProps(otherProps, search)
                  )
                  .map(({ _id, ...otherProps }) => (
                    <Component
                      key={_id}
                      {...otherProps}
                      onClick={() => onClickSelect(_id)}
                    />
                  ))}
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </BSForm.Group>
  );
};

export default FieldEasyMultiSelect;
