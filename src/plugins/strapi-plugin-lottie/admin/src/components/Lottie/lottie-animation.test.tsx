/** @jest-environment jsdom */
import { render, screen, fireEvent, } from "@testing-library/react";
import React from "react";
import LottieAnimation from "./LottieAnimation";
import "@testing-library/jest-dom/extend-expect";
import "jest-styled-components";
import { ThemeProvider, lightTheme } from "@strapi/design-system";
import { act } from "react-dom/test-utils";

describe("LottieDialoge", () => {
  it("test 1: Check if Animation Card is loaded", async () => {
    const animation = {
      cursor: "YXJyYXljb25uZWN0aW9uOjA=",
      node: {
        id: 7961,
        name: "a",
        downloads: 67,
        bgColor: "red",
        lottieVersion: "",
        sourceFileUrl: null,
        url: "https://lottiefiles.com/7961-a",
        gifUrl: "https://assets4.lottiefiles.com/render/kcbci82s.gif",
        lottieUrl: "https://assets4.lottiefiles.com/packages/lf20_cQEUKF.json",
        imageUrl: "https://assets8.lottiefiles.com/render/kcbci82s.png",
        videoUrl: "https://assets4.lottiefiles.com/render/kcbci82s.mp4",
        createdAt: "2019-07-23T07:46:54.000Z",
        updatedAt: "2023-04-04T18:59:16.000Z",
      },
    };

  const {getByTestId} =  render(
      <ThemeProvider theme={lightTheme}>
        <LottieAnimation
          key={animation.node.id}
          animation={animation.node}
          setSelected={(e) => {}}
        />
      </ThemeProvider>
    );

   const animationSelectCheckox =  getByTestId(`animation-${animation.node.id}`)

    await act(async () => {
      await fireEvent.click(animationSelectCheckox);
      //@ts-ignore
      expect(animationSelectCheckox.checked).toBeTruthy()
      await fireEvent.click(animationSelectCheckox);
      //@ts-ignore
      expect(animationSelectCheckox.checked).toBeFalsy()
    });
  });
});
