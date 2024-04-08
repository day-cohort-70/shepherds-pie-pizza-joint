import { Outlet, Route, Routes } from "react-router-dom"


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
            <NavBar currentUser={currentUser}/>
            <Outlet />
            </>
          }>
            <Route index element={<>yuh</> } />
            <Route path='/OrderList' element={<OrderList currentUser={currentUser} />}/>
            <Route path='/NewOrder' element={< NewOrder service={service} setService={setService}/> }/>
            <Route path='/Employees' element={<>employye list here bruh</> }/>
            <Route path='/SalesReport' element={<>sales report here bruh</>}/>
            
          </Route>
        </Routes>
        )
}