import api from './axios';

export const messageApi = {
  send: async (data) => {
    return await api.post('/messages', data);
  },

  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await api.get(`/messages?${queryString}`);
  },

  getById: async (id) => {
    return await api.get(`/messages/${id}`);
  },

  updateStatus: async (id, status) => {
    return await api.patch(`/messages/${id}/status`, { status });
  },

  toggleStar: async (id) => {
    return await api.patch(`/messages/${id}/star`);
  },

  delete: async (id) => {
    return await api.delete(`/messages/${id}`);
  },

  deleteMultiple: async (ids) => {
    return await api.delete('/messages', { data: { ids } });
  },
};
