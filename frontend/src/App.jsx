import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProdutoFormPage from './pages/ProdutoFormPage';
import ProdutoDetalhesPage from './pages/ProdutoDetalhesPage';

const PrivateRoute = ({ children }) => {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div style={{textAlign: 'center', marginTop: '50px'}}>Carregando...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/" element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          } />
          
          <Route path="/produto/:id" element={
            <PrivateRoute>
              <ProdutoDetalhesPage />
            </PrivateRoute>
          } />

          <Route path="/novo" element={
            <PrivateRoute>
              <ProdutoFormPage />
            </PrivateRoute>
          } />
          
          <Route path="/editar/:id" element={
            <PrivateRoute>
              <ProdutoFormPage />
            </PrivateRoute>
          } />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;