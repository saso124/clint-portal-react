import {useEffect,useState} from 'react'
import axios from 'axios'
import {GET_SAVE_PHOTO_URL} from './constants'

export const useSubmitParkImage = () =>{
  const submitImage  = async (imageFiles) =>{
    axios
    .post(GET_SAVE_PHOTO_URL,imageFiles, {
          headers: {
            'Content-Type': 'application/json'
          }}
    )
    .then(() => console.log('SUCCESS fileUpload'))
    .catch(err => {
        console.error(err);
    })
  }

  return {
    submitImage,
    
  }
}