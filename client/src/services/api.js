const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  auth: {
    register: (data) => fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),

    login: (data) => fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),

    me: () => fetch(`${API_URL}/auth/me`, {
      headers: { ...getAuthHeader() }
    }).then(res => res.json())
  },

  users: {
    getAll: () => fetch(`${API_URL}/users`, {
      headers: { ...getAuthHeader() }
    }).then(res => res.json()),

    getMembers: () => fetch(`${API_URL}/users/members`, {
      headers: { ...getAuthHeader() }
    }).then(res => res.json())
  },

  projects: {
    getAll: () => fetch(`${API_URL}/projects`, {
      headers: { ...getAuthHeader() }
    }).then(res => res.json()),

    getById: (id) => fetch(`${API_URL}/projects/${id}`, {
      headers: { ...getAuthHeader() }
    }).then(res => res.json()),

    create: (data) => fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data)
    }).then(res => res.json()),

    update: (id, data) => fetch(`${API_URL}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data)
    }).then(res => res.json()),

    delete: (id) => fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    }).then(res => res.json()),

    addMember: (projectId, userId) => fetch(`${API_URL}/projects/${projectId}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ userId })
    }).then(res => res.json()),

    removeMember: (projectId, userId) => fetch(`${API_URL}/projects/${projectId}/members/${userId}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    }).then(res => res.json())
  },

  tasks: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return fetch(`${API_URL}/tasks?${query}`, {
        headers: { ...getAuthHeader() }
      }).then(res => res.json());
    },

    getById: (id) => fetch(`${API_URL}/tasks/${id}`, {
      headers: { ...getAuthHeader() }
    }).then(res => res.json()),

    create: (data) => fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data)
    }).then(res => res.json()),

    update: (id, data) => fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data)
    }).then(res => res.json()),

    delete: (id) => fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    }).then(res => res.json()),

    getStats: () => fetch(`${API_URL}/tasks/stats`, {
      headers: { ...getAuthHeader() }
    }).then(res => res.json())
  }
};

export default api;