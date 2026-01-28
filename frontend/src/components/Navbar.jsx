import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Inventário
      </Link>
      
      <div className="navbar-user">
        <span>Olá, <strong>{user?.nome}</strong> </span>
        <button onClick={logout} className="btn btn-danger">Sair</button>
      </div>
    </nav>
  );
};

export default Navbar;