/**
 * Copyright 2021 Design Barn Inc.
 */


import React, { useEffect, useState } from "react";

import { isDotLottieString } from "./is-dotlottie";
// import { Loading } from '../Loading/loading';

 // @ts-ignore
import "@dotlottie/player-component";
import "@lottiefiles/lottie-player";

interface ILottiePlayerProps {
  autoplay?: boolean;
  loop?: boolean;
  bgColor?: string;
  isPreview?: boolean;
  isSimple?: boolean;
  src?: string;
  style?: React.CSSProperties;
  setBackground?: (value: string) => void;
}

export const LottiePlayer = React.forwardRef(
  (
    {
      autoplay = true,
      bgColor = "none",
      isPreview = false,
      loop = true,
      ...props
    }: ILottiePlayerProps,
    ref
  ) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(false);
    }, [bgColor]);

    if (loading) return <>Loading....</>;
    //<Loading />;

    // @ts-ignore
    const isDL = isDotLottieString(props.src || "");

  

    if (isDL) {
      return (
   
        // @ts-ignore
        <dotlottie-player
          autoplay={autoplay}
          loop={loop}
          background={bgColor}
          {...props}
          style={props.style}
        />
      );
    }

    return (

    // @ts-ignore
      <lottie-player
        autoplay={autoplay}
        loop={loop}
        background={bgColor}
        {...props}
        style={props.style}
     />
    );
  }
);
