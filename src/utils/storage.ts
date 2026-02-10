import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export const storage = {
    getItem: async (key: string): Promise<string | null> => {
        try {
            if (isWeb) {
                return localStorage.getItem(key);
            }
            return await AsyncStorage.getItem(key);
        } catch (e) {
            console.error('Error reading val', e);
            return null;
        }
    },
    setItem: async (key: string, value: string): Promise<void> => {
        try {
            if (isWeb) {
                localStorage.setItem(key, value);
                return;
            }
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            console.error('Error saving val', e);
        }
    },
    removeItem: async (key: string): Promise<void> => {
        try {
            if (isWeb) {
                localStorage.removeItem(key);
                return;
            }
            await AsyncStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing val', e);
        }
    }
};
