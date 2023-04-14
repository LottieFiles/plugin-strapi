/** @jest-environment jsdom */
import {
  screen,
  fireEvent,
  queryByAttribute,
  waitFor,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import React from "react";
import LottieInputDialogue from "./LottieInputDialogue";
import "@testing-library/jest-dom/extend-expect";
import { renderWithReactIntl } from "../../utils/test-utils";
import { pipe, fromValue, delay } from "wonka";
import "jest-styled-components";

import { LottieContext } from "../../context/lottie-provider";

window.open = jest.fn();
jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

const fakeResponse = {
  data: {
    recentPublicAnimations: {
      edges: [
        {
          cursor: "YXJyYXljb25uZWN0aW9uOjA=",
          node: {
            id: 7961,
            name: "a",
            downloads: 67,
            lottieVersion: "",
            sourceFileUrl: null,
            url: "https://lottiefiles.com/7961-a",
            gifUrl: "https://assets4.lottiefiles.com/render/kcbci82s.gif",
            lottieUrl:
              "https://assets4.lottiefiles.com/packages/lf20_cQEUKF.json",
            imageUrl: "https://assets8.lottiefiles.com/render/kcbci82s.png",
            videoUrl: "https://assets4.lottiefiles.com/render/kcbci82s.mp4",
            createdAt: "2019-07-23T07:46:54.000Z",
            updatedAt: "2023-04-04T18:59:16.000Z",
          },
        },
        {
          cursor: "YXJyYXljb25uZWN0aW9uOjE=",
          node: {
            id: 78829,
            name: "Alphabet A Animation",
            downloads: 87,
            lottieVersion: "",
            sourceFileUrl: null,
            url: "https://lottiefiles.com/78829-alphabet-a-animation",
            gifUrl: "https://assets2.lottiefiles.com/render/ku6yqk6c.gif",
            lottieUrl:
              "https://assets9.lottiefiles.com/packages/lf20_oxkv3tux.json",
            imageUrl: "https://assets1.lottiefiles.com/render/ku6yqk6c.png",
            videoUrl: "https://assets2.lottiefiles.com/render/ku6yqk6c.mp4",
            createdAt: "2021-09-30T08:56:23.000Z",
            updatedAt: "2023-04-08T15:22:32.000Z",
          },
        },
      ],
      pageInfo: {
        endCursor: "YXJyYXljb25uZWN0aW9uOjE5",
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: "YXJyYXljb25uZWN0aW9uOjA=",
      },
    },
  },
};
let mockClient = {
  fetchMutation: jest.fn((response) => {
    let { name } = response.definitions[0].selectionSet.selections[0];
    if (name.value === "createLoginToken") {
      return {
        data: {
          createLoginToken: {
            token: "",
            loginUrl: "",
          },
        },
      };
    } else if (name.value === "tokenLogin") {
      return Promise.resolve(() => ({
        data: {
          tokenLogin: {
            accessToken: "accessToken",
          },
        },
      }));
    } else response;
  }),
};

describe("LottieDialoge", () => {
  it("test 1: Check If user is loggedIn when Clicked on Login Auto button", async () => {
    await act(async () => {
      const { unmount } = await renderWithReactIntl(
        <LottieContext.Provider
          value={{
            appData: {
              accessToken: "",
            },
            setAppData: () => {},
            fetchQuery: jest.fn(() => {
              return Promise.resolve([]);
            }),
            fetchMutation: mockClient.fetchMutation,
            onLogout: () => {},
          }}
        >
          <LottieInputDialogue
            data-testid="lottie-input"
            setIsVisible=""
            handleSelect=""
          />
        </LottieContext.Provider>,
        "en",
        {
          "plugin-strapi.color-picker.label": "testing",
        }
      );
      expect(
        await screen.getByTestId("lottie-animation-big-modal")
      ).toBeTruthy();

      const loginButton = await screen
        .getByText("Log Auto in with your LottieFiles account")
        .closest("button");
      await fireEvent.click(loginButton);
      const loggingInButton = await screen
        .getByText("Logging In...")
        .closest("button");

      expect(loggingInButton).toBeTruthy();

      const loggingInMessage = screen
        .getByText("Logging In...")
        .closest("button");

      expect(loggingInMessage).toBeTruthy();
    });
  });

  it("test 1: Check if animation grid is visible when user is logged In", async () => {
    await act(async () => {
      await renderWithReactIntl(
        <LottieContext.Provider
          value={{
            appData: {
              accessToken: "accessToken",
            },
            setAppData: () => {},
            fetchQuery: jest.fn(() => {
              return Promise.resolve([]);
            }),
            fetchMutation: () => {},
            onLogout: () => {},
          }}
        >
          <LottieInputDialogue
            data-testid="lottie-input"
            setIsVisible=""
            handleSelect=""
          />
        </LottieContext.Provider>,
        "en",
        {
          "plugin-strapi.color-picker.label": "testing",
        }
      );

      
    });

    await waitFor(async () => {
      const animationGrid = await screen.getByTestId("animation-grid");
      expect(animationGrid).toBeTruthy();
    })

  });

  it("test 1: Check if animations are visible inside animation grid", async () => {
    await act(async () => {
      await renderWithReactIntl(
        <LottieContext.Provider
          value={{
            appData: {
              accessToken: "accessToken",
            },
            setAppData: () => {},
            fetchQuery: jest.fn(() => {
              return Promise.resolve(fakeResponse);
            }),
            fetchMutation: () => {},
            onLogout: () => {},
          }}
        >
          <LottieInputDialogue
            data-testid="lottie-input"
            setIsVisible=""
            handleSelect=""
          />
        </LottieContext.Provider>,
        "en",
        {
          "plugin-strapi.color-picker.label": "testing",
        }
      );

      
    });

    const firstAnimation = await screen.getByTestId(`animation-${fakeResponse.data.recentPublicAnimations.edges[0].node.id}`);
    expect(firstAnimation).toBeTruthy();
    
  });
});
