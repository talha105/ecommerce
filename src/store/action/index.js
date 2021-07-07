import axios from "axios"
import {
    LOGIN,
    FORGET_PASSWORD,
    THEME,
    ADDTOCARD,
    GET_PROFILE,
    GET_BANNERS,
    DELECT_CARD_ITEM,
    GET_CATEGORY,
    GET_PRODUCT
} from "./type"
import AsyncStorage from "@react-native-community/async-storage"
import {api} from "../../config/config.json"



export const login=(data)=>async dispatch=>{
    const res=await axios.post(`${api}/api/login`,data)
    res.data.success?await AsyncStorage.setItem('id',res.data.data.data.id.toString()):null
    dispatch({
        type:LOGIN,
        payload:res.data
    })
}

export const setUserOnload=(id)=>async dispatch=>{
    dispatch({
        type:LOGIN,
        payload:{
            data:{
                data:{
                    id:id
                },
                error:null
            },
            success:true,
        }
    })
}

export const logOut=()=>async dispatch=>{
    await AsyncStorage.removeItem('id')
    dispatch({
        type:LOGIN,
        payload:{
            data:{
                data:{
                    id:null
                },
                error:null
            },
            success:null,
        }
    })
}

export const clearUser=()=>async dispatch=>{
    dispatch({
        type:LOGIN,
        payload:{
            data:{
                data:{
                    id:null
                },
                error:null
            },
            success:null,
        }
    })
}

export const registration=(data)=>async dispatch=>{
    data={
        first_name:data.firstName,
        last_name:data.lastName,
        email:data.email,
        number:data.mobileNo,
        password:data.password,
        address:data.address,
    }
    const res=await axios.post(`${api}/api/register`,data)
    res.data.success?await AsyncStorage.setItem('id',res.data.data.data.id.toString()):null
    dispatch({
        type:LOGIN,
        payload:res.data
    })
}

export const forgetPassword=(data)=>async dispatch=>{
    console.log(data)
}

export const addtocardAction=(data)=>async dispatch=>{
    dispatch({
        type:ADDTOCARD,
        payload:data
    })
}

export const deleteCardItem=(id)=>async dispatch=>{
    dispatch({
        type:DELECT_CARD_ITEM,
        payload:id
    })
}

export const getProfile=(id)=>async dispatch=>{
    const res=await axios.post(`${api}/api/profile`,{id,id});
    dispatch({
        type:GET_PROFILE,
        payload:res.data.data
    })
}

export const editProfile=(data)=>async dispatch=>{
    const bodyForm=new FormData();
    bodyForm.append('first_name',data.first_name)
    bodyForm.append('last_name',data.last_name)
    bodyForm.append('id',data.id)
    bodyForm.append('number',data.number)

    if(data.imageEdit){
        var file={
            uri:data.image.path,
            name:data.image.path.slice(data.image.path.lastIndexOf('/')+1,data.image.path.length),
            type:data.image.mime
        }
        bodyForm.append('image',file)
    }

    const res=await axios.post(`${api}/api/update_profile`,bodyForm);
}

export const getBanners=()=>async dispatch=>{

    const res=await axios.get(`${api}/api/slider`);

    dispatch({
        type:GET_BANNERS,
        payload:res.data.data
    })

}

export const changeTheme=(theme)=>async dispatch=>{
    dispatch({
        type:THEME,
        payload:theme
    })
}


export const getCategory=(theme)=>async dispatch=>{
    const res=await axios.get(`${api}/api/categories`);
    dispatch({
        type:GET_CATEGORY,
        payload:res.data.data
    })
}

export const getProducts=(id)=>async dispatch=>{
    const res=await axios.post(`${api}/api/all_products`,{category_id:id});
    dispatch({
        type:GET_PRODUCT,
        payload:res.data.data
    })
}