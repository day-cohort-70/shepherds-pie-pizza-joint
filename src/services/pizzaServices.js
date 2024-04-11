export const getPizzaSizes = () => {
    return fetch("http://localhost:8088/sizes").then(res => res.json())

}
export const getPizzaCheeses = () => {
    return fetch("http://localhost:8088/cheeses").then(res => res.json())

}
export const getPizzaSauces = () => {
    return fetch("http://localhost:8088/sauces").then(res => res.json())

}
export const getPizzaToppings = () => {
    return fetch("http://localhost:8088/toppings").then(res => res.json())

}

export const savePizza = (pizzaId, pizzaOptions) => {
    return fetch(`http://localhost:8088/pizzas/${pizzaId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sizeId: pizzaOptions.size,
        cheeseId: pizzaOptions.cheese,
        sauceId: pizzaOptions.sauce,
      }),
    })
    .then((res) => res.json());
  };



export const selectPizzaTopping = (pizzaId, addPizzaToppings) => {
    return fetch("http://localhost:8088/pizzaToppings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pizzaId: pizzaId,
        toppingId: addPizzaToppings
      }),
    }).then((res) => res.json())

}


