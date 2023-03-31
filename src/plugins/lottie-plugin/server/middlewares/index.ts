export default {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', `*.lottiefiles.com`],
          'media-src': ["'self'", 'data:', 'blob:', `*.lottiefiles.com`],
          upgradeInsecureRequests: null,
        },
      },
    },
};
