import React, { createContext, useState } from "react"


export const Appcontext= createContext();


export const AppContextProvider= ({children})=>{
    const [userData,setUserData] = useState([]);
    const [userCart,setUserCart] = useState([]);

    const values={
        userData,
        setUserData,
        userCart,
        setUserCart
    }

    return<Appcontext.Provider value={values}>
        {children}
    </Appcontext.Provider>
}

