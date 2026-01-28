import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext(); //remover context any se der erro!!!!!!

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (recoveredUser && token) {
      setUser(JSON.parse(recoveredUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, senha) => {
    const response = await api.post('/login', { email, senha });

    const { token, usuario } = response.data;

    localStorage.setItem('user', JSON.stringify(usuario));
    localStorage.setItem('token', token);

    setUser(usuario);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};