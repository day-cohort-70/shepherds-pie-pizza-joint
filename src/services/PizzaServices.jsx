export const getPizzasByOrderId = async (orderId) => {
    return fetch(`http://localhost:8088/pizzas?orderId=${orderId}&_expand=size&_expand=cheese&_expand=sauce`).then((res) => res.json())
  }


  export const getToppingsByPizzaId = async (pizzaId) => {
    return fetch(`http://localhost:8088/pizzaToppings?pizzaId=${pizzaId}&_expand=topping`).then((res) => res.json())
}


export const getAllPizzaToppings= async (pizzaId) => {
    return fetch(`http://localhost:8088/pizzaToppings?_expand=topping`).then((res) => res.json())
}
