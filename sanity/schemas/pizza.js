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
      name: 'topping',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      veg0: 'topping.0.vegetarian',
      veg1: 'topping.1.vegetarian',
      veg2: 'topping.2.vegetarian',
      veg3: 'topping.3.vegetarian',
      topping0: 'topping.0.name',
      topping1: 'topping.1.name',
      topping2: 'topping.2.name',
      topping3: 'topping.3.name',
    },
    prepare: ({ title, media, veg0, veg1, veg2, veg3, ...toppings }) => {
      const veg = [veg0, veg1, veg2, veg3];
      const toppers = Object.values(toppings).filter(Boolean);
      const isVeg = Object.values(toppings).reduce((ac, cv, idx) => {
        if (cv) {
          if (!veg[idx]) {
            ac = false;
          }
        }
        return ac;
      }, true);
      return {
        title,
        media,
        subtitle: `${toppers.join(', ')} ${isVeg ? '🌿' : ''}`,
      };
    },
  },
};
