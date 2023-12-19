
import {BASE_URI} from '@env'; 
export const clientRequest= async(path='/',method='GET',headers={})=>{

    const url= `${BASE_URI}/${path}`;
    // console.log(url,headers,'clinet url')
    const config= {
        method: method,
        headers: headers,
    }
    try {
        const response= await fetch(url,config);
        const data= await response.json();
        return data;
    } catch (error) {
        console.log(error,'error getting data from server')
    }
};

export const serverRequest= async(path='/',method='POST',body={},headers={})=>{

    const  url= `${BASE_URI}/${path}`;

    const config= {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...headers, 
        },
        body: body ? JSON.stringify(body) : null,
    }
    // console.log(config,url,'data request')
    try {
        const response= await fetch(url,config);
        const data= await response.json();
        return data;
    } catch (error) {
        console.log(error,':error updating data')
    }
};




