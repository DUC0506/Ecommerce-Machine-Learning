import { getToken } from "../utils/hepler";
import client from "./client";
export const getNewsByApartment=async(idApartment,idAuthor)=>{

    let url =idAuthor ? `?author=${idAuthor}` :`?apartment=${idApartment}`
    console.log(url);
    const token= getToken()
    try {
        const {data} =await client.get(`/news/${url}`,
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
export const updateNewsDetails=async(idNews,contentNews)=>{

    console.log(idNews,contentNews);

    const token= getToken()
    try {
        const {data} =await client.patch(`/news/${idNews}/details`,contentNews,
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
export const addNews=async(contentNews)=>{

    console.log(contentNews);

    const token= getToken()
    try {
        const {data} =await client.post(`/news/`,contentNews,
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
export const removeNews=async(idNews)=>{

    console.log(idNews);

    const token= getToken()
    try {
        const {data} =await client.delete(`/news/${idNews}`,
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