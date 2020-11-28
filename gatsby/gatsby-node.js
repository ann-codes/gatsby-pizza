import path from 'path';

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

  console.log('DATA========================', data.toppings.nodes);

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

export async function createPages(params) {
  //   await turnPizzasIntoPages(params);
  //   await turnToppingsIntoPages(params);

  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
  ]);
}
