# LottieFiles plugin for Strapi

A plugin for [Strapi CMS](https://strapi.io), that allows creating a custom input field for adding lottie animations seamlessly via [LottieFiles](https://lottiefiles.com/recent) public animation repository.

## Table of contents

- ✨ [Features](##-features)
- ⏳ [Installation](##-installation)
- 🔧 [Configuration](##-configuration)
- 👨‍💻 [Usage](##-usage)
- 🕸️ [API](##-api)

---

## ✨ `features`

- Custom field creation in Strapi models
- Browse LottieFiles public animation repository based on:
  - [Recent animations](https://lottiefiles.com/recent)
  - [Popular animations](https://lottiefiles.com/popular)
  - [Featured animations](https://lottiefiles.com/featured)
- Keyword based search
- Animation metadata, with creator info

---

## ⏳ `installation`

At the root of your Strapi project, run the following commands to add the plugin

```
npm install strapi-plugin-lottie
# or
yarn add strapi-plugin-lottie
```

Start your Strapi application with in development mode

```
npm run develop
# or
yarn develop
```

---

## 🔧 `configuration`

To start using the plugin, enable the plugin in strapi configuration.

```
./config/plugins.ts

export default {
    // ...
    "strapi-plugin-lottie": {
        enabled: true
    },
    // ...
}
```

Also, configure the `strapi::security` middleware by adding the directives below to allow the plugin to load required assets.

```
./config/middleware.ts

export default [
  // ...
  {
      name: "strapi::security",
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            "connect-src": ["'self'", "https:"],
            "img-src": [
              "'self'",
              "data:",
              "blob:",
              "market-assets.strapi.io",
              "*.lottiefiles.com",
            ],
            upgradeInsecureRequests: null,
          },
        },
      }
  },
  // ...
];
```

---

## 👨‍💻 `usage`

- Goto `Content-Type Builder` and create a new collection type. In the field selection dialogue, navigate to `custom` tab. Select `Lottie` field
- Give the new field a name and confirm. The new field should be visible in the collection's field list, with type: `Custom field`
- Goto `Content Manager`, select the collection type that was created. Click the `Create new entry`
- Click the `Lottie Field`, to open the animation browser modal.
- Once selected, the animation preview can be seen in the Lottie field as well as collection list view after saving the entry

---

## 🕸️ `api`

Lottie field data can be consumed via both REST and GraphQL APIs provided by Strapi CMS.

In both apis, the returned field data has the following structure

```
{
    "bgColor": "#fff",
    "gifUrl": "https://assets1.lottiefiles.com/render/lhu59gtz.gif",
    "imageUrl": "https://assets3.lottiefiles.com/render/lhu59gtz.png",
    "lottieUrl": "https://assets9.lottiefiles.com/dotlotties/dlf10_rrHcSPZWAB.lottie",
    "name": "Wave Form",
    "createdBy": {
      "avatarUrl": "https://lh3.googleusercontent.com/a/AGNmyxburVBP66UgfPD1D-I7l1wIwJmc1vVKOiGHXfrM=s96-c",
      "firstName": "Juan"
    }
  }
```
