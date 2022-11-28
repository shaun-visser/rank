import React from "react";
import useForm from "../useForm";
import { Button, Form, Alert, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreditCardForm.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Select from "react-select";

const CreditCardForm = () => {
  const {
    handleChange,
    handleFocus,
    handleSubmit,
    addCountry,
    removeCountry,
    handleAddChange,
    values,
    options,
    errors,
    blacklistErrors,
  } = useForm();
  return (
    <div>
      <div className="container">
        <div className="box justify-content-center align-items-center">
          <div className="formDiv">
            <div className="creditCard">
              <Cards
                cvc={values.cardSecurityCode}
                expiry={values.cardExpiration}
                focused={values.focus}
                name={values.cardName}
                number={values.cardNumber}
              />
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  id="cardName"
                  name="cardName"
                  placeholder="Cardholder Name"
                  value={values.cardName}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  isValid={errors.cname}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="number"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={values.cardNumber}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  isValid={errors.cnumber}
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      id="cardExpiration"
                      name="cardExpiration"
                      placeholder="Expiration Date"
                      value={values.cardExpiration}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      isValid={errors.cexp}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Control
                      type="number"
                      id="cardSecurityCode"
                      name="cardSecurityCode"
                      placeholder="Security Code"
                      value={values.cardSecurityCode}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      isValid={errors.ccvv}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Select
                  id="country"
                  name="country"
                  options={options}
                  value={values.country.value}
                  onChange={handleChange}
                  isValid={errors.country}
                />
              </Form.Group>
              <Button size={"block"} id="validateButton" type="submit">
                Validate
              </Button>
            </Form>
          </div>
          <Alert id="alertMessage" variant={errors.variant} show={errors.show}>
            {errors.message}
          </Alert>
          <div className="formDiv">
            <h2>Blacklisted Countries</h2>
            <Form.Group>
              <Select
                id="addCountry"
                name="addCountry"
                options={options}
                value={values.addCountry.value}
                onChange={handleAddChange}
              />
            </Form.Group>
            <Button onClick={addCountry} size={"block"} id="addButton">
              Add
            </Button>
            <Button onClick={removeCountry} size={"block"} id="removeButton">
              Remove
            </Button>

            <ul>
              {values.bannedCountries.map((element, index) => {
                return <li key={index}>{element}</li>;
              })}
            </ul>
          </div>
          <Alert
            id="countryAlertMessage"
            variant={blacklistErrors.variant}
            show={blacklistErrors.show}
          >
            {blacklistErrors.message}
          </Alert>
          <div className="formDiv">
            <h2>Valid credit cards</h2>
            <ul>
              {values.validCards.map((element, index) => {
                return <li key={index}>{element}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;
