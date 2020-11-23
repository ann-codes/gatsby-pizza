import { MdPerson } from 'react-icons/md';

export default {
  name: 'person',
  title: 'Slice Masters',
  type: 'document',
  icon: MdPerson,
  fields: [
    {
      name: 'name',
      title: "Slice Master's Name",
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
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Tell us about them!',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
