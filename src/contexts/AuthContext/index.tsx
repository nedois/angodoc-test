/* eslint-disable camelcase */
import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import axios from 'src/utils/axios';
import { User } from 'src/contrats/types';
import { APP_KEYS } from 'src/constants';
import { AuthContextData, LoginCredentials } from './interfaces';

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const setSession = async (accessToken: string | null, expires: number | null = null): Promise<void> => {
    if (accessToken) {
      if (expires) Cookies.set(APP_KEYS.ACCESS_TOKEN, accessToken, { expires });

      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      axios
        .get('/account')
        .then(({ data }) => setUser(data))
        .catch(() => setSession(null));

      axios
        .get('/account/permissions')
        .then(({ data }) => setPermissions(data))
        .catch(() => setSession(null));
    } else {
      Cookies.remove(APP_KEYS.ACCESS_TOKEN);

      delete axios.defaults.headers.common.Authorization;

      setUser(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    async function loadUserFromCookies() {
      const accessToken = Cookies.get(APP_KEYS.ACCESS_TOKEN);
      await setSession(accessToken || null);
    }

    loadUserFromCookies();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    return axios
      .post('/auth/login', credentials)
      .then(resp => setSession(resp.data.token, Date.parse(resp.data.expires_at)))
      .catch(err => {
        throw err;
      });
  };

  const logout = async () => {
    return axios
      .post('/auth/logout')
      .then(() => setSession(null))
      .catch(err => {
        throw err;
      });
  };

  const can = (permission: string) => (permission ? permissions.includes(permission) : true);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        can,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
