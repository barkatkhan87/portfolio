import api from './axios'

export const projectApi = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return await api.get(`/projects?${queryString}`)
  },

  getFeatured: async () => {
    return await api.get('/projects/featured')
  },

  getBySlug: async (slug) => {
    return await api.get(`/projects/${slug}`)
  },

  getById: async (id) => {
    return await api.get(`/projects/id/${id}`)
  },

  getAdminProjects: async () => {
    return await api.get('/projects/admin/all')
  },

  create: async (formData) => {
    return await api.post('/projects', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  update: async (id, formData) => {
    return await api.put(`/projects/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  delete: async (id) => {
    return await api.delete(`/projects/${id}`)
  },

  toggleVisibility: async (id) => {
    return await api.patch(`/projects/${id}/visibility`)
  },

  toggleFeatured: async (id) => {
    return await api.patch(`/projects/${id}/featured`)
  },
}