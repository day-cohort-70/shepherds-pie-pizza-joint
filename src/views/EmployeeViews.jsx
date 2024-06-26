import { Outlet, Route, Routes } from "react-router-dom"
import { OrderDetails } from "../components/orders/OrderDetails" // Import OrderDetails component

import { useEffect, useState } from "react"
import NavBar from "../components/nav/NavBar"
import { OrderList } from "../components/orders/OrderList"
import { NewOrder } from "../components/orders/NewOrder"
import { getAllUsers } from "../services/userService"
import { SalesReport } from "../sales/SalesReport"
import { Pizzas } from "../components/pizzas/Pizzas"





export const EmployeeViews = ({currentUser, service, setService, employees, setEmployees}) => {
 
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
                    <Route path=':orderId/:pizzaId' element={<Pizzas /> } />
                </Route>
                <Route path='/NewOrder' element={<NewOrder service={service} setService={setService} currentUser={currentUser}/>} />

            </Route>
        </Routes>
    )
}
