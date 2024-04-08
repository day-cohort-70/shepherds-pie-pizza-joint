import { useEffect, useState } from "react"

import "./orders.css"
import Button from 'react-bootstrap/Button'
import { FilterBar } from "./FilterBar"
import { getAllOrders } from "../../services/OrdersService"

export const OrderList = () => {
    const [orders, setOrders] = useState([])
    const [date, setDate] = useState('')
    const [filteredOrders, setFilteredOrders] = useState([])

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


// define function to convert epoch time to yyyy-mm-dd format for use in displaying
const epochToDate = (epochTime) => {
    const date = new Date(epochTime)
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2) // Adding 1 because months are zero-based
    const day = ('0' + date.getDate()).slice(-2)

    const formattedDate = year + '-' + month + '-' + day

    return formattedDate
}

//define function that filters orders for orders that have dates that match the date state.
useEffect(() => {
    const dateFilteredOrders = orders.filter(order => (epochToDate(order.date)) === date)
    setFilteredOrders(dateFilteredOrders)
}, [orders, date])

    return (
        <div className="orders-container">
            <h2>Orders</h2>
            <FilterBar setDate={setDate} date={date}/>
            <article className="orders">
                {filteredOrders.map((order) => {
                    return (
                        <section className="order" key={order.id}>
                            <header className="order-header">Order #{order.id}</header>
                            <div className="order-details">
                                {epochToDate(order.date)}
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