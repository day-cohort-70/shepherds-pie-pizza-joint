import { Outlet, Route, Routes } from "react-router-dom"
import { OrderDetails } from "../components/orders/OrderDetails" // Import OrderDetails component

import { useEffect, useState } from "react"
import NavBar from "../components/nav/NavBar"
import { OrderList } from "../components/orders/OrderList"
import { NewOrder } from "../components/orders/NewOrder"
import { getAllUsers } from "../services/userService"
import { SalesReport } from "../sales/SalesReport"
import { EmployeeViews } from "./EmployeeViews"
import { AdminViews } from "./AdminViews"

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

  

    return currentUser.isAdmin ? <AdminViews currentUser={currentUser} service={service} setService={setService} employees={employees} setEmployees={setEmployees} 
    /> : 
    <EmployeeViews currentUser={currentUser} service={service} setService={setService} employees={employees} setEmployees={setEmployees} />
}
