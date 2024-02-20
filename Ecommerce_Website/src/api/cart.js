import client from "./client";
import { getToken } from "../utils/hepler";

export const addItemtoCart=async(product)=>{

   const token= getToken()
   console.log(product);

    try {
        const {data} =await client.post(`/cart/`,product,
        {
            headers:{
                Authorization:'Bearer ' + token,
            },
        });

     
        return data;
        
    } catch (error) {
       console.log(error);
        return error
        
    }
}
export const getCart=async(product)=>{

    const token= getToken()
  
 
     try {
         const {data} =await client.get(`/cart/`,
         {
             headers:{
                 Authorization:'Bearer ' + token,
             },
         });
 
      
         return data;
         
     } catch (error) {
        console.log(error);
         return error
         
     }
 }
 export const reduceOneProduct=async(idItem)=>{

    const token= getToken()
    console.log(idItem);
 
     try {
         const {data} =await client.patch(`/cart/reduce-one`,idItem,
         {
             headers:{
                 Authorization:'Bearer ' + token,
             },
         });
 
      
         return data;
         
     } catch (error) {
        console.log(error);
         return error
         
     }
 }

 export const increaseOneProduct=async(idItem)=>{

    const token= getToken()
    console.log(idItem);
 
     try {
         const {data} =await client.patch(`/cart/increase-one`,idItem,
         {
             headers:{
                 Authorization:'Bearer ' + token,
             },
         });
 
      
         return data;
         
     } catch (error) {
        console.log(error);
         return error
         
     }
 }