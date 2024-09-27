import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

// Storing token securely based on platform
export const storeToken = async (token: string) => {
  try {
    if (Platform.OS === 'web') {
      await AsyncStorage.setItem('accessToken', token);
    } else {
      await SecureStore.setItemAsync('accessToken', token);
    }
  } catch (error) {
    console.error("Error storing token", error);
  }
};

// Retrieving token based on platform
export const getToken = async () => {
  try {
    if (Platform.OS === 'web') {
      const token = await AsyncStorage.getItem('accessToken');
      return token;
    } else {
      const token = await SecureStore.getItemAsync('accessToken');
      return token;
    }
  } catch (error) {
    console.error("Error retrieving token", error);
    return null;
  }
};

// Deleting token based on platform
export const deleteToken = async () => {
  try {
    if (Platform.OS === 'web') {
      await AsyncStorage.removeItem('accessToken');
    } else {
      await SecureStore.deleteItemAsync('accessToken');
    }
  } catch (error) {
    console.error("Error deleting token", error);
  }
};
