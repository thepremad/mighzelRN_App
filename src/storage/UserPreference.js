import AsyncStorage from '@react-native-async-storage/async-storage';

// User Preferences Keys
export const async_keys = {
  skip_login_screen: 'skip_login_screen',
  auth_token: 'auth_token',

  user_display_name: 'user_display_name',

  cart_data: 'cart_data',
};

// User Preferences Methods
export const storeData = async (key, data) => {
  try {
    const info = JSON.stringify(data);
    await AsyncStorage.setItem(key, info);
  } catch (error) {
    //  console.log(error.message);
  }
};

export const getData = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    const info = JSON.parse(data);
    return info;
  } catch (error) {
    //  console.log(error.message);
    return null;
  }
};

export const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
    //  console.log(`Item "${key}" cleared from AsyncStorage successfully.`);
  } catch (error) {
    console.error(`Error clearing item "${key}" from AsyncStorage:`, error);
  }
};

export const clearData = async () => {
  console.log('clearDataCall');
  try {
    await AsyncStorage.clear();
  } catch (error) {
    //  console.log(error.message);
  }
};
