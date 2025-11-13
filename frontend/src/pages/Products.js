import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';
import Modal from '../components/Modal';
import './CRUD.css';
import { toast } from 'react-toastify';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState(null);

  const fields = [
    { name: 'name', label: 'Nome do Produto', placeholder: 'Digite o nome' },
    { name: 'description', label: 'Descrição', placeholder: 'Descrição do produto' },
    { name: 'price', label: 'Preço', placeholder: '100.00', type: 'number' },
    { name: 'stock_quantity', label: 'Quantidade em Estoque', placeholder: '50', type: 'number' },
    { name: 'supplier_id', label: 'ID do Fornecedor', placeholder: 'ID do fornecedor' },
    { name: 'status', label: 'Status', placeholder: 'on ou off' },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll();
      setProducts(response.data);
      toast.success('Produtos carregados com sucesso!');
    } catch (error) {
      toast.error('Erro ao carregar produtos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingId(product._id);
      setEditingData(product);
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
        await productService.update(editingId, formData);
        toast.success('Produto atualizado com sucesso!');
      } else {
        await productService.create(formData);
        toast.success('Produto criado com sucesso!');
      }
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao salvar produto');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      try {
        await productService.delete(id);
        toast.success('Produto deletado com sucesso!');
        fetchProducts();
      } catch (error) {
        toast.error('Erro ao deletar produto');
        console.error(error);
      }
    }
  };

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h1>Gerenciar Produtos</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          + Novo Produto
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        title={editingId ? 'Editar Produto' : 'Novo Produto'}
        fields={fields}
        initialData={editingData}
      />

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum produto cadastrado</p>
          <button className="btn btn-primary" onClick={() => handleOpenModal()}>
            Criar primeiro produto
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="crud-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>R$ {parseFloat(product.price).toFixed(2)}</td>
                  <td>{product.stock_quantity}</td>
                  <td>
                    <span className={`status ${product.status}`}>
                      {product.status === 'on' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      className="btn btn-small btn-edit"
                      onClick={() => handleOpenModal(product)}
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-small btn-delete"
                      onClick={() => handleDelete(product._id)}
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
