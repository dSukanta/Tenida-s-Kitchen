import AsyncStorage from "@react-native-async-storage/async-storage";


export const saveToStorage= async(name,payload)=>{
    try {
        const data= JSON.stringify(payload);
        await AsyncStorage.setItem(name,data)
    } catch (error) {
        return `Error saving`
    }
}

export const getFromStorage= async(name)=>{
    try {
        const jsonValue = await AsyncStorage.getItem(name);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        return `Error saving`
      }
};

export const removeFromStorage= async(name)=>{
    try {
        await AsyncStorage.removeItem(name);
      } catch(e) {
        return `Error removing`
      }
}
