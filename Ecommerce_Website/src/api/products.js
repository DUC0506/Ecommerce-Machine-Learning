import { getToken } from "../utils/hepler";
import client from "./client";

export const getProducts=async()=>{

    const token= getToken()
    try {
        const {data} =await client.get(`/product`,
        {
            headers:{
                Authorization:'Bearer ' + token,
                
            },
        });

     
        return data;
        
    } catch (error) {
       
        return error
        
    }
}
export const getProductsByApartment=async()=>{

    const token= getToken()
    try {
        const {data} =await client.get(`/product/products-apartment`,
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
export const createProduct=async(product)=>{

    const token= getToken()
    console.log(product);
 
     try {
         const {data} =await client.post(`/product/`,product,
         {
             headers:{
                 Authorization:'Bearer ' + token,
                 'Content-Type': 'multipart/form-data',
             },
         });
 
      
         return data;
         
     } catch (error) {
        console.log(error);
         return error
         
     }
 }
 
export const getProduct=async(productId)=>{

    const token= getToken()
    try {
        const {data} =await client.get(`/product/${productId}`,
        {
            headers:{
                Authorization:'Bearer ' + token,
                
            },
        });

     
        return data;
        
    } catch (error) {
       
        return error
        
    }
}
export const deleteProduct=async(productId)=>{
    const token= getToken()
   
    try {
        const {data} =await client.delete(`/product/${productId}`,
        {
            headers:{
                Authorization:'Bearer ' + token,
                
            },
        });
        return data;
        
    } catch (error) {
       
        return error
        
    }
}

export const updateProduct=async(productId,product)=>{
    const token= getToken()
   
    try {
        const {data} =await client.patch(`/product/${productId}/details`,product,
        {
            headers:{
                Authorization:'Bearer ' + token,
                
            },
        });
        return data;
        
    } catch (error) {
       
        return error
        
    }
}