import { useEffect, useState } from "react"
import { getAllOrders } from "../../services/OrdersService"
import "./orders.css"
import Button from 'react-bootstrap/Button'

export const OrderList = () => {
    const [orders, setOrders] = useState([])

const getAndSetOrders = () => {
    getAllOrders().then(ordersArr => {
        setOrders(ordersArr)
    })
}
    
    useEffect(() => {
        getAndSetOrders()
    }, [])


    return (
        <div className="orders-container">
            <h2>Orders</h2>
            <article className="orders">
                {orders.map((order) => {
                    return (
                        <section className="order" key={order.id}>
                            <header className="order-header">Order #{order.id}</header>
                            <div className="order-details">
                                {order.date}
                            </div>
                            <div className="order-details">
                            Order Total: ${order.orderTotal}
                            </div>
                            <div className="orderlist-btns">
                                <Button variant="warning" className="btn-info">View Order</Button>
                                <Button variant="danger" className="btn-info">Delete</Button>
                            </div>
                        </section>
                    )
                })}
            </article>
        </div>
    )
}