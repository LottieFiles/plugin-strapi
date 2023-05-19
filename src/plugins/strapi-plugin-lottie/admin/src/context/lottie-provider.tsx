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
  fetchMutation: (query: any, params): void => {},
});

export const LottieProvider: React.FC<ILottieProviderProps> = ({
  children,
}: ILottieProviderProps) => {
  const [appData, setAppData] = useState<IHNResponseProps>({
    accessToken: "",
  });
  const [isAppLoading, setIsAppLoading] = useState<boolean>(
    false
  );

  useEffect(() => {
    const fetchStoreData = async () => {
      if(appData.accessToken === "") {
      const storage = new LocalStorage();
      const accessToken = await storage.getItem(localStore.lottieAccessToken);

        setAppData((prev) => ({
          ...prev,
          accessToken,
        }));
      }
    };
    fetchStoreData();
  }, [appData]);

  const onLogout = () => {
    setAppData({
      accessToken: "",
    });
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

  const fetchMutation = async (query: any, params) : Promise<any>=> {
    try {
      const data = await client.mutation(query, params).toPromise();

      return data;
    } catch (error) {
      return null;
    }
  };
  
  return (
    <LottieContext.Provider
      value={{
        appData,
        setAppData,
        fetchQuery,
        fetchMutation,
        onLogout,
      }}
    >
      {children}
    </LottieContext.Provider>
  );
};
