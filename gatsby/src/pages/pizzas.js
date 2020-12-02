import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import SEO from '../components/SEO';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage({ data, pageContext }) {
  const pizzas = data.pizzas.nodes;
  return (
    <div>
      <SEO
        title={
          pageContext.topping
            ? `Pizzas with ${pageContext.topping}`
            : 'All Pizzas'
        }
      />

      <ToppingsFilter />
      <PizzaList pizzas={pizzas} />
    </div>
  );
}
// to do in regex, see snippet below:
// query PizzaQuery($toppingRegex: [String]) {
//   pizzas: allSanityPizza(
//     filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
//   ) {...

export const query = graphql`
  query PizzaQuery($topping: [String]) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { in: $topping } } } }
    ) {
      nodes {
        name
        id
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
