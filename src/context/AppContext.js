import React, {createContext, useEffect, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { getFromStorage, removeFromStorage } from '../utils/Helper';
import { clientRequest } from '../utils/ApiRequests';


export const Appcontext = createContext();

export const AppContextProvider = ({children}) => {
  const [userData, setUserData] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [userAddress, setUserAddress] = useState();
  const [userOrders, setUserOrders] = useState([]);


  const cartTotal = userCart.reduce(
    (init, next) => init + Number(next.price) * Number(next.quantity),
    0,
  );

  async function Logout() {
    try {
      if(userData[0]?.loginMethod ==='phone'){
        await removeFromStorage('token');
        await removeFromStorage('user');
        setUserData([]);
      }else{
        await GoogleSignin.signOut();
        await removeFromStorage('token');
        await removeFromStorage('user');
        setUserData([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAddress = async()=>{
    const devideId= await getFromStorage('deviceId');
    const address= await clientRequest('api/v1/private/address','GET',{deviceid: devideId,devicename: 'Android',userid:userData[0]?._id || null});
    // console.log(address,'address')
    if(address.data){
      setUserAddress(address.data);
    }
  };

  useEffect(()=>{
    getAddress();
  },[userData])

  const values = {
    userData,
    setUserData,
    userCart,
    setUserCart,
    cartTotal,
    userAddress,
    setUserAddress,
    userOrders,
    setUserOrders,
    Logout,
    getAddress,
  };

  return <Appcontext.Provider value={values}>{children}</Appcontext.Provider>;
};
