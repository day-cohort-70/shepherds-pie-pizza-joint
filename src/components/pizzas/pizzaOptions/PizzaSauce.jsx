import { getPizzaSauces } from "../../../services/pizzaServices.js";
import { Card, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

export const PizzaSauce = ({ pizzaOptions, setPizzaOptions }) => {
  const [pizzaSauce, setPizzaSauce] = useState([]);

  useEffect(() => {
    getPizzaSauces().then((pizzaSauceOptions) => {
      setPizzaSauce(pizzaSauceOptions);
    });
  }, []);

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Pizza Sauce</Card.Title>
          <Card.Text>Select a sauce for your pizza</Card.Text>
        </Card.Body>

        <Form
          onChange={(event) => {
            console.log(event);
            const pizzaOptionsCopy = { ...pizzaOptions };
            pizzaOptionsCopy.sauce = parseInt(event.target.value);
            setPizzaOptions(pizzaOptionsCopy);
          }}
        >
          {pizzaSauce.map((pizzaSauceObj) => {
            return (
              <Form.Check
                inline
                key={pizzaSauceObj.id}
                type="radio"
                label={pizzaSauceObj.type}
                name="radioGroup"
                value={pizzaSauceObj.id}
              />
            );
          })}
        </Form>
      </Card>
      <br></br>
    </>
  );
};
