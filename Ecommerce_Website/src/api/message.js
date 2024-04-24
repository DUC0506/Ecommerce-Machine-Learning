import { getToken } from "../utils/hepler";
import client from "./client";

export const createMessage=async(message)=>{

    

    const token= getToken()
    try {
        const {data} =await client.post(`/message/`,message,
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
export const getMessages=async(to)=>{

    
    const token= getToken()
    try {
        const {data} =await client.get(`/message/${to}`,
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
    