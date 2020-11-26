import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';

export default function PizzasPage({ data }) {
  // console.log(data);
  const pizzas = data.pizzas.nodes;
  return (
    <div>
      <p>Hey! I'm the PizzasPage!</p>
      <p>there are {pizzas.length} pizzas!</p>
      <PizzaList pizzas={pizzas} />
    </div>
  );
}

export const query = graphql`
  query PizzaQuery {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        topping {
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
