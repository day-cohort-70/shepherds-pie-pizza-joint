import { getPizzaCheeses } from "../../../services/pizzaServices.js";
import { Card, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
//import { Pizzas } from "../Pizzas.jsx";

export const PizzaCheese = ({ pizzaOptions, setPizzaOptions }) => {
  const [pizzaCheese, setPizzaCheese] = useState([]);

  useEffect(() => {
    getPizzaCheeses().then((pizzaCheeseOptions) => {
      setPizzaCheese(pizzaCheeseOptions);
    });
  }, []);

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Pizza Cheese</Card.Title>
          <Card.Text>Select a cheese for your pizza</Card.Text>
        </Card.Body>

        <Form
          onChange={(event) => {
            const pizzaOptionsCopy = { ...pizzaOptions };
            pizzaOptionsCopy.cheese = event.target.value;
            setPizzaOptions(pizzaOptionsCopy);
          }}
        >
          {pizzaCheese.map((pizzaCheeseObj) => {
            return (
              <Form.Check
                inline
                key={pizzaCheeseObj.id}
                type="radio"
                label={pizzaCheeseObj.type}
                name="radioGroup"
                value={pizzaCheeseObj.id}
              />
            );
          })}
        </Form>
      </Card>
      <br></br>
    </>
  );
};
