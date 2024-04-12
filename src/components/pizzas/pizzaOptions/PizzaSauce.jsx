import { getPizzaSauces } from "../../../services/pizzaServices.js";
import { Card, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

export const PizzaSauce = ({ pizzaOptions, setPizzaOptions, foundPizza }) => {
  const [pizzaSauce, setPizzaSauce] = useState([]);

  useEffect(() => {
    getPizzaSauces().then((pizzaSauceOptions) => {
      setPizzaSauce(pizzaSauceOptions);
    });
  }, []);

  if (!foundPizza || !pizzaSauce.length) {
    return <p>Loading...</p>;
  }
  

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
          {pizzaSauce.map((pizzaSauceObj, index) => {
            const clickedBoxNumber = foundPizza?.sauceId - 1
            return (
              <Form.Check
                inline
                key={pizzaSauceObj.id}
                type="radio"
                label={pizzaSauceObj.type}
                name="radioGroup"
                value={pizzaSauceObj.id}
                defaultChecked={index === clickedBoxNumber}
              />
            );
          })}
        </Form>
      </Card>
      <br></br>
    </>
  );
};
