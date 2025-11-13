import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Serviços de Fornecedor
export const supplierService = {
  getAll: () => api.get('/supplier'),
  getById: (id) => api.get(`/supplier/${id}`),
  getByName: (name) => api.get(`/supplier/name/${name}`),
  create: (data) => api.post('/supplier', data),
  update: (id, data) => api.put(`/supplier/${id}`, data),
  delete: (id) => api.delete(`/supplier/${id}`),
};

// Serviços de Produto
export const productService = {
  getAll: () => api.get('/product'),
  getById: (id) => api.get(`/product/${id}`),
  getByName: (name) => api.get(`/product/name/${name}`),
  create: (data) => api.post('/product', data),
  update: (id, data) => api.put(`/product/${id}`, data),
  delete: (id) => api.delete(`/product/${id}`),
};

// Serviços de Usuário
export const userService = {
  getAll: () => api.get('/user'),
  getById: (id) => api.get(`/user/${id}`),
  getByName: (name) => api.get(`/user/name/${name}`),
  create: (data) => api.post('/user', data),
  update: (id, data) => api.put(`/user/${id}`, data),
  delete: (id) => api.delete(`/user/${id}`),
};

// Serviços de Loja
export const storeService = {
  getAll: () => api.get('/store'),
  getById: (id) => api.get(`/store/${id}`),
  getByName: (name) => api.get(`/store/name/${name}`),
  create: (data) => api.post('/store', data),
  update: (id, data) => api.put(`/store/${id}`, data),
  delete: (id) => api.delete(`/store/${id}`),
};

// Serviços de Pedido
export const orderService = {
  getAll: () => api.get('/order'),
  getById: (id) => api.get(`/order/${id}`),
  getByName: (name) => api.get(`/order/name/${name}`),
  create: (data) => api.post('/order', data),
  update: (id, data) => api.put(`/order/${id}`, data),
  delete: (id) => api.delete(`/order/${id}`),
};

// Serviços de Campanha
export const campaignService = {
  getAll: () => api.get('/campaign'),
  getById: (id) => api.get(`/campaign/${id}`),
  getByName: (name) => api.get(`/campaign/name/${name}`),
  create: (data) => api.post('/campaign', data),
  update: (id, data) => api.put(`/campaign/${id}`, data),
  delete: (id) => api.delete(`/campaign/${id}`),
};
