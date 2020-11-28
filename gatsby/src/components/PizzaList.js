import { Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const PizzaStyles = styled.div`
  display: grid;
  /* Below takes row sizing from the PizzaGridStyles grid, not PizzaStyles */
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

function SinglePizza({ pizza }) {
  return (
    <PizzaStyles>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h3>
          <span className="mark">{pizza.name}</span>
        </h3>
      </Link>
      <p>
        {pizza.toppings
          .map((top) => top.name)
          .sort()
          .join(', ')}
      </p>
      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
    </PizzaStyles>
  );
}

export default function PizzaList({ pizzas }) {
  const listPizzas = pizzas.map((za) => <SinglePizza pizza={za} key={za.id} />);
  return <PizzaGridStyles>{listPizzas}</PizzaGridStyles>;
}
