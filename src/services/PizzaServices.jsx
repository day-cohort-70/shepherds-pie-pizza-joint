export const getPizzasByOrderId = async (orderId) => {
  return fetch(
    `http://localhost:8088/pizzas?orderId=${orderId}&_expand=size&_expand=cheese&_expand=sauce`
  ).then((res) => res.json());
};

export const getToppingsByPizzaId = async (pizzaId) => {
  return fetch(
    `http://localhost:8088/pizzaToppings?pizzaId=${pizzaId}&_expand=topping`
  ).then((res) => res.json());
};

export const getAllPizzaToppings = async (/* pizzaId */) => {
  return fetch(`http://localhost:8088/pizzaToppings?_expand=topping`).then(
    (res) => res.json()
  );
};

export const deletePizzaById = async (pizzaId) => {
  // Fetch all pizza toppings
  const toppingsResponse = await fetch(`http://localhost:8088/pizzaToppings`);
  const allPizzaToppings = await toppingsResponse.json();

  // filtertoppings by pizzID
  const pizzaToppingsToDelete = allPizzaToppings.filter(
    (topping) => topping.pizzaId === pizzaId
  );
  debugger;
  // delete each topping obj 1 by 1
  await pizzaToppingsToDelete.map(async (topping) => {
    await fetch(`http://localhost:8088/pizzaToppings/${topping.id}`, {
      method: "DELETE",
    });
  });

  // Delete the pizza obj
  await fetch(`http://localhost:8088/pizzas/${pizzaId}`, {
    method: "DELETE",
  });

  return true;
};

export const getAllPizzaToppingObjects = async () => {
  return fetch(`http://localhost:8088/pizzaToppings`).then((res) => res.json());
};

export const getAllSizes = async () => {
  return fetch(`http://localhost:8088/sizes`).then((res) => res.json());
};

export const getAllCheeses = async () => {
  return fetch(`http://localhost:8088/cheeses`).then((res) => res.json());
};

export const getAllSauces = async () => {
  return fetch(`http://localhost:8088/sauces`).then((res) => res.json());
};

export const getAllToppings = async () => {
  return fetch(`http://localhost:8088/toppings`).then((res) => res.json());
};

export const createNewPizza = async (pizzaObj) => {
  await fetch(`http://localhost:8088/pizzas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pizzaObj),
  });
};
