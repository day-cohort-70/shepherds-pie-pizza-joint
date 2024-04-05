import { useEffect, useState } from "react"
import { getAllOrders } from "../../services/OrdersService"
import "./orders.css"
import Button from 'react-bootstrap/Button'
import { FilterBar } from "./FilterBar"

export const OrderList = () => {
    const [orders, setOrders] = useState([])
    const [date, setDate] = useState('')

const getAndSetOrders = () => {
    getAllOrders().then(ordersArr => {
        ordersArr.sort((a, b) => {
            const dateA = new Date(a.date)
            const dateB = new Date(b.date)
            return dateB - dateA
        }) 
        setOrders(ordersArr)
    })
}

useEffect(() => {
    getAndSetOrders()
}, [])

//define function that filters orders for orders that have dates that match the date state.


    return (
        <div className="orders-container">
            <h2>Orders</h2>
            <FilterBar setDate={setDate} date={date}/>
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