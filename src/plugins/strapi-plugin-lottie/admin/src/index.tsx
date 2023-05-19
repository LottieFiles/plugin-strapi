import React from "react";
// @ts-ignore
import { prefixPluginTranslations } from "@strapi/helper-plugin";
import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";
import injectColumnInTable from "./extensions/InjectColumnInTable";

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: name,
      },
      Component: async () => {
        const component = await import(
          /* webpackChunkName: "[request]" */ "./pages/App"
        );

        return component;
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ],
    });
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);

    /*******lottie start  ******/
    app.customFields.register({
      name: "lottie",
      pluginId: "strapi-plugin-lottie", // the custom field is created by a color-picker plugin
      type: "json",
      intlLabel: {
        id: "color-picker.color.label",
        defaultMessage: "Lottie",
      },
      intlDescription: {
        id: "color-picker.color.description",
        defaultMessage: "Search and select a lottie",
      },
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "input-component" */ "./components/Lottie/LottieInputField"
          ),
      },
      options: {
        // declare options here
      },
    });
    /*******lottie ends  ******/
  },

  bootstrap(app) {
    app.registerHook(
      "Admin/CM/pages/ListView/inject-column-in-table",
      injectColumnInTable
    );
  },
  async registerTrads(app) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
