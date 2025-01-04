import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveAuthToken = async (accessToken: string, refreshToken: string) => {
  await AsyncStorage.setItem('authToken', accessToken);
  await AsyncStorage.setItem('refreshToken', refreshToken);
};

export const clearAuthTokens = async () => {
  await AsyncStorage.removeItem('authToken');
  await AsyncStorage.removeItem('refreshToken');
};
