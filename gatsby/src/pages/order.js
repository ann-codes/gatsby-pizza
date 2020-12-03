import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';

export default function OrderPage({ data: { pizzas } }) {
  console.log(pizzas);
  // custom hook
  const { values, updateValues } = useForm({ name: '', email: '' });

  const listPizzas = pizzas.nodes.map((za) => (
    <MenuItemStyles key={za.id}>
      <Img width="50" height="50" fluid={za.image.asset.fluid} alt={za.name} />
      <div>
        <h2>{za.name}</h2>
      </div>
      <div>
        {['S', 'M', 'L'].map((size) => (
          <button type="button">
            {size} {formatMoney(calculatePizzaPrice(za.price, size))}
          </button>
        ))}
      </div>
    </MenuItemStyles>
  ));

  return (
    <div>
      <SEO title="Order a Pizza" />
      <OrderStyles>
        <fieldset>
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
        <fieldset className="menu">
          <legend>Menu</legend>
          {listPizzas}
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
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
