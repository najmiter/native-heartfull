import AsyncStorage from '@react-native-async-storage/async-storage';
import { Qalma, initialQalmas, QalmasState, DEFAULT_TARGET } from '@/constants';

const STORAGE_KEY = 'TASBIH_DATA';

/**
 * Loads saved qalma data from AsyncStorage
 */
export const loadQalmasData = async (): Promise<{
  [key: number]: Qalma;
} | null> => {
  try {
    const savedData = await AsyncStorage.getItem(STORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
    return null;
  } catch (error) {
    console.error('Error loading qalmas data:', error);
    return null;
  }
};

/**
 * Saves qalma data to AsyncStorage
 */
export const saveQalmasData = async (data: {
  [key: number]: Qalma;
}): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving qalmas data:', error);
    return false;
  }
};

/**
 * Updates a single qalma and saves all qalmas to AsyncStorage
 */
export const updateAndSaveQalma = async (
  index: number,
  qalma: Qalma,
  allQalmas: { [key: number]: Qalma }
): Promise<boolean> => {
  try {
    const updatedQalmas = { ...allQalmas, [index]: qalma };
    return await saveQalmasData(updatedQalmas);
  } catch (error) {
    console.error('Error updating qalma:', error);
    return false;
  }
};

/**
 * Resets all qalmas to initial state
 */
export const resetAllQalmas = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error resetting qalmas:', error);
    return false;
  }
};
