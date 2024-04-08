

import clientPyThon from "./clientPython";

export const getSalePrediction=async(date)=>{
    const jsonData = JSON.stringify(date);
    console.log(jsonData);
    const config = {
        headers: {
        "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type,Origin,X-Auth-Token,Authorization"
        }
      };
  
 
     try {
         const {data} =await clientPyThon.post(`/predict`,date,config);
 
      
         return data;
         
     } catch (error) {
        console.log(error);
         return error
         
     }
 }
 export const getSalePredictionItem=async(date,item)=>{
  const jsonData = JSON.stringify(date);
  console.log(jsonData);
  const config = {
      headers: {
      "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Origin,X-Auth-Token,Authorization"
      }
    };


   try {
       const {data} =await clientPyThon.post(`/predict-item/${item}`,date,config);

    
       return data;
       
   } catch (error) {
      console.log(error);
       return error
       
   }
}