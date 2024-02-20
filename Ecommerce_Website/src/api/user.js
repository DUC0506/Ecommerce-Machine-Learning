import client from "./client";

export const signInUser= async(userInfo)=>{
    try {
        const {data} =await client.post("/auth/login",userInfo);
        
        return data;
        
    } catch (error) {
       
        const{response}=error;

        if(response?.data) return response.data

        return {error:error.message || error}
        
    }
}

export const getUsers= async()=>{
    try {
        const {data} =await client.get("/user");
        
        return data;
        
    } catch (error) {
       
        const{response}=error;

        if(response?.data) return response.data

        return {error:error.message || error}
        
    }
}