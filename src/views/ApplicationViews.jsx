import { Outlet, Route, Routes } from "react-router-dom"
import { OrderDetails } from "../components/orders/OrderDetails" // Import OrderDetails component

import { useEffect, useState } from "react"
import NavBar from "../components/nav/NavBar"
import { OrderList } from "../components/orders/OrderList"
import { NewOrder } from "../components/orders/NewOrder"
import { getAllUsers } from "../services/userService"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})
  const [service, setService] = useState({type: "", table: 0})
  const [employees, setEmployees] = useState([])

  
  useEffect(() => {
    const localPizzaUser = localStorage.getItem('pizza_user')
    const pizzaUserObject = JSON.parse(localPizzaUser)

    setCurrentUser(pizzaUserObject)
  }, [])

  useEffect(() => {
    getAllUsers().then((users) => {
        setEmployees(users)
    })
  }, [])

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <NavBar currentUser={currentUser} />
                    <Outlet />
                </>
            }>
                <Route index element={<h1>yuh</h1>} />
             
                <Route path='/orderList' >
                    <Route index element={<OrderList currentUser={currentUser} />}/>
                    <Route path=':orderId' element={<OrderDetails currentUser={currentUser} service={service} employees={employees}/>} />
                    
                </Route>
                <Route path='/NewOrder' element={<NewOrder service={service} setService={setService} currentUser={currentUser}/>} />
                <Route path='/Employees' element={<h1>employye list here bruh</h1>} />
                <Route path='/SalesReport' element={<h1>sales report here bruh</h1>} />
            </Route>
        </Routes>
    )
}
