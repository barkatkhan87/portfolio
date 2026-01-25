// Frontend/src/api/saleProjectApi.js
import api from './axios';

export const saleProjectApi = {
  // Public
  getAll: (params = {}) =>
    api.get(`/sale-projects?${new URLSearchParams(params).toString()}`),

  // NOTE: backend detail route is /sale-projects/detail/:slug
  getBySlug: (slug) => api.get(`/sale-projects/detail/${slug}`),

  // Admin
  getAdminAll: () => api.get('/sale-projects/admin/all'),

  create: (formData) =>
    api.post('/sale-projects', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  update: (id, formData) =>
    api.put(`/sale-projects/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  delete: (id) => api.delete(`/sale-projects/${id}`),
};