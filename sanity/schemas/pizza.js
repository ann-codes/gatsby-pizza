/* eslint-disable no-param-reassign */
import { MdLocalPizza } from 'react-icons/md';
import PriceInput from '../components/PriceInput';

export default {
  name: 'pizza',
  title: 'Pizzas',
  type: 'document',
  icon: MdLocalPizza,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the pizza (in cents)',
      validation: (Rule) => Rule.min(1000).max(5000),
      inputComponent: PriceInput,
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      veg0: 'toppings.0.vegetarian',
      veg1: 'toppings.1.vegetarian',
      veg2: 'toppings.2.vegetarian',
      veg3: 'toppings.3.vegetarian',
      veg4: 'toppings.4.vegetarian',
      top0: 'toppings.0.name',
      top1: 'toppings.1.name',
      top2: 'toppings.2.name',
      top3: 'toppings.3.name',
      top4: 'toppings.4.name',
    },
    prepare: ({ title, media, ...vegAndToppings }) => {
      const values = Object.values(vegAndToppings);
      const veg = values.slice(0, values.length / 2);
      const tops = values.slice(values.length / 2, values.length);
      const toppingList = tops.filter(Boolean);
      const isVeg = tops.reduce((ans, ct, idx) => {
        if (ct && !veg[idx]) ans = false;
        return ans;
      }, true);
      // alternative below, 2 loops
      // const notVeg = veg.filter((v) => v !== undefined).includes(false);
      // title: `${title} ${notVeg ? '' : '🌿'}`,
      return {
        title: `${title} ${isVeg ? '🌿' : ''}`,
        media,
        subtitle: toppingList.sort().join(', '),
      };
    },
  },
};
