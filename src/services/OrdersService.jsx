export const getAllOrders = () => {
    return fetch("http://localhost:8088/orders").then(res => res.json())
}

export const getOrderById = async (orderId) => {
    return fetch(`http://localhost:8088/orders/${orderId}`).then((res) => res.json())
  }

  