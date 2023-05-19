/** @jest-environment jsdom */
import { waitFor, } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { LocalStorage } from "./local-storage";
import { localStore } from "../../helpers/consts";

describe("LocalStorage", () => {
    beforeEach(() => {
        window.localStorage.clear();
        window.localStorage.setItem(localStore.firstExperienced,'first_experienced');
      });

  it("test 1: Check Localstorage class functions",async  () => {
    const instance = new LocalStorage();
    await waitFor(async () => {
        //test if the value is set in localstorage
        instance.setItem("lottie","testing");
        expect(await instance.getItem('lottie')).toEqual('testing');

        //find item in localstorage using regex value
        expect(await instance.findItem(/lottie/)).toBeTruthy();

        //clear() : check if item is removed from localstorage
        await instance.clear()

        expect(await instance.getItem('lottie')).toEqual(null);

        //clear() : check item is removed from localstorage
        instance.setItem("lottie","testing");
        await instance.destroy()
        expect(await instance.findItem(/lottie/)).toBeTruthy();

        //removeItem() : check item with this key is removed from localstorage
        await instance.removeItem('lottie');
        expect(await instance.findItem(/lottie/)).toBeTruthy();        
        
    });
  });
});
