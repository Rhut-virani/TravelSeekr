import { AsyncStorage } from 'react-native';

export async function setItem (key, data) {
        try {
          await AsyncStorage.setItem(key, data);
            return "Success"
        } catch (error) {
            return "error";
        }
}

export async function multiGet(key){
    let value =  "";
    try {
      value = await AsyncStorage.multiGet(key) || 'none';
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return value;
}
export async function getItem(key){
    let value =  "";
    try {
      value = await AsyncStorage.getItem(key) || 'none';
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return value;
}

