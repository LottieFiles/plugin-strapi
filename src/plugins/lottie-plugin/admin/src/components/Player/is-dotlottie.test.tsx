/** @jest-environment jsdom */
import { isDotLottieString } from "./is-dotlottie";
import '@testing-library/jest-dom/extend-expect'

describe("isDotLottie", () => {
  it("test 1: Check if animation is a dotlottie animation",async  () => {
    const isLottie = isDotLottieString("https://assets2.lottiefiles.com/dotlotties/dlf10_oehbsgal.lottie")
    expect(isLottie).toBeTruthy();
  });
});
