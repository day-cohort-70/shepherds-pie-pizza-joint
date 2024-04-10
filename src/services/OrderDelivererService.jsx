export const getAllOrderDeliverers = () => {
    return fetch(`http://localhost:8088/orderDeliverers?_expand=user`).then(res => res.json())
}