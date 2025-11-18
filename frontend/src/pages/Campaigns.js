import React, { useState, useEffect } from 'react';
import { campaignService, storeService, productService } from '../services/api';
import Modal from '../components/Modal';
import './CRUD.css';
import { toast } from 'react-toastify';

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState(null);

  const fields = [
    { name: 'name', label: 'Nome da Campanha', placeholder: 'Digite o nome' },
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
    { name: 'status', label: 'Status', type: 'select', options: ['Ativa', 'Inativa', 'Planejada'] },
    { name: 'date', label: 'Data', placeholder: '2024-01-15', type: 'date' },
  ];

  useEffect(() => {
    fetchStores();
    fetchProducts();
    fetchCampaigns();
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

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await campaignService.getAll();
      setCampaigns(response.data);
      toast.success('Campanhas carregadas com sucesso!');
    } catch (error) {
      toast.error('Erro ao carregar campanhas');
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

  const handleOpenModal = (campaign = null) => {
    if (campaign) {
      setEditingId(campaign._id);
      setEditingData(campaign);
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
        await campaignService.update(editingId, formData);
        toast.success('Campanha atualizada com sucesso!');
      } else {
        await campaignService.create(formData);
        toast.success('Campanha criada com sucesso!');
      }
      fetchCampaigns();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao salvar campanha');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta campanha?')) {
      try {
        await campaignService.delete(id);
        toast.success('Campanha deletada com sucesso!');
        fetchCampaigns();
      } catch (error) {
        toast.error('Erro ao deletar campanha');
        console.error(error);
      }
    }
  };

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h1>Gerenciar Campanhas</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          + Nova Campanha
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        title={editingId ? 'Editar Campanha' : 'Nova Campanha'}
        fields={fields}
        initialData={editingData}
      />

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : campaigns.length === 0 ? (
        <div className="empty-state">
          <p>Nenhuma campanha cadastrada</p>
          <button className="btn btn-primary" onClick={() => handleOpenModal()}>
            Criar primeira campanha
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
                <th>Data de Início</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map(campaign => (
                <tr key={campaign._id}>
                  <td>{campaign.name}</td>
                  <td>{getStoreName(campaign.store_id)}</td>
                  <td>{getProductName(campaign.item)}</td>
                  <td>R$ {parseFloat(campaign.total_amount).toFixed(2)}</td>
                  <td>{campaign.status}</td>
                  <td>{new Date(campaign.start_date).toLocaleDateString('pt-BR')}</td>
                  <td className="actions">
                    <button
                      className="btn btn-small btn-edit"
                      onClick={() => handleOpenModal(campaign)}
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-small btn-delete"
                      onClick={() => handleDelete(campaign._id)}
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
