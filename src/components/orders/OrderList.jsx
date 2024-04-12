import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Button from 'react-bootstrap/Button'
import { FilterBar } from "./FilterBar"
import { deleteOrderById, getAllOrders, updateOrder } from "../../services/OrdersService"
import { getAllPizzaToppings, getPizzasByOrderId } from "../../services/PizzaServices"
import Badge from 'react-bootstrap/Badge'

export const OrderList = () => {
    const [orders, setOrders] = useState([])
    const [date, setDate] = useState('')
    const [filteredOrders, setFilteredOrders] = useState([])
    const [orderTotals, setOrderTotals] = useState({})
    const [toppings, setToppings] = useState([])
    const [totalPizzaPrices, setTotalPizzaPrices] = useState({})
    const [tipAmounts, setTipAmounts] = useState({})

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

    const handleTipInputChange = (orderId, tipAmount) => {
        setTipAmounts(prevState => ({
            ...prevState,
            [orderId]: tipAmount
        }))
    }

    const handleAddTip = async (orderId) => {
        const updatedOrder = { ...orders.find(order => order.id === orderId) }
        
        const newOrderForPost = {
            "userId": updatedOrder.userId,
            "date": updatedOrder.date,
            "tableNumber": updatedOrder.tableNumber,
            "orderTotal": orderTotals[orderId] - updatedOrder.tipAmount + parseInt(tipAmounts[orderId]),
            "serviceType": updatedOrder.serviceType,
            "id": updatedOrder.id,
            "tipAmount": parseInt(tipAmounts[orderId])
        }
       
        await updateOrder(newOrderForPost)
        getAndSetOrders()
    }

    const calculatePizzaPrice = async (pizza) => {
        let price = pizza.size?.price
        const pizzaToppings = await toppings?.filter((topping) => topping.pizzaId === pizza.id)
        if (pizzaToppings) {
            price += pizzaToppings.length * 0.5 
        }
        return price
    }
    

    const calculateOrderTotal = async (order) => {
        let totalPrice = 0
        let pizzaTotalPrice = 0
    
        const pizzasArray = await getPizzasByOrderId(order.id)
    
        await Promise.all(pizzasArray.map(async (pizza) => {
            const pizzaPrice = await calculatePizzaPrice(pizza)
            pizzaTotalPrice += pizzaPrice
        }))
    
        setTotalPizzaPrices(prevState => ({
            ...prevState,
            [order.id]: pizzaTotalPrice
        }))
    
        totalPrice += pizzaTotalPrice
    
        if (order.serviceType === "Delivery") {
            totalPrice += 5
        }
        totalPrice += parseInt(order.tipAmount)
    
        return totalPrice
    }
    const handleAddPizza = () => {
        const newPizzaObj = {
            orderId: orderId,
            sizeId: 0,
            cheeseId: 0,
            sauceId: 0
        }
    
        createNewPizza(newPizzaObj)
            .then((newPizza) => {
                navigate(`/orderList/${orderId}/${newPizza.id}`)
            })
    }
    

    return (
        <div className="orders-container">
            <h1 className="text-center mb-4">Orders</h1>
            <FilterBar setDate={setDate} date={date}/>
            <div className="row">
                {filteredOrders.map((order) => (
                    <div className="col-lg-4 col-md-6 mb-4" key={order.id}>
                        <div className="card">
                            <div className="card-header">
                                <h2>Order #{order.id}</h2>
                                <h3>{order.serviceType}</h3>
                                {order.serviceType === "Dine-In" ? ( <h4><div className="card-text">
    <span>Table</span> 
    <Badge variant="success">
      {order.tableNumber}
    </Badge>
</div></h4>) : ("")}
                            </div>
                            <div className="card-body">
                                <p className="card-text">DATE: {epochToDate(order.date)}</p>
                                <p className="card-text">PIZZA TOTAL: ${totalPizzaPrices[order.id]}</p>
                                {order.serviceType === "Delivery" ? (
                                    <p className="card-text">DELIVERY CHARGE: $5</p>
                                ) : (
                                    ""
                                )}
                                <p className="card-text">TIP AMOUNT: ${order.tipAmount}</p>
                                <p className="card-text">Order Total: ${orderTotals[order.id]}</p>
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="form-control mb-2"
                                        placeholder="Enter tip amount"
                                        value={tipAmounts[order.id] || ''}
                                        onChange={(e) => handleTipInputChange(order.id, e.target.value)}
                                    />
                                    <Button
                                        variant="success"
                                        className="btn-block"
                                        onClick={() => {
                                            if (!tipAmounts[order.id]) {
                                                window.alert("Please enter a tip amount.")
                                            } else {
                                                handleAddTip(order.id)
                                            }
                                        }}
                                    >
                                        ADJUST TIP
                                    </Button>
                                </div>
                                
                            </div>
                            <div className="card-footer text-center">
                                <Link to={`/orderList/${order.id}`} className="btn btn-warning btn-sm mr-2">EDIT ORDER</Link>
                                <Button variant="danger" className="btn-sm" onClick={() => handleDeleteOrder(order.id)}>Delete</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


