import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useSelectOptionsByKeyword } from '_hooks/useSelectOptionsByKeyword';

export default function ParkTagSelect({tags,onChange}) {
  const [tagList, setTagList] = useState([]);
  const {selectOptions, fetchSelectOption} = useSelectOptionsByKeyword();

  useEffect(()=>{
    // console.log('ParkTagSelect tags',tags);
    if(tags == null)
      setTagList([]);
    else
      setTagList([...tags]);
  },[tags]);

  useEffect(()=>{
      if(selectOptions.length != 0){
        const temparySelect = selectOptions.map((item)=>({value:item.id,label:item.amenity}));
        const tempSelectOption = temparySelect.filter((item)=>(tags?!tags.includes(item) : true));
        if(tags)
          setTagList([...tags,...tempSelectOption]);
        else
          setTagList([...tempSelectOption]);
      }
  },[selectOptions])



  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    fetchSelectOption(inputValue);
  };
  const handleSelectedTag = (newValue,actionMeta)=>{
    onChange([...newValue]);
  }
  return (
    <div style={{width:"100%"}}>
      <Select
        isSearchable="true"
        isMulti
        value={tags}
        onChange={handleSelectedTag}
        options={tagList}
        onInputChange={handleInputChange}
      />
    </div>
  );
};
