import React, {createContext, useEffect, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';


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
      await GoogleSignin.signOut();
      setUserData([]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setUserAddress([
      {
        id: 1,
        landmark: 'Abc',
        city: 'city1',
        state: 'state1',
        pincode: '1111111',
        default: true,
      },
      {
        id: 2,
        landmark: 'Def',
        city: 'city2',
        state: 'state2',
        pincode: '222222',
        default: false,
      },
    ]);
  }, []);

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
    Logout
  };

  return <Appcontext.Provider value={values}>{children}</Appcontext.Provider>;
};
