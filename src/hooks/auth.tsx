import React, { createContext, useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

interface User {
  id: string;
  name: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignData {
  user_name: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(signData: SignData): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@CopyCenter:token');
    const user = localStorage.getItem('@CopyCenter:user');

    if (token && user) {
      api.defaults.headers.authorization = `Beare ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ user_name, password }) => {
    const response = await api.post('sessions', {
      user_name,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@CopyCenter:token', token);
    localStorage.setItem('@CopyCenter:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Beare ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem('@CopyCenter:token');
    localStorage.removeItem('@CopyCenter:user');

    setData({} as AuthState);
    history.push('/');
  }, [history]);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
