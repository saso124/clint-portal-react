import {useEffect,useState} from 'react'
import axios from 'axios'
import {GET_TAGS_OPTION_BY_INPUT_URL} from './constants'

export const useSelectOptionsByKeyword = () =>{

  const [selectOptions,setSelectOptions] = useState([]);

  const fetchSelectOption  = async (inputValue) =>{
    try{
      const result = await axios({
        method: 'GET',
        url: `${GET_TAGS_OPTION_BY_INPUT_URL}?term=${inputValue}`,
        headers:{
          'accept': 'text/plain',
          'Access-Control-Allow-Origin': '*',
        }
      });
      setSelectOptions(result.data);
    }catch(err){
      console.log('getSelectOptions error',err);
      setSelectOptions([]);
    }
  }

  return {
    fetchSelectOption,
    selectOptions
  }
}