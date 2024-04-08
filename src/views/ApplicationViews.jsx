import { Outlet, Route, Routes } from "react-router-dom"
import { OrderDetails } from "../components/orders/OrderDetails" // Import OrderDetails component

import { useEffect, useState } from "react"
import NavBar from "../components/nav/NavBar"
import { OrderList } from "../components/orders/OrderList"
import { NewOrder } from "../components/orders/NewOrder"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})
  const [service, setService] = useState({type: "", table: 0})

  
  useEffect(() => {
    const localPizzaUser = localStorage.getItem('pizza_user')
    const pizzaUserObject = JSON.parse(localPizzaUser)

    setCurrentUser(pizzaUserObject)
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
                    <Route path=':orderId' element={<OrderDetails currentUser={currentUser}/>} />
                    
                </Route>
                <Route path='/NewOrder' element={<NewOrder service={service} setService={setService} currentUser={currentUser}/>} />
                <Route path='/Employees' element={<h1>employye list here bruh</h1>} />
                <Route path='/SalesReport' element={<h1>sales report here bruh</h1>} />
            </Route>
        </Routes>
    )
}
