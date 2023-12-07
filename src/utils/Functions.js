// import {BASE_URI} from '@env';
// import axios from 'axios';

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

