import React,{useEffect,useState} from 'react';
import axios from 'axios';

import {GET_PARK_BY_USER_URL} from './constants';

export const useGetParkByUser = (userId) =>{

    const [parkData,setParkData] = useState([]);
    
    const fetchParkDataByUser = async () =>{
        try{
            const result = await axios({
                method:'GET',
                url:`${GET_PARK_BY_USER_URL}?id=${userId}`,
                headers:{
                    'accept': 'text/plain',
                    'Access-Control-Allow-Origin': '*',
                }
            });
            // console.log(result.data);
            setParkData(result.data)
            // setParkData(data);
        }catch(err){
            console.log('useGetParkByUser error',err);
            setParkData([]);
        }
    }
    useEffect(()=>{
        fetchParkDataByUser();
    },[])

    return {
        fetchParkDataByUser,
        parkData
    }
}