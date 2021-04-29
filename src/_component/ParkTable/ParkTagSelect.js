import React, { useEffect, useState } from "react";
import Select from "react-select";
// import { selectOptionsBykeyword } from '_hooks/selectOptionsBykeyword';

export default function ParkTagSelect({tags}) {
  const [selectedOption, setSelectedOption] = useState([]);
  // const {restOption, setRestOption} = selectOptionsBykeyword();

  useEffect(()=>{
    if(tags == null)
      setSelectedOption([]);
    else
    {
      const tempSelectedOption = tags.map((item)=>({value:item.id,label:item.amenity}));
      setSelectedOption(tempSelectedOption);
      console.log('setSelectedOption',tempSelectedOption);
    }    
  },[tags])
  return (
    <div style={{width:"100%"}}>
      <Select
        isSearchable="true"
        isMulti
        value = {selectedOption}
        onChange={setSelectedOption}
        options={selectedOption}
      />
    </div>
  );
  
}