import { getPizzaSizes } from "../../../services/pizzaServices.js";
import { Card, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
//import { Pizzas } from "../Pizzas.jsx";

export const PizzaSize = ({ pizzaOptions, setPizzaOptions }) => {
  const [pizzaSize, setPizzaSize] = useState([]);

  useEffect(() => {
    getPizzaSizes().then((pizzaSizeOptions) => {
      setPizzaSize(pizzaSizeOptions);
    });
  }, []);

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Pizza Size</Card.Title>
          <Card.Text>Select a size for your pizza</Card.Text>
        </Card.Body>

        <Form
          onChange={(event) => {
            const pizzaOptionsCopy = { ...pizzaOptions };
            pizzaOptionsCopy.size = parseInt(event.target.value);
            setPizzaOptions(pizzaOptionsCopy);
          }}
        >
          {pizzaSize.map((pizzaSizeObj) => {
            return (
              <Form.Check
                inline
                key={pizzaSizeObj.id}
                type="radio"
                label={pizzaSizeObj.size}
                name="radioGroup"
                value={pizzaSizeObj.id}
              />
            );
          })}
        </Form>
      </Card>
      <br></br>
    </>
  );
};
