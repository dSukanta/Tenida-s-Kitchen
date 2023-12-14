// import {BASE_URI} from '@env';
// import axios from 'axios';

import { Alert } from "react-native";
import { clientRequest, serverRequest } from "./ApiRequests";
import { getFromStorage, saveToStorage } from "./Helper";

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

export const addToDataBase= async(userData,cartItems)=>{

    // console.log(cartItems,'params');
    const devideId = await getFromStorage('deviceId');
    let headerObj = {
        deviceid: devideId,
        devicename: 'Android',
        userid:userData[0]?._id
    };
    const addTocartRes= await serverRequest('api/v1/public/cart','POST',{cartItems: cartItems},headerObj);
    // console.log(addTocartRes,'add cart')
    if(addTocartRes?.success){
        return addTocartRes?.data
    }else{
        return addTocartRes?.message
    }
}


export const getCart = async (userData) => {
    // console.log(userData?.length,'user length');

    if (userData?.length) {
        const devideId = await getFromStorage('deviceId');
        let headerObj = {
            deviceid: devideId,
            devicename: 'Android',
            userid:userData[0]?._id
        };
        const getCartres= await clientRequest('api/v1/public/cart','GET',headerObj);
        // console.log(getCartres?.data?.cartItems,'server response')
        const localCartItems = await getFromStorage('cart')||[];
        // console.log(localCartItems,' local response')

        if(getCartres?.data?.cartItems){
            // if the response is successful go ahead and format it as expected for posting cart data.

            const formatData= getCartres?.data?.cartItems?.map((item,i)=> {return {product: item?.product?._id, quantity: item?.quantity}})
            
            if(localCartItems?.length){
                // if the there is data in user cart and local storage previously.
                
                const existingProductIndex = formatData?.findIndex((item,i)=> item?.product === localCartItems[0]?.product?._id);
                // check if the local storage product is available in database user cart . if available get it's index 

                // if the product previously available replace it with the local storage  
                
                if(existingProductIndex !== -1){
                    const existingProduct= formatData?.find((item,i)=> item?.product === localCartItems[0]?.product?._id);
                    // console.log(existingProduct,'existing product')
                    const updatedExisting= {...existingProduct, quantity: localCartItems[0]?.quantity}
                    formatData[existingProductIndex]= updatedExisting
                }else{
                    // if the product is not available in user cart push the product in the user cart.
                    const updatedExisting= {product: localCartItems[0]?.product?._id, quantity: localCartItems[0]?.quantity}
                    formatData?.push(updatedExisting);
                };
                const updata = formatData.filter((item,i)=>item?.product !== undefined || '');
                const addLocalToDB= await addToDataBase(userData,updata);
                // console.log(addLocalToDB?.cartItems,'addLocalToDB success');
                if(addLocalToDB?.cartItems){
                    const updatedCart= [];
                    await saveToStorage('cart',updatedCart);
                    const getCartres= await clientRequest('api/v1/public/cart','GET',headerObj);
                    // console.log(getCartres,'getCartres success');
                    return getCartres?.data?.cartItems;
                }
            }else{
                return getCartres?.data?.cartItems;
            }
        }else{
            return getCartres.message;
        }
    } else {
        const getCartres= await getFromStorage('cart') || [];
        // console.log(getCartres,'cart length');
        return getCartres;
    }
};

export const handleAddToCart = async (userData,product,setCart) => {

    // console.log(userData,product,'params add cart');

    const cartItems = await getCart(userData);
    const localCartItems = await getFromStorage('cart')||[]; 
    // console.log(cartItems,'items')
    if(userData?.length) {

        const formatData= cartItems?.map((item,i)=> {return {product: item?.product?._id, quantity: item?.quantity}}) 

        const isExists= await formatData?.filter((item) => item?.product === product._id)?.length;

        if(isExists){
            const updatedCart = await formatData.map(item =>
                item.product === product._id ? {...item, quantity: item.quantity + 1} : item,
              );
              const addTocartRes= await addToDataBase(userData,updatedCart);
              console.log(addTocartRes,'res');
              const addRes= await getCart(userData);
              setCart(addRes);
        }else{
            formatData.push({product: product._id, quantity:1});
            // console.log(updatedCart,'res');
            const addTocartRes= await addToDataBase(userData,formatData)
            // console.log(addTocartRes,'add cart')
            const addRes= await getCart(userData);
            // console.log(addRes,'get cart res...');
            setCart(addRes)
        }
    }else{
        if(cartItems.length<1){
            const updatedCart= [{product:product, quantity:1}];
            await saveToStorage('cart',updatedCart);
            const data = await getCart(userData);
            // console.log(data,'addtocart res');
            setCart(data);
            Alert.alert('Success','Item added to Cart successfully.');
        }else{
            Alert.alert('Error!','Please login to add more than one item to your cart')
        }
    }
};


export const handledeleteCart = async (userData,product,setCart)=>{

    const cartItems = await getCart(userData);

    const devideId = await getFromStorage('deviceId');

    let headerObj = {
        deviceid: devideId,
        devicename: 'Android',
        userid:userData[0]?._id
    };

    const formatData= cartItems?.map((item,i)=> {return {product: item?.product?._id, quantity: item?.quantity}}) ;

    if(userData?.length){
        // const deleteRes= await serverRequest('api/v1/public/cart','DELETE',{},{});
        const updatedCart= formatData?.filter((item,i)=>item?.product !==product?.product?._id);
        const addTocartRes= await addToDataBase(userData,updatedCart);
        if(addTocartRes?.cartItems){
            const getCartres= await clientRequest('api/v1/public/cart','GET',headerObj);
            // console.log(getCartres,'getCartres success');
            setCart(getCartres?.data?.cartItems);
        }
        // console.log(cartItems)
    }else{
        const updatedCart= cartItems?.filter((item,i)=>item._id!==product._id);
        await saveToStorage('cart',updatedCart);
        const data = await getCart(userData);
        setCart(data)
        Alert.alert('Success!','Item deleted successfully');
    }
};


export const EditCart = async (userData,cartItems,setCart)=>{

    const devideId = await getFromStorage('deviceId');

    let headerObj = {
        deviceid: devideId,
        devicename: 'Android',
        userid:userData[0]?._id
    };

    const formatData= cartItems?.map((item,i)=> {return {product: item?.product?._id, quantity: item?.quantity}}) ;

    if(userData?.length){
         const cartAddRes= await addToDataBase(userData,formatData);
        //  console.log(cartAddRes);
         if(cartAddRes?.cartItems){
            const getCartres= await clientRequest('api/v1/public/cart','GET',headerObj);
            // console.log(getCartres,'getCartres success');
            setCart(getCartres?.data?.cartItems);
        }
    }else{
        await saveToStorage('cart',cartItems);
        const data = await getCart(userData);
        setCart(data);
    }
};
