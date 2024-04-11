import {
  getPizzaToppings,
  selectPizzaTopping,
} from "../../../services/pizzaServices.js";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const PizzaToppings = ({ pizzaOptions, setPizzaOptions }) => {
  const [pizzaToppings, setPizzaToppings] = useState([]);
  //to add one topping at a time to pizza
  const [addPizzaToppings, setAddPizzaToppings] = useState("");
  const { pizzaId } = useParams();
  const testPizzaID = 1;

  useEffect(() => {
    getPizzaToppings().then((pizzaToppingOptions) => {
      setPizzaToppings(pizzaToppingOptions);
    });
  }, []);

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Pizza Toppings</Card.Title>
          <Card.Text>Select toppings for your pizza</Card.Text>
        </Card.Body>

        <Form
          onChange={(event) => {
            //get topping selection
            console.log(event.target.value);
            setAddPizzaToppings(parseInt(event.target.value));
          }}
        >
          {pizzaToppings.map((pizzaToppingObj) => {
            return (
              <Form.Check
                inline
                key={pizzaToppingObj.id}
                type="radio"
                label={pizzaToppingObj.type}
                name="radioGroup"
                value={pizzaToppingObj.id}
              />
            );
          })}
        </Form>
        <Row>
          <Col>
            <Button
              className="m-2"
              variant="primary"
              size="sm"
              onClick={() => {
                console.log(addPizzaToppings);
                selectPizzaTopping(testPizzaID, addPizzaToppings);
              }}
            >
              Add Topping
            </Button>
            <Button className="m-2" variant="primary" size="sm">
              Remove Topping
            </Button>
          </Col>
        </Row>
      </Card>
      <br></br>
    </>
  );
};
