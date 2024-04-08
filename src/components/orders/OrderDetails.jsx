import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Card, Container, Row, Col, Button } from 'react-bootstrap'
import "./OrderDetails.css"


import { getOrderById } from "../../services/OrdersService";
import { getPizzasByOrderId } from "../../services/PizzaServices";




export const OrderDetails = ({currentUser}) => {
const { orderId } = useParams()
const [order, setOrder] = useState()
const [pizzas, setPizzas] = useState([])
const navigate = useNavigate()
let pizzaCounter = 0

useEffect(() => {

getOrderById(orderId).then((order) => {setOrder(order)})
getPizzasByOrderId(orderId).then((pizzaObjs) => {setPizzas(pizzaObjs)})

}, [orderId])





return (
    <Container className="mt-5">
        <h2 className="mb-4">Order Details</h2>
        <p className="mb-4">Order ID: {orderId}</p>
        <div className="orders">
            {pizzas.map((pizza) => (
                <div key={pizza.id} className="order mb-4">
                    <header className="order-header">Pizza #{++pizzaCounter}</header>
                    <div className="order-details">Size: {pizza.size.size}</div>
                    <div className="order-details">Sauce: {pizza.sauce.type}</div>
                    <div className="order-details">Cheese: {pizza.cheese.type}</div>
                    <div className="orderlist-btns">
                        <Button variant="warning" className="btn-info">Edit</Button>
                        <Button variant="danger" className="btn-info">Delete</Button>
                    </div>
                </div>
            ))}
        </div>
    </Container>
);
}