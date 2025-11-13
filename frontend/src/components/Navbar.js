import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">🛒 Central de Compras</span>
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/suppliers" className="nav-link">Fornecedores</Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">Produtos</Link>
          </li>
          <li className="nav-item">
            <Link to="/users" className="nav-link">Usuários</Link>
          </li>
          <li className="nav-item">
            <Link to="/stores" className="nav-link">Lojas</Link>
          </li>
          <li className="nav-item">
            <Link to="/orders" className="nav-link">Pedidos</Link>
          </li>
          <li className="nav-item">
            <Link to="/campaigns" className="nav-link">Campanhas</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
