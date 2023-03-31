/**
 * Copyright 2021 Design Barn Inc.
 */

import {
  Controls as DLControls,
  IPlayerProps as IDLPlayerProps,
  DotLottiePlayer as DLPlayer,
} from "@lottiefiles/dotlottie-react-player";
import {
  Controls,
  IPlayerProps,
  Player,
} from "@lottiefiles/react-lottie-player";
import React, { LegacyRef, useEffect, useState } from "react";

import { isDotLottieString } from "./is-dotlottie";
// import { Loading } from '../Loading/loading';

import "@dotlottie/player-component";

type PlayerProps = IPlayerProps | IDLPlayerProps;
interface ILottiePlayerProps extends Omit<PlayerProps, "autoplay"> {
  autoplay?: boolean;
  bgColor?: string;
  isPreview?: boolean;
  isSimple?: boolean;
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

    const children = isPreview
      ? null
      : [
          isDL ? (
            <>
              <DLControls
                key={1}
                showLabels
                visible
                buttons={["play", "repeat", "debug", "frame"]}
              />
            </>
          ) : (
            <>
              <Controls
                key={1}
                showLabels
                visible
                buttons={["play", "repeat", "debug", "frame"]}
              />
            </>
          ),
        ];

    if (isDL) {
      return (
        // <DLPlayer
        //   ref={ref as LegacyRef<DLPlayer>}
        //   autoplay={autoplay}
        //   loop={loop}
        //   background={bgColor}
        //   {...(props as IDLPlayerProps)}
        //   onBackgroundChange={async (color: string): Promise<void> => {
        //     props.setBackground && props.setBackground(color);
        //   }}
        //   style={
        //     isPreview
        //       ? {
        //           height: '100%',
        //           width: '100%',
        //           borderRadius: '4px',
        //           overflow: 'hidden',
        //           ...props.style,
        //         }
        //       : props.style
        //   }
        // >
        //   {children}
        // </DLPlayer>
       // @ts-ignore
        <dotlottie-player
        ref={ref as LegacyRef<DLPlayer>}
        autoplay={autoplay}
        loop={loop}
        background={bgColor}
        {...(props as IDLPlayerProps)}
        onBackgroundChange={async (color: string): Promise<void> => {
          props.setBackground && props.setBackground(color);
        }}
        style={
          isPreview
            ? {
                height: '100%',
                width: '100%',
                borderRadius: '4px',
                overflow: 'hidden',
                ...props.style,
              }
            : props.style
        }
        />
      );
    }

    return (
      <Player
        ref={ref as LegacyRef<Player>}
        autoplay={autoplay}
        loop={loop}
        background={bgColor}
        {...props}
        onBackgroundChange={async (color: string): Promise<void> => {
          props.setBackground && props.setBackground(color);
        }}
        style={
          isPreview
            ? {
                height: "100%",
                width: "100%",
                borderRadius: "4px",
                ...(props.style as any),
              }
            : props.style
        }
      >
        {children}
      </Player>
    );
  }
);
