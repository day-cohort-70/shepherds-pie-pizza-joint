import {
  getPizzaToppings,
  selectPizzaTopping,
} from "../../../services/pizzaServices.js";
import { Card, Form, Button, Row, Col, Badge } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { deletePizzaToppingObject, getAllPizzaToppingObjects, getAllPizzaToppings, getToppingsByPizzaId, postNewPizzaToppingObject } from "../../../services/PizzaServices.jsx";

export const PizzaToppings = ({ pizzaOptions, setPizzaOptions, pizzaId, setToppingsOnCurrentPizza }) => {
  const [pizzaToppings, setPizzaToppings] = useState([]);
  //to add one topping at a time to pizza
  const [addPizzaToppings, setAddPizzaToppings] = useState("");
  const [allPizzaToppingObjects, setAllPizzaToppingObjects] = useState([])
  const [toppingsOnThisPizza, setToppingsOnThisPizza] = useState([])
 
  const testPizzaID = 1;

  useEffect(() => {
    getPizzaToppings().then((pizzaToppingOptions) => {
      setPizzaToppings(pizzaToppingOptions);
    });
getToppingsByPizzaId(pizzaId).then((toppingsArray) => setToppingsOnThisPizza(toppingsArray))


  }, [pizzaId]); // Fetch toppings whenever pizzaId changes

 useEffect(() => {
setToppingsOnCurrentPizza(toppingsOnThisPizza)
 },[toppingsOnThisPizza])

  const handleAddTopping = async () => {
    const newToppingObj = {
      pizzaId: parseInt(pizzaId),
      toppingId: addPizzaToppings
    };
  
    try {
      await postNewPizzaToppingObject(newToppingObj);
      const toppingsArray = await getToppingsByPizzaId(pizzaId);
      setToppingsOnThisPizza(toppingsArray);
    } catch (error) {
      console.error('Error adding topping:', error);
      // Handle error here
    }
  };
  


  const handleDeleteTopping = async (toppingId) => {
   
      await deletePizzaToppingObject(toppingId);
      const toppingsArray = await getToppingsByPizzaId(pizzaId);
      setToppingsOnThisPizza(toppingsArray);
    } 
  ;

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
             onClick={handleAddTopping}
            >
              Add Topping
            </Button>
          </Col>
        </Row>
      </Card>

      <div>
     
        {toppingsOnThisPizza.map((topping) => (
         
          <Badge key={topping.id} pill variant="primary">
            {topping?.topping?.type} {/* Display topping name */}
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => handleDeleteTopping(topping.id)} // Pass topping id to delete function
            >
              X {/* Button to delete topping */}
            </Button>
          </Badge>
        ))}
      </div>
      <br></br>
    </>
  );
};
