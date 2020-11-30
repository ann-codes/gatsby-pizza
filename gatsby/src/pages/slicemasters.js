import { graphql, Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';

const SlicemasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemasterStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: --6rem;
    transform: rotate(1deg);
    text-align: center;
  }
`;

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 2) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        name
        id
        description
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

export default function SliceMastersPage({ data, pageContext }) {
  const slicemasters = data.slicemasters.nodes;

  const listSlicemasters = slicemasters.map((master) => (
    <SlicemasterStyles key={master.id}>
      <Link to={`/slicemaster/${master.slug.current}`}>
        <h2>
          <span className="mark">{master.name}</span>
        </h2>
      </Link>
      <Img fluid={master.image.asset.fluid} />
      <p className="description">{master.description}</p>
    </SlicemasterStyles>
  ));

  return (
    <>
      <Pagination
        pageSize={
          pageContext.pageSize || parseInt(process.env.GATSBY_PAGE_SIZE)
        }
        totalCount={data.slicemasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/slicemasters"
      />
      <SlicemasterGrid>{listSlicemasters}</SlicemasterGrid>
    </>
  );
}
