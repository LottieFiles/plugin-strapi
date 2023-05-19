export default ({ strapi }) => {
  // registeration phase
  strapi.customFields.register({
    name: "lottie",
    plugin: "strapi-plugin-lottie",
    type: "string",
  });
};
