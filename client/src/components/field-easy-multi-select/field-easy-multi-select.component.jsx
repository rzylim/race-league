import React, { useState } from "react";

import { useField } from "formik";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Accordian from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

import "./field-easy-multi-select.styles.scss";

const FieldEasyMultiSelect = ({ name, label, options, Component }) => {
  const [, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  const [search, setSearch] = useState("");

  const searchProps = (props) =>
    Object.values(props).reduce(
      (acc, value) =>
        acc || value.toString().toLowerCase().includes(search.toLowerCase()),
      false
    );

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const onClickSelect = (_id) => setValue(value.add(_id));
  const onClickDeselect = (_id) => {
    value.delete(_id);
    setValue(value);
  };

  return (
    <Form.Group as={Col} xs={12} className="field-easy-multi-select">
      <Form.Label>{label}</Form.Label>
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
      <Accordian>
        <Card>
          <Accordian.Toggle as={Card.Header} eventKey="select">
            Select
          </Accordian.Toggle>
          <Accordian.Collapse eventKey="select">
            <Card.Body>
              <Row>
                <Col xs={12}>
                  <Container className="search">
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      onChange={handleSearchChange}
                    />
                  </Container>
                </Col>
                {options
                  .filter(
                    ({ _id, __v, ...otherProps }) =>
                      !value.has(_id) && searchProps(otherProps)
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
          </Accordian.Collapse>
        </Card>
      </Accordian>
    </Form.Group>
  );
};

export default FieldEasyMultiSelect;
