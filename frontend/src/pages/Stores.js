import React, { useState, useEffect } from 'react';
import { storeService } from '../services/api';
import Modal from '../components/Modal';
import './CRUD.css';
import { toast } from 'react-toastify';

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState(null);

  const fields = [
    { name: 'name', label: 'Nome da Loja', placeholder: 'Digite o nome' },
    { name: 'cnpj', label: 'CNPJ', placeholder: '12.345.678/0001-90' },
    { name: 'address', label: 'Endereço', placeholder: 'Rua, número, cidade' },
    { name: 'phone_number', label: 'Telefone', placeholder: '(11) 9999-9999' },
    { name: 'contact_email', label: 'Email', placeholder: 'exemplo@email.com', type: 'email' },
    { name: 'status', label: 'Status', placeholder: 'on ou off' },
  ];

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await storeService.getAll();
      setStores(response.data);
      toast.success('Lojas carregadas com sucesso!');
    } catch (error) {
      toast.error('Erro ao carregar lojas');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (store = null) => {
    if (store) {
      setEditingId(store._id);
      setEditingData(store);
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
        await storeService.update(editingId, formData);
        toast.success('Loja atualizada com sucesso!');
      } else {
        await storeService.create(formData);
        toast.success('Loja criada com sucesso!');
      }
      fetchStores();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao salvar loja');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta loja?')) {
      try {
        await storeService.delete(id);
        toast.success('Loja deletada com sucesso!');
        fetchStores();
      } catch (error) {
        toast.error('Erro ao deletar loja');
        console.error(error);
      }
    }
  };

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h1>Gerenciar Lojas</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          + Nova Loja
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        title={editingId ? 'Editar Loja' : 'Nova Loja'}
        fields={fields}
        initialData={editingData}
      />

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : stores.length === 0 ? (
        <div className="empty-state">
          <p>Nenhuma loja cadastrada</p>
          <button className="btn btn-primary" onClick={() => handleOpenModal()}>
            Criar primeira loja
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="crud-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CNPJ</th>
                <th>Endereço</th>
                <th>Telefone</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {stores.map(store => (
                <tr key={store._id}>
                  <td>{store.name}</td>
                  <td>{store.cnpj}</td>
                  <td>{store.address}</td>
                  <td>{store.phone_number}</td>
                  <td>
                    <span className={`status ${store.status}`}>
                      {store.status === 'on' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      className="btn btn-small btn-edit"
                      onClick={() => handleOpenModal(store)}
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-small btn-delete"
                      onClick={() => handleDelete(store._id)}
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
