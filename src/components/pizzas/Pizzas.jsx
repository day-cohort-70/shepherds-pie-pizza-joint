import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button, Container } from "react-bootstrap";
import { Stack, Row, Col } from "react-bootstrap";

import { PizzaSize } from "./pizzaOptions/PizzaSize.jsx";
import { PizzaCheese } from "./pizzaOptions/PizzaCheese.jsx";
import { PizzaSauce } from "./pizzaOptions/PizzaSauce.jsx";
import { PizzaToppings } from "./pizzaOptions/PizzaToppings.jsx";
import { savePizza } from "../../services/pizzaServices.js";

export const Pizzas = () => {
  const [pizzaOptions, setPizzaOptions] = useState({});
  const { pizzaId } = useParams;
  const testPizzaId = 1;

  useEffect(() => {}, []);

  return (
    <Container>
      <Stack direction="horizontal">
        <div className="p-2">
          <PizzaSize
            pizzaOptions={pizzaOptions}
            setPizzaOptions={setPizzaOptions}
          />

          <PizzaCheese
            pizzaOptions={pizzaOptions}
            setPizzaOptions={setPizzaOptions}
          />

          <PizzaSauce
            pizzaOptions={pizzaOptions}
            setPizzaOptions={setPizzaOptions}
          />
        </div>
        <div className="p-2">
          <PizzaToppings
            pizzaOptions={pizzaOptions}
            setPizzaOptions={setPizzaOptions}
          />
          <div></div>
        </div>
      </Stack>
      <Button
        onClick={() => {
          savePizza(testPizzaId, pizzaOptions);
        }}
      >
        Save Pizza
      </Button>
    </Container>
  );
};
