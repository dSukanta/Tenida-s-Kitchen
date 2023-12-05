
import {BASE_URI} from '@env'; 
export const clientRequest= async(path='/',method='GET',headers={})=>{

    const url= `${BASE_URI}/${path}`;

    const config= {
        method: method,
        headers: headers,
    }
    try {
        const response= await fetch(url,config);
        const data= await response.json();
        return data;
    } catch (error) {
        console.log(error,'error')
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
        body: body,
    }
    console.log(config,url,'data request')
    try {
        const response= await fetch(url,config);
        const data= await response.json();
        console.log(data,'data request')
    } catch (error) {
        console.log(error,':error')
    }
};




