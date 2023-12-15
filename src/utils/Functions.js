// import {BASE_URI} from '@env';
// import axios from 'axios';

import {clientRequest, serverRequest} from './ApiRequests';
import {getFromStorage, removeFromStorage} from './Helper';

// export const getRequest = async (path, method, body) => {
//   const myHeaders = new Headers();

//   const formData = new FormData();

//   const keys = Object.keys(body);

//   if (keys.length > 0) {
//     for (let key in body) {
//       formData.append(key.toString(), body[key]);
//     }
//   }
//   const options = {
//     method: method,
//     headers: myHeaders,
//     body: formData,
//   };
//   const res = await fetch(`${BASE_URI}${path}`, options);
//   const data = res.json();
//   return data;
// };

// export async function makeRequest(endpoint, method = 'GET', body = null, headers = {}) {
//     try {
//       const config = {
//         method,
//         url: `${BASE_URI}/${endpoint}`,
//         headers,
//         data: body,
//       };

//       // console.log(config,'cfg');

//       const response = await axios(config);
//       return response.data;
//     } catch (error) {
//       // Handle errors here
//       console.error('Request failed:', error.message);
//       throw error;
//     }
//   }

export const getCartfromLocal = async () => {
  const cartItems = await getFromStorage('cart');
  if (cartItems?.length) {
    return cartItems;
  } else {
    return [];
  }
};

export const getCartfromServer = async userData => {
  const devideId = await getFromStorage('deviceId');
  let headerObj = {
    deviceid: devideId,
    devicename: 'Android',
  };
  if (userData?.length) {
    headerObj.userid = userData[0]?._id;
  }

  const cartItems = await clientRequest('api/v1/public/cart', 'GET', headerObj);
  if (cartItems?.success) {
      return cartItems?.data?.cartItems;
  }else{
    return []
  }
};

export const addCartServer= async(userData,cartItems)=>{
    const devideId = await getFromStorage('deviceId');
        let headerObj = {
            deviceid: devideId,
            devicename: 'Android',
            userid:userData[0]?._id
        };
    const response= await serverRequest('api/v1/public/cart','POST',{cartItems: cartItems},headerObj);
    if(response.success){
        const serverCartItems= await getCartfromServer(userData);
        return serverCartItems;
    }else{
        return [];
    }
};

export const updateAndSyncCart = async (userData,localStorageCartItems,serverCartItems) => {

    // console.log(userData,'userData',localStorageCartItems,'localStorageCartItems',serverCartItems,'serverCartItems')

    localStorageCartItems.forEach((localStorageCartItem) => {
        const index = serverCartItems?.findIndex(
          (item) => item?.product?._id === localStorageCartItem?.product?._id
        );
  
        if (index !== -1) {
          // If the product is already in the server cart, update the quantity
          serverCartItems[index].quantity = localStorageCartItem.quantity;
        } else {
          // If the product is not in the server cart, add it
          serverCartItems.push(localStorageCartItem);
        };
      });

      await removeFromStorage('cart');
    //   console.log(serverCartItems,'serverCartItems')
      const formatCartData= await serverCartItems.map((pro,i)=> {return{product:pro?.product?._id,quantity: pro?.quantity}});
    //   console.log(formatCartData,'fmCartData')
        const responseData= await addCartServer(userData, formatCartData);
        // console.log(responseData,'responseData')
      return responseData;
};


export const getCurrentCart = async userData => {
    // console.log(userData,'func udata');
    const localStorageCartItems = await getCartfromLocal();
    const serverCartItems= await getCartfromServer(userData);

    // console.log(localStorageCartItems,'server cart items')

    if(userData?.length){
        if(localStorageCartItems.length){
            const updateServerCartItems = await updateAndSyncCart(userData,localStorageCartItems,serverCartItems);
            // console.log(updateServerCartItems,'updated cart')
            return updateServerCartItems;
        }else{
            const cartItems= await getCartfromServer(userData);
            return cartItems;
        }
    }else{
        const cartItems= await getCartfromLocal();
        return cartItems;
    }
};




