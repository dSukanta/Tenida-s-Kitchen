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


export const getProfileName= (userData)=>{
  if(userData[0]?.fullname){
    return userData[0]?.fullname?.split(" ")[0]
  };
  if(!userData[0]?.fullname && userData[0]?.email ){
    return userData[0]?.email?.split("@")[0]
  };
  if(!userData[0]?.fullname && !userData[0]?.email && userData[0]?.phone){
    return userData[0]?.phone
  };
};