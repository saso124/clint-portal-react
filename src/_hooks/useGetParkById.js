import React,{useEffect,useState} from 'react';
import axios from 'axios';

import {GET_PARK_BY_ID_URL,POST_SAVE_PARK_URL,POST_SAVE_PHOTO_URL,GET_DELELTE_PHOTO_URL} from './constants';

export const useGetParkById = () =>{

    const [parkData,setParkData] = useState({});
    
    const fetchParkDataById = async (itemId) =>{
        if(itemId == 0)
        {
            setParkData({});
            return;
        }
        try{
            const result = await axios({
                method:'GET',
                url:`${GET_PARK_BY_ID_URL}/${itemId}`,
                headers:{
                    'accept': 'text/plain',
                    'Access-Control-Allow-Origin': '*',
                }
            });
            setParkData(result.data)
            // setParkData(data);
        }catch(err){
            console.log('useGetParkById fetchParkDataById error',err);
            setParkData([]);
        }
    }

    const saveParkData = async (params) =>{
        try{
            let data={...params};
            if(params.id=="")
            {
                // data['id'] = '600f29a49e36c5f0bf6d0235'
                delete data['id'];
            }
            const result = await axios({
                method: 'POST',
                url: POST_SAVE_PARK_URL,
                headers: {
                  accept: 'text/plain',
                  'Access-Control-Allow-Origin': '*',
                },
                data,
            });
            // console.log(result);
            setParkData(result.data);
        }catch(err) {
            console.log('useGetParkById saveParkData error',err);
        }
    }

    const addPhotoData = async (params,id) =>{
        try{
            const result = await  axios({
                method: 'POST',
                url: POST_SAVE_PHOTO_URL,
                headers: {
                accept: 'text/plain',
                    'Access-Control-Allow-Origin': '*',
                },
                data: params,
            });

            await fetchParkDataById(id);
        }catch(err){
            console.log('useGetParkById addPhotoData error',err);
        }
    }

    const deletePhotoData = async (url,id) =>{
        try{
            const result = await  axios({
                method: 'DELETE',
                url: `${GET_DELELTE_PHOTO_URL}?url=${encodeURI(url)}`
            });

            await fetchParkDataById(id);
        }
        catch(err){
            console.log('useGetParkById deletePhotoData error',err);
        }
    }

    return {
        fetchParkDataById,
        saveParkData,
        addPhotoData,
        deletePhotoData,
        parkData
    }
}