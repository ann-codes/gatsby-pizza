/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

const PizzaGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

// $slug is passed in from gastby-node, context {slug}
export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      slug {
        current
      }
      toppings {
        name
        id
        vegetarian
      }
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;

export default function SinglePizzaPage({ data: { pizza } }) {
  const isVeg = pizza.toppings
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
    .reduce((ans, ct) => {
      if (ct && !ct.vegetarian) ans = false;
      return ans;
    }, true);

  const toppingsList = pizza.toppings.map((top) => (
    <li key={top.id}>{top.name}</li>
  ));
  return (
    <>
      <SEO title={pizza.name} image={pizza.image?.asset?.fluid?.src} />
      <PizzaGrid>
        <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
        <div>
          <h1>
            {pizza.name} {isVeg && '🌿'}
          </h1>
          <ul>{toppingsList}</ul>
        </div>
      </PizzaGrid>
    </>
  );
}
