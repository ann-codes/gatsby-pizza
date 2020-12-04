import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  const orderList = order.map((anOrder, idx) => {
    const pizza = pizzas.find((za) => za.id === anOrder.id);
    return (
      <MenuItemStyles key={anOrder.id}>
        <Img fluid={pizza.image.asset.fluid} />
        <h2>{pizza.name}</h2>
        <p>{formatMoney(calculatePizzaPrice(pizza.price, anOrder.size))}</p>
        <button
          type="button"
          className="remove"
          title={`Remove ${anOrder.size} ${pizza.name} from order`}
          onClick={() => removeFromOrder(idx)}
        >
          &times;
        </button>
      </MenuItemStyles>
    );
  });

  return (
    <>
      <p>ORDER count: {order.length}</p>
      {orderList}
    </>
  );
}
