import { api } from './client';

export const mindspaceApi = {
  list: () => api.get('/mindspaces').then((r) => r.data),
  get: (id) => api.get(`/mindspaces/${id}`).then((r) => r.data),
  create: (data) => api.post('/mindspaces', data).then((r) => r.data),
  update: (id, data) => api.patch(`/mindspaces/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/mindspaces/${id}`),
  toggleShare: (id) => api.post(`/mindspaces/${id}/share`).then((r) => r.data),
};

export const itemApi = {
  add: (mindspaceId, data) => api.post(`/mindspaces/${mindspaceId}/items`, data).then((r) => r.data),
  update: (id, data) => api.patch(`/items/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/items/${id}`),
};

export const shareApi = {
  get: (slug) => api.get(`/share/${slug}`).then((r) => r.data),
};
