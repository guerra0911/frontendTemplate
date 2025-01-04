import api from '@/api';
import { saveAuthToken } from '@/utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = async (username: string, password: string) => {
  const response = await api.post('/api/user/token/', { username, password });
  const { access, refresh } = response.data;

  await saveAuthToken(access, refresh);
  api.setAuthToken(access);

  return { access, refresh };
};

export const registerUser = async (
  username: string,
  password: string,
  confirmPassword: string,
  email: string
) => {
  const response = await api.post('/api/user/register/', {
    username,
    password,
    confirm_password: confirmPassword,
    email,
  });
  return response.data.message;
};

export const logoutUser = async () => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  const accessToken = await AsyncStorage.getItem('authToken');

  if (!refreshToken || !accessToken) {
    throw new Error('No auth tokens found.');
  }

  // Set the access token in the Authorization header
  api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  await api.post('/api/user/logout/', { refresh_token: refreshToken });
  await AsyncStorage.removeItem('authToken');
  await AsyncStorage.removeItem('refreshToken');
};

export const pingServer = async () => {
  const response = await api.get('/api/ping');
  return response.data.message || 'Server responded successfully!';
};
