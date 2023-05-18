export default ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin("lottie-plugin")
      .service("myService")
      .getWelcomeMessage();
  },
});
