import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `);

  //   // option to do entire query in gatsby-node like so, and then do not need to have query in templates/Pizza.js
  //   // wb prefers the other way because it is easier/faster to change queries while working on the page,
  //   // whereas in gatsby-node will require redeployment which can take a long time, but both is valid
  //   data.pizzas.nodes.forEach((za) => {
  //     actions.createPage({
  //       path: `pizza/${za.slug.current}`,
  //       component: pizzaTemplate,
  //       context: za,
  //     });
  //   });

  data.pizzas.nodes.forEach((za) => {
    actions.createPage({
      path: `pizza/${za.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: za.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // not creating Topping template b/c using the same template as in pages/pizza.js
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
    }
  `);
  data.toppings.nodes.forEach((top) => {
    actions.createPage({
      path: `topping/${top.name}`,
      component: toppingTemplate,
      context: {
        topping: top.name,
        toppingRegex: `${top.name}/i`,
      },
    });
  });
}

// video 26 pulling in data from external APIs
// don't need to create a "turnBeersIntoPages" bc this fetches data
async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();

  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({ ...beer, ...nodeMeta });
  }
}

export async function sourceNodes(params) {
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  //   await turnPizzasIntoPages(params);
  //   await turnToppingsIntoPages(params);
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
  ]);
}
