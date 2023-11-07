import React, { createContext, useState } from "react"


export const Appcontext= createContext();


export const AppContextProvider= ({children})=>{
    const [userData,setUserData] = useState([]);
    const [userCart,setUserCart] = useState([]);
    const [userAddress,setUserAddress] = useState();

    const cartTotal= userCart.reduce((init,next)=> init+(Number(next.price)* Number(next.quantity)),0);

    const values={
        userData,
        setUserData,
        userCart,
        setUserCart,
        cartTotal,
        userAddress,
        setUserAddress
    }

    return<Appcontext.Provider value={values}>
        {children}
    </Appcontext.Provider>
}

