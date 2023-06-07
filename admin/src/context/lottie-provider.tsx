/**
 * Copyright 2022 Design Barn Inc.
 */

import React, { createContext, useEffect, useState, useMemo } from "react";
import { createClient, Provider as UrqlProvider } from "urql";

import { api, localStore } from "../helpers/consts";
import { LocalStorage } from "../utils/storage";
import { Viewer } from "../utils/queries";

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
  accessToken: string;
}

export const LottieContext = createContext({
  appData: {
    accessToken: "",
  },
  userData: {
    avatarUrl: 'string',
    email: '',
    id: 0,
    name: '',
    username: ''
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
  const [userData, setUserData] = useState<IUserDataProps>({
    avatarUrl: 'string',
    email: '',
    id: 0,
    name: '',
    username: ''
  });
  const [isAppLoading, setIsAppLoading] = useState<boolean>(
    false
  );

  const client = useMemo(() => {
    const urqlClient = createClient({
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

    const getUserData = async () => {
      try {
        const response: any = await urqlClient.query(Viewer, {}).toPromise();
        setUserData(response.data.viewer)    
      } catch (err) {
        console.error(err)
      }
    }

    getUserData()

    return urqlClient;
  }, [appData]);

  useEffect(() => {
    const fetchStoreData = async () => {
      if(appData.accessToken === "") {
      const storage = new LocalStorage();
      const accessToken = await storage.getItem(localStore.lottieAccessToken);

        setAppData((prev) => ({
          ...prev,
          accessToken,
        }));
      } else {
        const response: any = await fetchQuery(Viewer, {});
        setUserData(response.data.viewer)
      }
      
    };
    fetchStoreData();
  }, [appData]);

  const onLogout = () => {
    const storage = new LocalStorage();
    storage.setItem(localStore.lottieAccessToken, null);
    setAppData({
      accessToken: null,
    });
  };

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
        userData,
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
