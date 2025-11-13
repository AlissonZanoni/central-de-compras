import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';
import Modal from '../components/Modal';
import './CRUD.css';
import { toast } from 'react-toastify';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState(null);

  const fields = [
    { name: 'name', label: 'Nome', placeholder: 'Digite o nome' },
    { name: 'contact_email', label: 'Email', placeholder: 'exemplo@email.com', type: 'email' },
    { name: 'user', label: 'Usuário', placeholder: 'username' },
    { name: 'pwd', label: 'Senha', placeholder: 'Digite a senha', type: 'password' },
    { name: 'level', label: 'Nível', placeholder: 'admin ou user' },
    { name: 'status', label: 'Status', placeholder: 'on ou off' },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll();
      setUsers(response.data);
      toast.success('Usuários carregados com sucesso!');
    } catch (error) {
      toast.error('Erro ao carregar usuários');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingId(user._id);
      setEditingData(user);
    } else {
      setEditingId(null);
      setEditingData(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setEditingData(null);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingId) {
        await userService.update(editingId, formData);
        toast.success('Usuário atualizado com sucesso!');
      } else {
        await userService.create(formData);
        toast.success('Usuário criado com sucesso!');
      }
      fetchUsers();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao salvar usuário');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      try {
        await userService.delete(id);
        toast.success('Usuário deletado com sucesso!');
        fetchUsers();
      } catch (error) {
        toast.error('Erro ao deletar usuário');
        console.error(error);
      }
    }
  };

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h1>Gerenciar Usuários</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          + Novo Usuário
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        title={editingId ? 'Editar Usuário' : 'Novo Usuário'}
        fields={fields}
        initialData={editingData}
      />

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : users.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum usuário cadastrado</p>
          <button className="btn btn-primary" onClick={() => handleOpenModal()}>
            Criar primeiro usuário
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="crud-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Usuário</th>
                <th>Nível</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.contact_email}</td>
                  <td>{user.user}</td>
                  <td>{user.level}</td>
                  <td>
                    <span className={`status ${user.status}`}>
                      {user.status === 'on' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      className="btn btn-small btn-edit"
                      onClick={() => handleOpenModal(user)}
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-small btn-delete"
                      onClick={() => handleDelete(user._id)}
                      title="Deletar"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
