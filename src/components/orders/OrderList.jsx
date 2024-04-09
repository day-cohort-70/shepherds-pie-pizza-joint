import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./orders.css"
import Button from 'react-bootstrap/Button'
import { FilterBar } from "./FilterBar"
import { deleteOrderById, getAllOrders } from "../../services/OrdersService"
import { getAllPizzaToppings, getPizzasByOrderId } from "../../services/PizzaServices"

export const OrderList = () => {
    const [orders, setOrders] = useState([])
    const [date, setDate] = useState('')
    const [filteredOrders, setFilteredOrders] = useState([])
    const [orderTotals, setOrderTotals] = useState({})
    const [toppings, setToppings] = useState([])

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
        getAllPizzaToppings().then((toppings) => setToppings(toppings))
    }, [])

    useEffect(() => {
        const dateFilteredOrders = orders.filter(order => (epochToDate(order.date)) === date)
        setFilteredOrders(dateFilteredOrders)
    }, [orders, date])

    useEffect(() => {
        const calculateOrderTotals = async () => {
            const totals = {}
            for (const order of filteredOrders) {
                const total = await calculateOrderTotal(order)
                totals[order.id] = total
            }
            setOrderTotals(totals)
        }

        calculateOrderTotals()
    }, [filteredOrders, toppings])

    const epochToDate = (epochTime) => {
        const date = new Date(epochTime)
        const year = date.getFullYear()
        const month = ('0' + (date.getMonth() + 1)).slice(-2)
        const day = ('0' + date.getDate()).slice(-2)
        const formattedDate = year + '-' + month + '-' + day
        return formattedDate
    }

    const handleDeleteOrder = async (orderId) => {
        await deleteOrderById(orderId)
        getAndSetOrders()
    }

    const calculatePizzaPrice = async (pizza) => {
        let price = pizza.size.price
        const pizzaToppings = await toppings?.filter((topping) => topping.pizzaId === pizza.id)
        if (pizzaToppings) {
            price += pizzaToppings.length * 0.5 
        }
        return price
    }
    

    const calculateOrderTotal = async (order) => {
        let totalPrice = 0
        const pizzasArray = await getPizzasByOrderId(order.id)
        
        await Promise.all(pizzasArray.map(async (pizza) => {
            const pizzaPrice = await calculatePizzaPrice(pizza)
            totalPrice += pizzaPrice
        }))
        
        return totalPrice
    }

    return (
        <div className="orders-container">
            <h1>Orders</h1>
            <FilterBar setDate={setDate} date={date}/>
            <article className="orders">
                {filteredOrders.map((order) => (
                    <section className="order" key={order.id}>
                        <header className="order-header">Order #{order.id}</header>
                        <div className="order-details">{epochToDate(order.date)}</div>
                        <div className="order-details">Order Total: ${orderTotals[order.id]}</div>
                        <div className="orderlist-btns">
                            <Link to={`/orderList/${order.id}`}>
                                <Button variant="warning" className="btn-info">View Order</Button>
                            </Link>
                            <Button variant="danger" className="btn-info" onClick={() => handleDeleteOrder(order.id)}>Delete</Button>
                        </div>
                    </section>
                ))}
            </article>
        </div>
    )
}
