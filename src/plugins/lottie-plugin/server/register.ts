import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => {
  // registeration phase
  strapi.customFields.register({
    name: 'lottie',
    plugin: 'lottie-plugin',
    type: 'string',
  });
};
