import AsyncStorage from '@react-native-community/async-storage';
import React, {
  createContext, useCallback, useState, useContext, useEffect,
} from 'react';

import api from '../services/api';
import axios from 'axios';
import { config } from '../utils/config';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  subscription_test: string;
  subscription_live: string;
  password: string;
  key: {
    test: string;
    live: string;
  }
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${ token[1] }`;

        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    })();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const apiKey = {test: '', live: ''}
    const response = await axios.post(`${config.apiUri}/signin`, { email, password });
    const keys = await axios.get(`${config.apiUri}/getkey`);
    var result = keys.data.data.filter(key => key.comment == "pk_test");
    apiKey.test = result[0].key;
    const result1 = keys.data.data.filter(key => key.comment == "pk_live");
    apiKey.live = result1[0].key;
    const { token, user } = response.data;
    user.key = apiKey;
    user.password = password;
    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${ token }`;
    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(
      ['@GoBarber:token', '@GoBarber:user'],
    );

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(async (user: User) => {
    await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({
      token: data.token,
      user,
    });
  }, [data.token]);

  return (
    <AuthContext.Provider value={{
      user: data.user, loading, signIn, signOut, updateUser,
    }}
    >
      { children }
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export default AuthContext;
