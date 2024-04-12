import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Container } from "react-bootstrap";
import { Stack, Row, Col } from "react-bootstrap";

import { PizzaSize } from "./pizzaOptions/PizzaSize.jsx";
import { PizzaCheese } from "./pizzaOptions/PizzaCheese.jsx";
import { PizzaSauce } from "./pizzaOptions/PizzaSauce.jsx";
import { PizzaToppings } from "./pizzaOptions/PizzaToppings.jsx";
import { savePizza } from "../../services/pizzaServices.js";
import { getPizzaById, getToppingsByPizzaId } from "../../services/PizzaServices.jsx";
import { getOrderById, updateOrder } from "../../services/OrdersService.jsx";

export const Pizzas = () => {
  const [foundPizza, setFoundPizza] = useState()
  const [pizzaOptions, setPizzaOptions] = useState({});
  const [toppingsOnCurrentPizza, setToppingsOnCurrentPizza] = useState([])
  const [order, setOrder] = useState()
  const { pizzaId } = useParams();
  const{ orderId } = useParams()
 
  const navigate = useNavigate();

  useEffect(() => {
getPizzaById(pizzaId).then((pizzaObj) => setFoundPizza(pizzaObj))
getToppingsByPizzaId(pizzaId).then((toppingsArray) => setToppingsOnCurrentPizza(toppingsArray))
getOrderById(orderId).then((orderObj) => setOrder(orderObj))
  }, []);

  useEffect(() => {
    if (foundPizza){
setPizzaOptions({
  size: foundPizza.sizeId,
  cheese: foundPizza.cheeseId,
  sauce: foundPizza.sauceId
})}

  }, [foundPizza])

  const handleSavePizza = async () => {
    const newPizzaObject = {
      id: parseInt(pizzaId),
      orderId: parseInt(orderId),
      sizeId: pizzaOptions.size,
      cheeseId: pizzaOptions.cheese,
      sauceId: pizzaOptions.sauce
    };
  
    // Calculate the price of the pizza based on its size
    const sizePrice =
      pizzaOptions.size === 1 ? 10 :
      pizzaOptions.size === 2 ? 12 :
      15;
  
    // Calculate the price of the pizza toppings
    let toppingPrice = 0; // Default to 0
    if (toppingsOnCurrentPizza) {
      toppingPrice = toppingsOnCurrentPizza.length * 0.5;
    }
  
    // Calculate the total price of the pizza
    const newPizzaPrice = sizePrice + toppingPrice;
  
    // Make a shallow copy of the order object
    const updatedOrder = { ...order };
  
    // Update the order total with the price of the new pizza
    updatedOrder.orderTotal += newPizzaPrice;
  
    // Update the order in the database
    await updateOrder(updatedOrder);
  
    // Save the new pizza
    savePizza(newPizzaObject).then(() => {
      navigate(`/orderList/${orderId}`);
    });
  };

  return (
    <Container>
      <Stack direction="horizontal">
        <div className="p-2">
          <PizzaSize
            pizzaOptions={pizzaOptions}
            setPizzaOptions={setPizzaOptions}
            foundPizza={foundPizza}
          />

          <PizzaCheese
            pizzaOptions={pizzaOptions}
            setPizzaOptions={setPizzaOptions}
            foundPizza={foundPizza}
          />

          <PizzaSauce
            pizzaOptions={pizzaOptions}
            setPizzaOptions={setPizzaOptions}
            foundPizza={foundPizza}
          />
        </div>
        <div className="p-2">
          <PizzaToppings
            pizzaOptions={pizzaOptions}
            setPizzaOptions={setPizzaOptions}
            pizzaId={pizzaId}
            foundPizza={foundPizza}
            setToppingsOnCurrentPizza={setToppingsOnCurrentPizza}
          />
          <div></div>
        </div>
      </Stack>
      <Button
        onClick={handleSavePizza}
      >
        Save Pizza
      </Button>
    </Container>
  );
};
