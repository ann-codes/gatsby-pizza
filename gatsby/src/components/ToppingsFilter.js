import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    text-decoration: none;
    .count {
      background: white;
      padding: 2px 5px;
    }
    .active {
      background: var(--yellow);
    }
  }
`;

const countPizzasInToppings = (pizzas) => {
  const counts = pizzas
    .map((za) => za.toppings)
    .flat()
    .reduce((ac, cTop) => {
      if (ac[cTop.id]) {
        ac[cTop.id].count += 1;
      } else {
        ac[cTop.id] = {
          id: cTop.id,
          name: cTop.name,
          count: 1,
        };
      }
      return ac;
    }, {});
  return Object.values(counts).sort((a, b) => b.count - a.count);
};

export default function ToppingsFilter() {
  const data = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);

  const listOfToppingsWithCounts = countPizzasInToppings(data.pizzas.nodes).map(
    (top) => (
      <Link to={`/topping/${top.name}`} key={top.id}>
        <span className="name">{top.name}</span>
        <span className="count">{top.count}</span>
      </Link>
    )
  );

  return (
    <ToppingStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{data.pizzas.nodes.length}</span>
      </Link>
      {listOfToppingsWithCounts}
    </ToppingStyles>
  );
}
