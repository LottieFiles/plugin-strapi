/** @jest-environment jsdom */
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import React from "react";
import LottieInput from "./LottieInputField";
import "@testing-library/jest-dom/extend-expect";
import { renderWithReactIntl } from "../../utils/test-utils";
import "jest-styled-components";

describe("LottieInputField", () => {
  it("test 1: check if placeholder is displaed inside Field is no animation is selected", async () => {
    renderWithReactIntl(
      <LottieInput
        data-testid="lottie-input"
        attribute={{
          type: "test",
        }}
        name="plugin-strapi"
        onChange={(val) => {
          console.log(val);
        }}
        value={undefined}
      />,
      "en",
      {
        "plugin-strapi.color-picker.label": "testing",
      }
    );

    await waitFor(async () => {
      const element = await screen.findByTestId("lottie-input");

      expect(element.outerHTML.match("Click to select")?.length).toBe(1);
    });
  });

  it("test 2: check if selected animation is displayed inside Field", async () => {
    renderWithReactIntl(
      <LottieInput
        data-testid="lottie-input"
        attribute={{
          type: "test",
        }}
        name="strapi-plugin-lottie"
        onChange={(val) => {
          console.log(val);
        }}
        value={JSON.stringify({
          lottieUrl:
            "https://assets2.lottiefiles.com/dotlotties/dlf10_oehbsgal.lottie",
        })}
      />,
      "en",
      {
        "plugin-strapi.color-picker.label": "testing",
      }
    );

    const element = await screen.findByTestId("lottie-input");

    expect(element.outerHTML.match("dotlottie-player")?.length).toBe(1);
  });

  it("test 1: Check is dialog is visible when clicked on Edit button", async () => {
    const { container } = renderWithReactIntl(
      <LottieInput
        data-testid="lottie-input"
        attribute={{
          type: "test",
        }}
        name="strapi-plugin-lottie"
        onChange={(val) => {}}
        value={JSON.stringify({
          lottieUrl:
            "https://assets2.lottiefiles.com/dotlotties/dlf10_oehbsgal.lottie",
        })}
      />,
      "en",
      {
        "plugin-strapi.color-picker.label": "testing",
      }
    );

    await act(async () => {
      const editField = container.querySelector('[id="edit-animation-field"]');
      await fireEvent.click(editField);
      await waitFor(async () => {
        let animationModal = await screen.getByTestId(
          "lottie-animation-big-modal"
        );
        expect(animationModal).toBeTruthy();
      });

      const deleteField = container.querySelector(
        '[id="delete-animation-field"]'
      );
      await fireEvent.click(deleteField);

      await waitFor(async () => {
        // const toggleDialogButton = await screen.getByTestId(
        //   "toggle-dialog-button"
        // );
        // console.log("----toggleDialogButton", container.outerHTML.match("dotlottie-player")?.length);
        //expect(container.outerHTML.match("dotlottie-player")?.length).toBe(1);
      });
    });
  });
});
