import React, { createContext, useState } from "react"


export const Appcontext= createContext();


export const AppContextProvider= ({children})=>{
    const [userData,setUserData] = useState([]);
    const [userCart,setUserCart] = useState([]);

    const cartTotal= userCart.reduce((init,next)=> init+(Number(next.price)* Number(next.quantity)),0);

    const values={
        userData,
        setUserData,
        userCart,
        setUserCart,
        cartTotal,
    }

    return<Appcontext.Provider value={values}>
        {children}
    </Appcontext.Provider>
}

