/**
 * Copyright 2020 Design Barn Inc.
 */

/* eslint-disable promise/catch-or-return */

// import { useTracker } from '@context/tracker-provider';
// import { eventEnums, eventsConst } from "@lottiefiles/plugin-tracker";
import { Appearance, Size, TextColor } from "@lottiefiles/react-ui-kit";
import { useState, useContext } from "react";
import { useMutation, useQuery, useClient } from "urql";

// import packageJson from '../../../package.json';
import { Button } from "@strapi/design-system";
// import { appDetails } from '../../helpers/consts';
import { fetchMutation, fetchQuery } from "../../utils/api";
import {
  FeaturedQuery,
  PopularQuery,
  RecentQuery,
  SearchQuery,
  CreateLoginToken,
  TokenLogin,
  Viewer,
} from "../../utils/queries";
import React from "react";
import { LocalStorage } from "../../utils/storage";
import { localStore } from "../../helpers/consts";
import { LottieContext } from "../../context/lottie-provider";

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
  // const [loginSiteUrl, setLoginSiteUrl] = useState<string>();
  // const [loginToken, setLoginToken] = useState<string>();
  // const [isEnabled, setIsEnabled] = useState<boolean>(false);
  // const [queryInterval, setQueryInterval] = useState<number>(0);
  // const [accessToken, setAccessToken] = useState<number>(0);
  // const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [accessToken, setAccessToken] = useState("");
  const client = useClient();
  // const tracker = useTracker();

  const instance = new LocalStorage();
  const { setAppData } = useContext(LottieContext);

  // async function pollLoginComplete(token, pollStartTime): Promise<void> {
  //   fetchMutation(TokenLogin, { token }).then(async (result) => {
  //     // eslint-disable-next-line no-negated-condition
  //     if (!result.data) {
  //       const currentTime = new Date();

  //       if (
  //         (currentTime.getTime() - pollStartTime.getTime()) / 1000 / 60 <
  //         10
  //       ) {
  //         // eslint-disable-next-line @typescript-eslint/no-misused-promises
  //         setTimeout(async () => pollLoginComplete(token, pollStartTime), 2000);
  //       } else {
  //         setIsLoggingIn(false);
  //       }
  //     } else {
  //       const newToken = result.data.tokenLogin.accessToken;

  //       setAccessToken(newToken);

  //       // client.fetchOptions = {
  //       //   headers: {
  //       //     authorization: newToken ? `Bearer ${newToken}` : '',
  //       //     // 'client-name': packageJson.shortName,
  //       //     // 'client-version': packageJson.version,
  //       //   },
  //       // };
  //       // Needed at this point, because client that was init-ed at App level doesnt have any auth headers.
  //       // We can replace this with an auth exchange eventually?

  //       const viewData = await fetchQuery(Viewer, {
  //         fetchOptions: {
  //           headers: {
  //             authorization: newToken ? `Bearer ${newToken}` : "",
  //             // 'client-name': packageJson.shortName,
  //             // 'client-version': packageJson.version,
  //           },
  //         },
  //       });

  //       onSuccess({
  //         accessToken,
  //         ...viewData,
  //       });
  //     }
  //   });
  // }

  const pollLoginComplete = async (token, pollStartTime) => {
    fetchMutation(TokenLogin, { token: token }).then(async (result: any) => {
      
      if (!result.data) {
        console.log("!result.data");
        const currentTime = new Date();
        if (
          (currentTime.getTime() - pollStartTime.getTime()) / 1000 / 60 <
          10
        ) {
          console.log("< 60");

          setTimeout(() => pollLoginComplete(token, pollStartTime), 2000);
        } else {
          console.log("> 60");

          setIsLoggingIn(false);
        }
      } else {
        console.log("result data");

        let accessToken = result.data.tokenLogin.accessToken;
        setAccessToken(accessToken);
        setAppData(accessToken);
        instance.setItem(localStore.lottieAccessToken, accessToken);
        setIsLoggingIn(false);

        

        onSuccess({
          accessToken,
        });
      }
    });
  };

  const login = async () => {
    setIsLoggingIn(true);
    // setAuth({});

    fetchMutation(CreateLoginToken, { appKey: "strapi-plugin" })
      .then(async (result: any) => {
        if (result.data.createLoginToken) {
          
          window.open(result.data.createLoginToken.loginUrl, "_blank");
          await pollLoginComplete(
            result.data.createLoginToken.token,
            new Date()
          );
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  if (isBrowserLogin && isLoggingIn) {
    return <div className="mt-5">{LoggingInMessage}</div>;
  }

  return (
    <Button
      appearance={Appearance.primary}
      size={Size.small}
      disabled={isLoggingIn}
      className={className}
      textColor={TextColor.white}
      onClick={() => login()}
    >
      {isLoggingIn ? LoggingInMessage : label}
    </Button>
  );
};
