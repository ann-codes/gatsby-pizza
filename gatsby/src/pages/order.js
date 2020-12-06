import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import usePizza from '../utils/usePizza';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import PizzaOrder from '../components/PizzaOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

export default function OrderPage({ data: { pizzas } }) {
  const zas = pizzas.nodes;
  // custom hooks
  const { values, updateValues } = useForm({ name: '', email: '' });
  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = usePizza({
    zas,
    values,
  });
  const listPizzas = pizzas.nodes.map((za) => (
    <MenuItemStyles key={za.id}>
      <Img width="50" height="50" fluid={za.image.asset.fluid} alt={za.name} />
      <div>
        <h2>{za.name}</h2>
      </div>
      <div>
        {['S', 'M', 'L'].map((size) => (
          <button
            type="button"
            key={size}
            onClick={() => addToOrder({ id: za.id, size })}
          >
            {size} {formatMoney(calculatePizzaPrice(za.price, size))}
          </button>
        ))}
      </div>
    </MenuItemStyles>
  ));

  if (message) {
    return <p>{message}</p>;
  }

  return (
    <div>
      <SEO title="Order a Pizza!" />
      <OrderStyles onSubmit={submitOrder}>
        <fieldset disabled={loading}>
          <legend>Your Info</legend>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={updateValues}
          />
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={updateValues}
          />
        </fieldset>
        <fieldset className="menu" disabled={loading}>
          <legend>Menu</legend>
          {listPizzas}
        </fieldset>
        <fieldset className="order" disabled={loading}>
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzas={zas}
          />
        </fieldset>
        <fieldset disabled={loading}>
          <h3>Total: {formatMoney(calculateOrderTotal(order, zas))}</h3>
          <div>{error ? <p>Error: {error}</p> : ''}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing Order...' : 'Order Ahead'}
          </button>
        </fieldset>
      </OrderStyles>
    </div>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        price
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
