import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('lottie-plugin')
      .service('myService')
      .getWelcomeMessage();
  },
});
