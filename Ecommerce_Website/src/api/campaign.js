import { getToken } from "../utils/hepler";
import client from "./client";

export const addCampaign=async(infoCampaign)=>{

  
    const token= getToken()
    try {
        const {data} =await client.post(`/campaign`,infoCampaign,
       
        {
            headers:{
                Authorization:'Bearer ' + token,
               
                
            },
        });


        return data;
        
    } catch (error) {
        console.log(error);
        return error.response.data
     
        
    }
}