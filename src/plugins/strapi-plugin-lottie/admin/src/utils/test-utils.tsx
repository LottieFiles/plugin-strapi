import React from "react";
import { IntlProvider } from "react-intl";
import { render } from "@testing-library/react";
import {
  ThemeProvider,
  lightTheme,
} from "@strapi/design-system";

const renderWithReactIntl = (component, locale, messages) => {
  try {
    return render(
      <ThemeProvider theme={lightTheme}>
        <IntlProvider locale={locale} messages={messages}>
          {React.cloneElement(component)}
        </IntlProvider>
      </ThemeProvider>
    );
  } catch (error) {
    console.log('UTILS EROR', error)
    return null
  }

};

export { renderWithReactIntl };
