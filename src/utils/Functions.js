// import {BASE_URI} from '@env';
// import axios from 'axios';

import {clientRequest} from './ApiRequests';
import {getFromStorage} from './Helper';

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
  if (cartItems.length) {
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
//   console.log(cartItems,'cart')
  if (cartItems?.success) {
      return cartData?.data?.cartItems;
  }
};

// export const updateAndSyncCart = async userData => {
    
//     const localStorageCartItems = await getCartfromLocal();
//     const serverCartItems= await getCartfromServer(userData);

//     localStorageCartItems.forEach((localStorageCartItem) => {
//         const index = serverCartItems.findIndex(
//           (item) => item.id === localStorageCartItem.id
//         );
  
//         if (index !== -1) {
//           // If the product is already in the server cart, update the quantity
//           serverCartItems[index].quantity = localStorageCartItem.quantity;
//         } else {
//           // If the product is not in the server cart, add it
//           serverCartItems.push(localStorageCartItem);
//         };
//       });
     
// }


export const getCurrentCart = async userData => {
    console.log(userData,'func udata');

    if(userData?.length){
        const cartItems= await getCartfromServer(userData);
        return cartItems;
    }else{
        const cartItems= await getCartfromLocal();
        return cartItems;
    }
};

