export default ({ strapi }) => {
  // registeration phase
  strapi.customFields.register({
    name: "lottie",
    plugin: "lottie-plugin",
    type: "string",
  });
};
