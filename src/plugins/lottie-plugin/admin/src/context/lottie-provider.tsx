/**
 * Copyright 2022 Design Barn Inc.
 */

import React, { createContext, useEffect, useState } from "react";
import { createClient, Provider as UrqlProvider } from "urql";

import { api, localStore } from "../helpers/consts";
import { LocalStorage } from "../utils/storage";

interface ILottieProviderProps {
  children: React.ReactNode;
}

export interface IUserDataProps {
  avatarUrl: string;
  email: string;
  id: number;
  name: string;
  username: string;
}

export interface IHNResponseProps {
  userData?: IUserDataProps;
  accessToken: string;
}

export const LottieContext = createContext({
  appData: {
    accessToken: "",
  },
  setAppData: (_value: IHNResponseProps): void => {},
  fetchQuery: (query: any, params): void => {},
  onLogout: (): void => {},
  onLogin: (data: IHNResponseProps): void => {},
  fetchMutation: (query: any, params): void => {},
});

export const LottieProvider: React.FC<ILottieProviderProps> = ({
  children,
}: ILottieProviderProps) => {
  const [appData, setAppData] = useState<IHNResponseProps>({
    accessToken: "",
  });
  const [isAppLoading, setIsAppLoading] = useState<IHNResponseProps | boolean>(
    false
  );

  useEffect(() => {
    setIsAppLoading(() => true);

    const fetchStoreData = async () => {

      const storage = new LocalStorage();
      const accessToken = await storage.getItem(localStore.lottieAccessToken);

      if(appData.accessToken === "") {
        setAppData((prev) => ({
          ...prev,
          accessToken,
        }));
      }
    };
    fetchStoreData();

    // if (response && response.error) {
    //   setIsAppLoading(() => false);
    //   setAppData(() => false);
    // } else if (response && response.is_block_logged_in) {
    //   setAppData(() => response);
    //   setIsAppLoading(() => false);
    // } else {
    //   setAppData(() => false);
    //   setIsAppLoading(() => false);
    // }
  }, [appData]);

  const onLogin = async (data: IHNResponseProps): Promise<unknown> => {
    setIsAppLoading(() => true);

    setAppData(() => data);
    setIsAppLoading(() => false);

    return data;
  };

  const onLogout = () => {
    setAppData({
      accessToken: "",
    });
    // navigate('/');
  };

  const client = createClient({
    url: api.graphql,
    fetchOptions: () => {
      return {
        headers: {
          Authorization: appData?.accessToken
            ? `Bearer ${appData?.accessToken}`
            : "",
        },
      };
    },
  });

  const fetchQuery = async (query: any, params) => {
    try {
      const data = await client.query(query, params).toPromise();

      return data;
    } catch (error) {
      return null;
    }
  };

  const fetchMutation = async (query: any, params) => {
    try {
      const data = await client.mutation(query, params).toPromise();

      return data;
    } catch (error) {
      return null;
    }
  };
  

  console.log("ACCESS TOKEN--- appData", appData)

  return (
    <LottieContext.Provider
      value={{
        appData,
        setAppData,
        fetchQuery,
        fetchMutation,
        onLogout,
        onLogin,
      }}
    >
      {children}
    </LottieContext.Provider>
  );
};
