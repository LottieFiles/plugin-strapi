/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import React from "react";
import { LottiePlayer } from "./lottie-player";
import '@testing-library/jest-dom/extend-expect'

describe("LottiePlayer", () => {

  it("test 1: Check background Color is applied to lottie animation",async  () => {
    render(
      <LottiePlayer
        data-testid="player"
        bgColor="red"
        src="https://assets6.lottiefiles.com/packages/lf20_8KVR8EeqgC.json"
        style={{ width: "100%" }}
      />
    );
    const element = await screen.findByTestId('player')

    expect(element.getAttribute('background')).toBe('red');
  });

  it("test 2: Check lottie-player is visible when animation is .json animation.",async  () => {
    render(
      <LottiePlayer
        data-testid="player"
        bgColor="red"
        src="https://assets6.lottiefiles.com/packages/lf20_8KVR8EeqgC.json"
        style={{ width: "100%" }}
      />
    );
    const element = await screen.findByTestId('player');

    expect(element.outerHTML.match('lottie-player')?.length).toBe(1)
  });

  it("test 3: Check dotlottie-player is visible when animation is a .dolottie animation.",async  () => {
    render(
      <LottiePlayer
        data-testid="player"
        src="https://assets2.lottiefiles.com/dotlotties/dlf10_oehbsgal.lottie"
        style={{ width: "100%" }}
        isPreview={true}
      />
    );
    const element = await screen.findByTestId('player');

    expect(element.outerHTML.match('dotlottie-player')?.length).toBe(1)
  });
});
