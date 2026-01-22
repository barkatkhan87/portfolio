import api from './axios';

export const authApi = {
  login: async (credentials) => {
    // 1. Send request
    const res = await api.post('/auth/login', credentials);
    console.log(res)

    // 2. Extract data safely
    // Backend returns: { success: true, data: { user: {...}, token: "..." } }
    const token = res?.data?.token;
    const user = res?.data?.user;

    // 3. Save to LocalStorage if successful
    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }

    return res;
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      // Always clear local storage even if server call fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  getMe: async () => {
    return await api.get('/auth/me');
  },

  updateProfile: async (formData) => {
    return await api.put('/auth/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  changePassword: async (data) => {
    return await api.put('/auth/password', data);
  },
};