import React,{useEffect,useState} from 'react'
import axios from 'axios'

import {GET_DASHBOARD_INFO_BY_USER_URL} from './constants'

export const useDashboardInfoByUser = (userId) =>{

  const [dashboardData,setDashboardData] = useState({});

  const fetchDashboardByUser  = async () =>{
    try{
      const result = await axios({
        method: 'GET',
        url: `${GET_DASHBOARD_INFO_BY_USER_URL}?id=${userId}`,
        headers:{
          'accept': 'text/plain',
          'Access-Control-Allow-Origin': '*',
        }
      });
      // console.log('fetchDashboardByUser',result.data);
      setDashboardData(result.data);
    }catch(err){
      console.log('useGetParkByUser error',err);
      setDashboardData({});
    }
  }

  useEffect(()=>{
    fetchDashboardByUser();
  },[]);

  return {
    fetchDashboardByUser,
    dashboardData
  }
}