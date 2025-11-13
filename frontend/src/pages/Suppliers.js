import React, { useState, useEffect } from 'react';
import { supplierService } from '../services/api';
import Modal from '../components/Modal';
import './CRUD.css';
import { toast } from 'react-toastify';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState(null);

  const fields = [
    { name: 'supplier_name', label: 'Nome do Fornecedor', placeholder: 'Digite o nome' },
    { name: 'supplier_category', label: 'Categoria', placeholder: 'Ex: Eletrônicos' },
    { name: 'contact_email', label: 'Email', placeholder: 'exemplo@email.com', type: 'email' },
    { name: 'phone_number', label: 'Telefone', placeholder: '(11) 9999-9999' },
    { name: 'status', label: 'Status', placeholder: 'on ou off' },
  ];

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await supplierService.getAll();
      setSuppliers(response.data);
      toast.success('Fornecedores carregados com sucesso!');
    } catch (error) {
      toast.error('Erro ao carregar fornecedores');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (supplier = null) => {
    if (supplier) {
      setEditingId(supplier._id);
      setEditingData(supplier);
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
        await supplierService.update(editingId, formData);
        toast.success('Fornecedor atualizado com sucesso!');
      } else {
        await supplierService.create(formData);
        toast.success('Fornecedor criado com sucesso!');
      }
      fetchSuppliers();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao salvar fornecedor');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este fornecedor?')) {
      try {
        await supplierService.delete(id);
        toast.success('Fornecedor deletado com sucesso!');
        fetchSuppliers();
      } catch (error) {
        toast.error('Erro ao deletar fornecedor');
        console.error(error);
      }
    }
  };

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h1>Gerenciar Fornecedores</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          + Novo Fornecedor
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        title={editingId ? 'Editar Fornecedor' : 'Novo Fornecedor'}
        fields={fields}
        initialData={editingData}
      />

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : suppliers.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum fornecedor cadastrado</p>
          <button className="btn btn-primary" onClick={() => handleOpenModal()}>
            Criar primeiro fornecedor
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="crud-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map(supplier => (
                <tr key={supplier._id}>
                  <td>{supplier.supplier_name}</td>
                  <td>{supplier.supplier_category}</td>
                  <td>{supplier.contact_email}</td>
                  <td>{supplier.phone_number}</td>
                  <td>
                    <span className={`status ${supplier.status}`}>
                      {supplier.status === 'on' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      className="btn btn-small btn-edit"
                      onClick={() => handleOpenModal(supplier)}
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-small btn-delete"
                      onClick={() => handleDelete(supplier._id)}
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
