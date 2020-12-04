import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  return order.reduce((ac, anOrder) => {
    const pizza = pizzas.find((za) => za.id === anOrder.id);
    return ac + calculatePizzaPrice(pizza.price, anOrder.size);
  }, 0);
}
