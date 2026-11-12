import axios from 'axios';

const TOKEN_KEY = 'mindspace_token';

// Token helpers live in one place. For the Chrome extension, swap these
// for chrome.storage.local (async) and nothing else needs to change.
export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const isAuthCall = err.config?.url?.startsWith('/auth/login') || err.config?.url?.startsWith('/auth/register');
    if (err.response?.status === 401 && !isAuthCall) {
      tokenStore.clear();
      window.dispatchEvent(new Event('auth:logout'));
    }
    return Promise.reject(err);
  }
);

export const getErrorMessage = (err) =>
  err.response?.data?.details?.[0]?.message ||
  err.response?.data?.message ||
  (err.request ? 'Cannot reach the server. Check your connection.' : 'Something went wrong');
