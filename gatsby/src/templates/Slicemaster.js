import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

// $slug is passed in from gastby-node, context {slug}
export const query = graphql`
  query($slug: String!) {
    master: sanityPerson(slug: { current: { eq: $slug } }) {
      id
      name
      description
      slug {
        current
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

export default function SingleSlicemasterPage({ data: { master } }) {
  console.log('ALL DATA', master, master.name);
  const x = master;
  console.log(x);

  return (
    <>
      <SEO
        title={`Slicemaster ${master.name}`}
        image={master.image.asset.src}
      />

      <div className="center">
        <Img fluid={master.image.asset.fluid} />
        <h2 className="mark">{master.name}</h2>
        <p>{master.description}</p>
      </div>
    </>
  );
}
