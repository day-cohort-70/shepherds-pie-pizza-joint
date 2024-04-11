import React, { useEffect, useState } from "react"
import { getAllOrders } from "../services/OrdersService"
import Form from 'react-bootstrap/Form'
import { Link } from "react-router-dom"
import { Badge } from 'react-bootstrap'
import { getAllCheeses, getAllPizzaToppingObjects, getAllSauces, getAllSizes, getAllToppings } from "../services/PizzaServices"

export const SalesReport = () => {
    const [allOrders, setAllOrders] = useState([]) // Initialize as an empty array
    const [selectedMonth, setSelectedMonth] = useState('')
    const [monthFilteredOrders, setMonthFilteredOrders] = useState([]) // Initialize as an empty array
    const [totalSales, setTotalSales] = useState(0)
    const [mostPopularSize, setMostPopularSize] = useState('')
    const [mostPopularCheese, setMostPopularCheese] = useState('')
    const [mostPopularSauce, setMostPopularSauce] = useState('')
    const [topToppings, setTopToppings] = useState([])
    const [pizzaToppings, setPizzaToppings] = useState([])
    const [sizes, setSizes] = useState([])
    const [cheeses, setCheeses] = useState([])
    const [sauces, setSauces] = useState([])
    const [toppings, setToppings] = useState([])

    useEffect(() => {
        getAllOrders().then((ordersArray) => setAllOrders(ordersArray))
        getAllSizes().then((sizesArray) => setSizes(sizesArray))
        getAllCheeses().then((cheesesArray) => setCheeses(cheesesArray))
        getAllSauces().then((saucesArray) => setSauces(saucesArray))
        getAllToppings().then((toppingsArray) => setToppings(toppingsArray))
        getAllPizzaToppingObjects().then((pizzaToppingsArray) => setPizzaToppings(pizzaToppingsArray))
    },[])

    useEffect(() => {
        if (selectedMonth === '') {
            // Reset all values if no month is selected
            setMonthFilteredOrders([])
            setTotalSales(0)
            setMostPopularSize('')
            setMostPopularCheese('')
            setMostPopularSauce('')
            setTopToppings([])
            return
        }

        const filteredOrders = allOrders.filter(order => {
            const orderDate = new Date(order.date)
            const orderMonth = orderDate.getMonth() + 1 // Months are 0-indexed in JavaScript
            const orderMonthTwoDigits = orderMonth.toString().padStart(2, '0')
            return orderMonthTwoDigits === selectedMonth
        })

        setMonthFilteredOrders(filteredOrders) // Update the filtered orders state

        // Calculate total sales for the month
        const total = filteredOrders.reduce((acc, order) => acc + order.orderTotal, 0)
        setTotalSales(total)

        // Calculate most popular size, cheese, sauce, and top three toppings
        calculateMostPopularItems(filteredOrders)

    }, [allOrders, selectedMonth]) // Depend on allOrders and selectedMonth

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value)
    }

    const formatDate = (epochTime) => {
        const date = new Date(epochTime)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const calculateMostPopularItems = (orders) => {
        if (!orders || orders.length === 0) {
            // If there are no orders, set default values or handle accordingly
            setMostPopularSize('N/A')
            setMostPopularCheese('N/A')
            setMostPopularSauce('N/A')
            setTopToppings([])
            return
        }
    
        // Initialize counters for each item
        const sizeCounter = {}
        const cheeseCounter = {}
        const sauceCounter = {}
        const toppingCounter = {}
    
        // Count occurrences of each item
        orders.forEach(order => {
            order.pizzas.forEach(pizza => {
                // Size
                if (sizeCounter[pizza.sizeId]) {
                    sizeCounter[pizza.sizeId]++
                } else {
                    sizeCounter[pizza.sizeId] = 1
                }
    
                // Cheese
                if (cheeseCounter[pizza.cheeseId]) {
                    cheeseCounter[pizza.cheeseId]++
                } else {
                    cheeseCounter[pizza.cheeseId] = 1
                }
    
                // Sauce
                if (sauceCounter[pizza.sauceId]) {
                    sauceCounter[pizza.sauceId]++
                } else {
                    sauceCounter[pizza.sauceId] = 1
                }
    
                // Toppings
                // Find toppings associated with the current pizza
                const pizzaToppingsForPizza = pizzaToppings.filter(pt => pt.pizzaId === pizza.id)
                pizzaToppingsForPizza.forEach(pt => {
                    if (toppingCounter[pt.toppingId]) {
                        toppingCounter[pt.toppingId]++
                    } else {
                        toppingCounter[pt.toppingId] = 1
                    }
                })
            })
        })
    
        // Find most popular size
        const mostPopularSizeId = Object.keys(sizeCounter).reduce((a, b) => sizeCounter[a] > sizeCounter[b] ? a : b)
        const mostPopularSizeName = sizes.find(size => size.id === parseInt(mostPopularSizeId))?.size || 'N/A'
        setMostPopularSize(mostPopularSizeName)
    
        // Find most popular cheese
        const mostPopularCheeseId = Object.keys(cheeseCounter).reduce((a, b) => cheeseCounter[a] > cheeseCounter[b] ? a : b)
        const mostPopularCheeseName = cheeses.find(cheese => cheese.id === parseInt(mostPopularCheeseId))?.type || 'N/A'
        setMostPopularCheese(mostPopularCheeseName)
    
        // Find most popular sauce
        const mostPopularSauceId = Object.keys(sauceCounter).reduce((a, b) => sauceCounter[a] > sauceCounter[b] ? a : b)
        const mostPopularSauceName = sauces.find(sauce => sauce.id === parseInt(mostPopularSauceId))?.type || 'N/A'
        setMostPopularSauce(mostPopularSauceName)
    
        // Find top three toppings
        const sortedToppings = Object.keys(toppingCounter).sort((a, b) => toppingCounter[b] - toppingCounter[a])
        const topThreeToppingsIds = sortedToppings.slice(0, 3)
        const topThreeToppingsNames = topThreeToppingsIds.map(toppingId => {
            const topping = toppings.find(topping => topping.id === parseInt(toppingId))
            return topping ? topping.type : 'N/A'
        })
        setTopToppings(topThreeToppingsNames)
    }
    

    return (
        <>
            <Form.Select value={selectedMonth} onChange={handleMonthChange}>
                <option value="">Select Month</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </Form.Select>

            {selectedMonth && (
                <>
                    <h1 className="text-center mb-4">Sales Report</h1>
                    <h2 className="text-center">TOTAL SALES FOR MONTH ${totalSales}</h2>
                    <h3 className="text-center">Most Popular Items:</h3>
                    <p className="text-center">Most Popular Size: {mostPopularSize}</p>
                    <p className="text-center">Most Popular Cheese: {mostPopularCheese}</p>
                    <p className="text-center">Most Popular Sauce: {mostPopularSauce}</p>
                    <p className="text-center">Top Three Toppings: {topToppings.join(', ')}</p>
                    <div className="row">
                        {monthFilteredOrders.map((order) => (
                            <div className="col-lg-4 col-md-6 mb-4" key={order.id}>
                                <div className="card">
                                    <div className="card-header">
                                        <h2>Order #{order.id}</h2>
                                        <h3>{order.serviceType}</h3>
                                        {order.serviceType === "Dine-In" && (
                                            <h4>
                                                <div className="card-text">
                                                    <span>Table</span> 
                                                    <Badge variant="success">
                                                        {order.tableNumber}
                                                    </Badge>
                                                </div>
                                            </h4>
                                        )}
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">Date: {formatDate(order.date)}</p>
                                        <p className="card-text">Order Total: ${order.orderTotal}</p>
                                    </div>
                                    <div className="card-footer text-center">
                                        <Link to={`/orderList/${order.id}`} className="btn btn-warning btn-sm">View Order</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    )
}
