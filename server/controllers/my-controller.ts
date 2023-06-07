export default ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin("strapi-plugin-lottie")
      .service("myService")
      .getWelcomeMessage();
  },
});
