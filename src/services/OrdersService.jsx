import { deletePizzaById } from "./PizzaServices"

export const getAllOrders = () => {
    return fetch("http://localhost:8088/orders?_embed=pizzas").then(res => res.json())
}

export const getOrderById = async (orderId) => {
    return fetch(`http://localhost:8088/orders/${orderId}`).then((res) => res.json())
  }

export const postNewOrder = (newOrderObj) => {
    return fetch("http://localhost:8088/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newOrderObj)
    })
}

export const deleteOrderById = async (orderId, orderDeliverer) => {
   
    const response = await fetch(`http://localhost:8088/pizzas?orderId=${orderId}`)
    const pizzas = await response.json()
    
    for (const pizza of pizzas) {
        const toppingsResponse = await fetch(`http://localhost:8088/pizzaToppings?pizzaId=${pizza.id}`)
        const pizzaToppings = await toppingsResponse.json()

      
        for (const topping of pizzaToppings) {
            await fetch(`http://localhost:8088/pizzaToppings/${topping.id}`, {
                method: 'DELETE',
            })
        }

     
        await fetch(`http://localhost:8088/pizzas/${pizza.id}`, {
            method: "DELETE",
        });
    }

    if (orderDeliverer && typeof orderDeliverer === 'object' && "id" in orderDeliverer) {
        await fetch(`http://localhost:8088/orderDeliverers/${orderDeliverer.id}`, {
            method: "DELETE"
        });
    } 

    await fetch(`http://localhost:8088/orders/${orderId}`, {
        method: "DELETE",
    })

    return true
};



export const assignDeliverer = async (delivererObj) => {
    await fetch(`http://localhost:8088/orderDeliverers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(delivererObj)
    })
}

export const updateDeliverer = async (delivererObj, orderDelivererId) => {
    await fetch(`http://localhost:8088/orderDeliverers/${orderDelivererId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(delivererObj)
    })
}

export const updateOrder = async (updatedOrder) => {
    await fetch(`http://localhost:8088/orders/${updatedOrder.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedOrder)
    })
}