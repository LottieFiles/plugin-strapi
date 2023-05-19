/**
 * Copyright 2020 Design Barn Inc.
 */


import { useContext, useState } from "react";

 import packageJson from '../../../../package.json';
import { Button } from "@strapi/design-system";
import React from "react";
import styled from "styled-components";
import { LottieContext } from "../../context/lottie-provider";
import { localStore } from "../../helpers/consts";
import { CreateLoginToken, TokenLogin, Viewer } from "../../utils/queries";
import { LocalStorage } from "../../utils/storage";

const LoginButton = styled(Button)`
  borderradius: 0.5rem;
  display: inline-block !important;
  cursor: pointer;
  transitionproperty: all;
  transitionduration: 0.25s;
  padding-left: 2.25rem !important;
  padding-right: 2.25rem !important;
  height: 3.5rem !important;
  background: #00c1a2;
  border-radius: 12px;
  border: none;
  :hover {
    background: #029d91;
  }
`;

interface ILoginAutoProps {
  LoggingInMessage?: string;
  className?: string;
  isBrowserLogin?: boolean;
  label: string;
  onClick(): void;
  onError(): void;
  onSuccess(val: unknown): void;
}

export const LoginAuto: React.FC<ILoginAutoProps> = ({
  LoggingInMessage = "Logging In...",
  className,
  isBrowserLogin = false,
  label,
  onSuccess,
}: ILoginAutoProps) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const instance = new LocalStorage();
  const { fetchMutation, fetchQuery, setAppData } = useContext(LottieContext);

  const pollLoginComplete = async (token, pollStartTime) => {
    const response: any = await fetchMutation(TokenLogin, { token: token });

    if (!response.data) {
      const currentTime = new Date();
      if ((currentTime.getTime() - pollStartTime.getTime()) / 1000 / 60 < 10) {
        setTimeout(() => pollLoginComplete(token, pollStartTime), 2000);
      } else {
        setIsLoggingIn(false);
      }
    } else {
      setIsLoggingIn(false);
      let accessToken = response.data.tokenLogin.accessToken;
      setAppData(accessToken);
      instance.setItem(localStore.lottieAccessToken, accessToken);

      const viewData = await fetchQuery(Viewer, {
        fetchOptions: {
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : "",
            'client-name': packageJson.name,
            'client-version': packageJson.version,
          },
        },
      });

      onSuccess({
        accessToken,
      });
    }
  };

  const login = async () => {
    setIsLoggingIn(true);

    let response: any = await fetchMutation(CreateLoginToken, {
      appKey: "strapi-plugin",
    });

    if (response.error) {
      console.log("err", response.error);
      return;
    }

    window.open(response.data.createLoginToken.loginUrl, "_blank");
    await pollLoginComplete(response.data.createLoginToken.token, new Date());
  };

  if (isBrowserLogin && isLoggingIn) {
    return <div className="mt-5">{LoggingInMessage}</div>;
  }

  return (
    <LoginButton
      style={{ margin: "auto" }}
      onClick={() => login()}
      variant="default"
      className={className}
    >
      {isLoggingIn ? LoggingInMessage : label}
    </LoginButton>
  );
};
