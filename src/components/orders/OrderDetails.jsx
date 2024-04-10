import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Card, Container, Row, Col, Button, Dropdown } from 'react-bootstrap'
import "./OrderDetails.css"


import { assignDeliverer, deleteOrderById, deleteOrderDelivererByOrderId, getOrderById, updateDeliverer } from "../../services/OrdersService";
import { deletePizzaById, getAllPizzaToppings, getPizzasByOrderId, getToppingsByPizzaId } from "../../services/PizzaServices";
import { getAllOrderDeliverers } from "../../services/OrderDelivererService";



export const OrderDetails = ({currentUser, service, employees}) => {
const { orderId } = useParams()
const [order, setOrder] = useState({})
const [pizzas, setPizzas] = useState([])
const [pizzaToppings, setPizzaToppings] = useState()
const [delivererSelection, setDelivererSelection] = useState({name: ""})
const [orderDeliverer, setOrderDeliverer] = useState({})
const navigate = useNavigate()

//get and set orderDeliverers
const getAndSetOrderDeliverer = () => {
    getAllOrderDeliverers().then((delivererArr) => {
    const matchingOrderDeliverer = delivererArr.find(orderDeliverer => orderDeliverer.orderId === parseInt(orderId))
    matchingOrderDeliverer && ( setOrderDeliverer(matchingOrderDeliverer) )
    }
    )
}
useEffect(() => {
    getAndSetOrderDeliverer()
}, [order])

let pizzaCounter = 0

useEffect(() => {
    
    getOrderById(orderId).then((order) => {setOrder(order)})
    getPizzasByOrderId(orderId).then((pizzaObjs) => {setPizzas(pizzaObjs)})
    getAllPizzaToppings().then((toppings) => setPizzaToppings(toppings))
    
}, [orderId])

const handleDeletePizza = (pizzaId) => {
    deletePizzaById(pizzaId).then(() => {
        getPizzasByOrderId(orderId).then((pizzaObjs) => {setPizzas(pizzaObjs)})
    })   
}
const handleDelivererChange = (employee) => {setDelivererSelection(employee)}
     const calculatePizzaPrice = (pizza) => {
    // Calculate price based on size
    let price = pizza.size.price;
    // Calculate price based on number of toppings
    price += pizzaToppings?.filter((pizzaTopping) => pizzaTopping.pizzaId === pizza.id).length * 0.5; // Assuming each topping costs 50 cents
    return price;
}
// variable used to display the assigned driver to this order once it has been posted to the database

const handleAssignDeliverer = async () => {
    const orderDelivererObj = {
        "orderId": order.id,
        "userId": delivererSelection.id
    };
    if (Object.keys(orderDeliverer).length === 0) {
        await assignDeliverer(orderDelivererObj)
        
    } else {
        await updateDeliverer(orderDelivererObj, orderDeliverer.id)
    }
    getAndSetOrderDeliverer()
  
};

const handleDeleteOrder = async (orderId) => {
    await deleteOrderById(orderId)

    if (Object.keys(orderDeliverer).length !== 0) {
        await (deleteOrderDelivererByOrderId(orderId))
    } 
    navigate('/orderList')
}

return (
    <Container className="mt-5">
        <h2 className="mb-4">Order Details</h2>
        <div className="header-orderdetail">
            <p className="mb-4">Order ID: {orderId}</p>
            {order && order.serviceType === "Dine-In" ? (
                <>
                    <p className="mb-4">Service: Dine-In</p> 
                    <p className="mb-4">Table: {order.tableNumber}</p> 
                </>
            ) : ( 
                <>
                    <p className="mb-4">Service: Delivery</p>
                    <p className="mb-4">Driver: {orderDeliverer.user?.name || "Unassigned"}</p>
                    { currentUser.isAdmin && (
                        <div className="order-driverdetail">
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" title={delivererSelection.name || "Select a Driver"}>
                            {delivererSelection.name || "Select a Driver"}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {employees.map((employee) => (
                                     <Dropdown.Item 
                                        key={employee.id}
                                        value={employee.id}
                                        onClick={() => handleDelivererChange(employee)}
                                        >{employee.name}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button className="btn-driver"variant="success" onClick={handleAssignDeliverer}>Assign Driver</Button>
                        </div>
                    )}
                    
                </>
            )}
        </div>
        <div className="orders">
            {pizzas.map((pizza) => (
                <div key={pizza.id} className="order mb-4">
                    <header className="order-header">Pizza #{++pizzaCounter}</header>
                    <div className="order-details">Size: {pizza.size.size}</div>
                    <div className="order-details">Sauce: {pizza.sauce.type}</div>
                    <div className="order-details">Cheese: {pizza.cheese.type}</div>
                    <div className="order-details">Toppings:
                        <ul>
                            {pizzaToppings && pizzaToppings
                                .filter((pizzaTopping) => pizzaTopping.pizzaId === pizza.id)
                                .map((pizzaTopping) => (
                                    <li key={pizzaTopping.id}>{pizzaTopping.topping.type}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="order-details">Price: ${calculatePizzaPrice(pizza).toFixed(2)}</div>
                    <div className="orderlist-btns">
                        <Button variant="warning" className="btn-info">Edit</Button>
                        <Button variant="danger" className="btn-info" onClick={() => handleDeletePizza(pizza.id)}>Delete</Button>
                    </div>
                </div>
            ))}
        </div>
        <div className="btn-bar">
        <Button variant="warning" size="lg">Add Pizza</Button>
        <Button variant="warning" size="lg" onClick={() => navigate('/orderList')}>Order List</Button>
        <Button variant="danger" size="lg" onClick={() => handleDeleteOrder(orderId)}>Delete Order</Button>
        </div>
    </Container>
);
;
}
