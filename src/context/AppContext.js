import React, {createContext, useEffect, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { getFromStorage, removeFromStorage } from '../utils/Helper';
import { clientRequest, serverRequest } from '../utils/ApiRequests';
import { getCurrentCart } from '../utils/Functions';


export const Appcontext = createContext();

export const AppContextProvider = ({children}) => {
  const [userData, setUserData] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [userAddress, setUserAddress] = useState();
  const [userOrders, setUserOrders] = useState([]);

  // console.log(userCart,'contxt')


  const cartTotal = userCart?.reduce(
    (init, next) => init + Number(next?.product?.price) * Number(next.quantity),
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

  // const getCartItems = async()=>{
  //   const devideId= await getFromStorage('deviceId');
  //   let headerObj={
  //     deviceid: devideId,
  //     devicename: 'Android',
  //   }
  //   if(userData?.length){
  //     headerObj.userid= userData[0]?._id
  //   };

  //   const cartItems= await clientRequest('api/v1/public/cart','GET',headerObj);
  //   // console.log(cartItems,'cart')
  //   if(cartItems.data){
  //     setUserCart(cartItems.data);
  //   }
  // };

  // const addToCart = async(productid)=>{
  //   const devideId= await getFromStorage('deviceId');
  //   let headerObj={
  //     deviceid: devideId,
  //     devicename: 'Android',
  //   }
  //   if(userData?.length){
  //     headerObj.userid= userData[0]?._id
  //   };

  //   const cartData = userCart.find(item => item._id === productid);
  //   if (cartData) {
  //     const updatedCart = userCart.map(item =>
  //       item._id === data._id ? {...item, quantity: item.quantity + 1} : item,
  //     );
  //     setUserCart(updatedCart);
  //   } else {
  //     setUserCart([
  //       ...userCart,
  //       {
  //         product: productid,
  //         quantity: 1,
  //       },
  //     ]);
  //   }

  //   const addTocartRes= await serverRequest('api/v1/public/cart','POST',{cartItems: userCart},headerObj);
  //   // console.log(addTocartRes,'addToCart')
  //   // console.log(cartItems,'cart')
  //   // if(cartItems.data){
  //   //   setUserCart(address.data);
  //   // }
  // }

  const getCartItems= async() =>{
    const cartData= await getCurrentCart(userData);
    console.log(cartData,'cartdata');
    setUserCart(cartData);
  }

  useEffect(()=>{
    getAddress();
    getCartItems();
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
    // addToCart,
    // getCartItems,
  };

  return <Appcontext.Provider value={values}>{children}</Appcontext.Provider>;
};
