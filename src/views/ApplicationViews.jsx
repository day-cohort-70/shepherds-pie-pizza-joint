import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { NurseryList } from "../components/nurseries/NurseryList"
import { DistributorList } from "../components/distributors/DistributorList"
import { RetailerList } from "../components/retailers/RetailerList"
import { useEffect, useState } from "react"
import { ShoppingCart } from "../components/users/ShoppingCart"
import { getShoppingCartByUserId } from "../services/userService"
import { Welcome } from "../components/welcome stream/Welcome"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})
  const [shoppingCart, setShoppingCart] = useState([])
  
  useEffect(() => {
    const localPizzaUser = localStorage.getItem('pizza_user')
    const pizzaUserObject = JSON.parse(localPizzaUser)

    setCurrentUser(pizzaUserObject)
  }, [])

  useEffect(() => {
    if (currentUser) {
      // Fetch shopping cart items for the current user
      getShoppingCartByUserId(currentUser.id).then((cartArray) => {
        setShoppingCart(cartArray);
      });
    }
  }, [currentUser])
    return (

        <Routes>
          <Route path="/" element={
            <>
            <NavBar currentUser={currentUser} shoppingCart={shoppingCart}/>
            <Outlet />
            </>
          }>
            <Route index element={<Welcome />} />
            <Route path='/OrderList' element={<OrderList currentUser={currentUser} />}/>
            <Route path='/NewOrder' element={<>new order shit here bruh</> }/>
            <Route path='/Employees' element={<>employye list here bruh</> }/>
            <Route path='/SalesReport' element={<>sales report here bruh</>}/>
            
          </Route>
        </Routes>
        )
}