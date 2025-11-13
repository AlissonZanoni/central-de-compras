import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const modules = [
    {
      title: '🏭 Fornecedores',
      description: 'Gerenciar fornecedores de produtos',
      link: '/suppliers',
      color: '#FF6B6B'
    },
    {
      title: '📦 Produtos',
      description: 'Cadastrar e controlar produtos',
      link: '/products',
      color: '#4ECDC4'
    },
    {
      title: '👥 Usuários',
      description: 'Gerenciar usuários do sistema',
      link: '/users',
      color: '#45B7D1'
    },
    {
      title: '🏪 Lojas',
      description: 'Gerenciar lojas e filiais',
      link: '/stores',
      color: '#FFA07A'
    },
    {
      title: '📋 Pedidos',
      description: 'Controlar pedidos e compras',
      link: '/orders',
      color: '#98D8C8'
    },
    {
      title: '🎯 Campanhas',
      description: 'Criar e gerenciar campanhas',
      link: '/campaigns',
      color: '#F7DC6F'
    }
  ];

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Bem-vindo ao Sistema de Central de Compras</h1>
        <p>Gerencie todos os aspectos da sua central de compras em um único lugar</p>
      </div>

      <div className="modules-grid">
        {modules.map((module, index) => (
          <Link key={index} to={module.link} className="module-card">
            <div className="module-content" style={{ borderLeftColor: module.color }}>
              <h2>{module.title}</h2>
              <p>{module.description}</p>
              <span className="module-arrow">→</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="home-info">
        <h2>Sobre o Sistema</h2>
        <p>
          Esta é uma aplicação completa de gerenciamento de central de compras,
          desenvolvida com React no frontend e Node.js/MongoDB no backend.
        </p>
      </div>
    </div>
  );
}
