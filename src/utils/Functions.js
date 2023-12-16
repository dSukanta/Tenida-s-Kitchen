import {clientRequest, serverRequest} from './ApiRequests';
import {getFromStorage, removeFromStorage, saveToStorage} from './Helper';

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
  // console.log(cartItems,'cartItems', userData)
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

      //   console.log(serverCartItems,'serverCartItems')
      const formatCartData= await serverCartItems.map((pro,i)=> {return{product:pro?.product?._id,quantity: pro?.quantity}});
      //   console.log(formatCartData,'fmCartData')
      const responseData= await addCartServer(userData, formatCartData);
      // console.log(responseData,'responseData')
      if(responseData?.length){
        await removeFromStorage('cart');
      }
      return responseData;
};


export const getCurrentCart = async userData => {
    // console.log(userData,'func udata');
    const localStorageCartItems = await getCartfromLocal();
    const serverCartItems= await getCartfromServer(userData);

    // console.log(serverCartItems,'server cart items')

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

export const updatedAndFormatCart = async (product,isExist,userCart) => {
  // console.log(product,'update cart func');

  let updatedCart;
  let formatCartData;
  if(isExist){
    updatedCart =await userCart?.map(item =>item?.product?._id === data._id ? {...item, quantity: item.quantity + 1} : item,);
    formatCartData= await updatedCart?.map((item)=> {return {product: item?.product?._id,quantity:item?.quantity}});
  }else{
    updatedCart = [...userCart,{product:product,quantity:1,},];
    formatCartData= await updatedCart?.map((item)=> {return {product: item?.product?._id,quantity:item?.quantity}});
  };
  return {updatedCart,formatCartData}
};


export const addToCart= async(userData,product,isExist,userCart)=>{

  const {updatedCart,formatCartData}= await updatedAndFormatCart(product,isExist,userCart);

  // console.log(updatedCart,'uplocal')

  if(userData?.length){
    const cartData = await addCartServer(userData, formatCartData);
    return cartData;
  }else{
    await saveToStorage('cart',updatedCart)
    const cartData= await getCartfromLocal();
    return cartData;
  }
};


export const increaseQuantity= async(userData,userCart,isExist,id)=>{
  let updatedCart;

  if (isExist) {
      updatedCart = userCart?.map(item =>
      item?.product?._id === id ? {...item, quantity: item.quantity + 1} : item,
    );
  };

  if(userData?.length){
    // console.log(updatedCart,'inc cart');
    const formatCartData = await updatedCart?.map((item,i)=> {return {product: item?.product?._id, quantity:item?.quantity}});
    const cartData = await addCartServer(userData, formatCartData);
    return cartData;
  }else{
    await saveToStorage('cart',updatedCart);
    return updatedCart;
  }
};

export const decreaseQuantity= async(userData,userCart,isExist,id,quantity)=>{
  let updatedCart;

  if (isExist && quantity > 1) {
       updatedCart = userCart.map(item =>
      item?.product?._id === id ? {...item, quantity: item.quantity - 1} : item,
    );
  }

  if(userData?.length){
    // console.log(updatedCart,'dec cart');
    const formatCartData = await updatedCart?.map((item,i)=> {return {product: item?.product?._id, quantity:item?.quantity}});
    const cartData = await addCartServer(userData, formatCartData);
    return cartData;
  }else{
    await saveToStorage('cart',updatedCart);
    return updatedCart;
  }
}



