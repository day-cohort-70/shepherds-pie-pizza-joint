import { getPizzaCheeses } from "../../../services/pizzaServices.js";
import { Card, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
//import { Pizzas } from "../Pizzas.jsx";

export const PizzaCheese = ({ pizzaOptions, setPizzaOptions, foundPizza }) => {
  const [pizzaCheese, setPizzaCheese] = useState([]);


  useEffect(() => {
    getPizzaCheeses().then((pizzaCheeseOptions) => {
      setPizzaCheese(pizzaCheeseOptions);
    });
  }, []);


 // Check if foundPizza and pizzaCheese are both populated before rendering
if (!foundPizza || !pizzaCheese.length) {
  return <p>Loading...</p>;
}


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
            pizzaOptionsCopy.cheese = parseInt(event.target.value);
            setPizzaOptions(pizzaOptionsCopy);
          }}
        >
          {pizzaCheese.map((pizzaCheeseObj, index) => {
            
            const clickedBoxNumber = foundPizza?.cheeseId - 1
          
            return (
              <Form.Check
                inline
                key={pizzaCheeseObj.id}
                type="radio"
                label={pizzaCheeseObj.type}
                name="radioGroup"
                value={pizzaCheeseObj.id}
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
