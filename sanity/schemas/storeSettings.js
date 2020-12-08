/* eslint-disable no-param-reassign */
import { MdStore } from 'react-icons/md';
import PriceInput from '../components/PriceInput';

export default {
  name: 'storeSettings',
  title: 'Settings',
  type: 'document',
  icon: MdStore,
  fields: [
    {
      name: 'name',
      title: 'Store Name',
      type: 'string',
      description: 'Name of the Store',
    },
    {
      name: 'slicemaster',
      title: 'Slicemasters Currently Slicing',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
    {
      name: 'hotSlices',
      title: 'Hot Slices Available',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'pizza' }] }],
    },
  ],
};
