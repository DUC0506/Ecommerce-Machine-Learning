import { getToken } from "../utils/hepler";
import client from "./client";
export const getCommentByNews=async(idNews)=>{

  
    const token= getToken()
    try {
        const {data} =await client.get(`/comment?newsId=${idNews}`,
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
export const addComment=async(idNews,comments)=>{

    console.log(comments);
    const token= getToken()
    try {
        const {data} =await client.post(`/comment?newsId=${idNews}`,comments,
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
export const removeComment=async(idNews,commentId)=>{

    
    const token= getToken()
    try {
        const {data} =await client.delete(`/comment/${idNews}/${commentId}`,
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
