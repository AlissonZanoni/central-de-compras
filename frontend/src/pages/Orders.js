import React, { useState, useEffect } from 'react';
import { orderService, storeService, productService } from '../services/api';
import Modal from '../components/Modal';
import './CRUD.css';
import { toast } from 'react-toastify';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState(null);

  const fields = [
    { name: 'name', label: 'Nome do Pedido', placeholder: 'Digite o nome' },
    { name: 'start_date', label: 'Data de Início', placeholder: '2024-01-01', type: 'date' },
    { name: 'end_date', label: 'Data de Término', placeholder: '2024-01-31', type: 'date' },
    { name: 'discount_percentage', label: 'Desconto (%)', placeholder: '10%' },
    { 
      name: 'store_id', 
      label: 'Loja', 
      type: 'select', 
      options: stores.map(s => ({ value: s._id, label: s.name }))
    },
    { 
      name: 'item', 
      label: 'Produto', 
      type: 'select', 
      options: products.map(p => ({ value: p._id, label: p.name }))
    },
    { name: 'total_amount', label: 'Valor Total', placeholder: '1500.00', type: 'number' },
    { name: 'status', label: 'Status', type: 'select', options: ['Pendente', 'Processando', 'Concluído'] },
    { name: 'date', label: 'Data', placeholder: '2024-01-15', type: 'date' },
  ];

  useEffect(() => {
    fetchStores();
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await storeService.getAll();
      setStores(response.data);
    } catch (error) {
      toast.error('Erro ao carregar lojas');
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await productService.getAll();
      setProducts(response.data);
    } catch (error) {
      toast.error('Erro ao carregar produtos');
      console.error(error);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getAll();
      setOrders(response.data);
      toast.success('Pedidos carregados com sucesso!');
    } catch (error) {
      toast.error('Erro ao carregar pedidos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStoreName = (storeId) => {
    const store = stores.find(s => s._id === storeId);
    return store ? store.name : 'N/A';
  };

  const getProductName = (productId) => {
    const product = products.find(p => p._id === productId);
    return product ? product.name : 'N/A';
  };

  const handleOpenModal = (order = null) => {
    if (order) {
      setEditingId(order._id);
      setEditingData(order);
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
        await orderService.update(editingId, formData);
        toast.success('Pedido atualizado com sucesso!');
      } else {
        await orderService.create(formData);
        toast.success('Pedido criado com sucesso!');
      }
      fetchOrders();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao salvar pedido');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este pedido?')) {
      try {
        await orderService.delete(id);
        toast.success('Pedido deletado com sucesso!');
        fetchOrders();
      } catch (error) {
        toast.error('Erro ao deletar pedido');
        console.error(error);
      }
    }
  };

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h1>Gerenciar Pedidos</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          + Novo Pedido
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        title={editingId ? 'Editar Pedido' : 'Novo Pedido'}
        fields={fields}
        initialData={editingData}
      />

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum pedido cadastrado</p>
          <button className="btn btn-primary" onClick={() => handleOpenModal()}>
            Criar primeiro pedido
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="crud-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Loja</th>
                <th>Produto</th>
                <th>Valor Total</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order.name}</td>
                  <td>{getStoreName(order.store_id)}</td>
                  <td>{getProductName(order.item)}</td>
                  <td>R$ {parseFloat(order.total_amount).toFixed(2)}</td>
                  <td>{order.status}</td>
                  <td>{new Date(order.date).toLocaleDateString('pt-BR')}</td>
                  <td className="actions">
                    <button
                      className="btn btn-small btn-edit"
                      onClick={() => handleOpenModal(order)}
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-small btn-delete"
                      onClick={() => handleDelete(order._id)}
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
