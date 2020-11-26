import { Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';

function SinglePizza({ pizza }) {
  return (
    <div>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h3>
          <span className="mark">{pizza.name}</span>
        </h3>
        <p>{pizza.topping.map((top) => top.name).join(', ')}</p>
        <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
      </Link>
    </div>
  );
}

export default function PizzaList({ pizzas }) {
  const listPizzas = pizzas.map((za) => <SinglePizza pizza={za} key={za.id} />);
  return (
    <div>
      <p>there are {pizzas.length} zas!</p>
      {listPizzas}
    </div>
  );
}