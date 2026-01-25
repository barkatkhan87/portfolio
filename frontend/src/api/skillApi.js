import api from './axios';

export const skillApi = {
  getAll: async (category = '') => {
    const params = category ? `?category=${category}` : '';
    return await api.get(`/skills${params}`);
  },

  getAdminSkills: async () => {
    return await api.get('/skills/admin/all');
  },

  getById: async (id) => {
    return await api.get(`/skills/${id}`);
  },

  create: async (data) => {
    return await api.post('/skills', data);
  },

  update: async (id, data) => {
    return await api.put(`/skills/${id}`, data);
  },

  delete: async (id) => {
    return await api.delete(`/skills/${id}`);
  },

  toggleVisibility: async (id) => {
    return await api.patch(`/skills/${id}/visibility`);
  },
};
