import React,{useEffect,useState} from 'react';
import axios from 'axios';

import {GET_PARK_BY_ID_URL} from './constants';

export const useGetParkById = (userId) =>{

    const [parkData,setParkData] = useState([]);
    
    const fetchParkDataById = async () =>{

        try{
            const result = await axios({
                method:'GET',
                url:`${GET_PARK_BY_ID_URL}/${userId}`,
                headers:{
                    'accept': 'text/plain',
                    'Access-Control-Allow-Origin': '*',
                }
            });
            setParkData(result.data)
            // setParkData(data);
        }catch(err){
            console.log('useGetParkByUser error',err);
            setParkData([]);
        }
    }
    useEffect(()=>{
        fetchParkDataById();
    },[])

    useEffect(()=>{
      fetchParkDataById();
    }, [userId])

    return {
        fetchParkDataById,
        parkData
    }
}