import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useSelectOptionsByKeyword } from '_hooks/useSelectOptionsByKeyword';

export default function ParkTagSelect(props) {
  const [tagList, setTagList] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const {selectOptions, fetchSelectOption} = useSelectOptionsByKeyword();

  useEffect(()=>{
    if(props.tags == null)
    setTagList([]);
    else
    {
      const tempSelectedOption = props.tags.map((item)=>({value:item.id,label:item.amenity}));
      setTagList(tempSelectedOption);
      setSelectedTags(tempSelectedOption);
      //console.log('firstOption => ',showedOption);
    }    
  },[props.tags]);

  useEffect(()=>{
      if(selectOptions.length != 0){
        const temparySelect = selectOptions.map((item)=>({value:item.id,label:item.amenity}));
        const tempSelectOption = temparySelect.filter((item)=>(!selectedTags.includes(item)));
        setTagList([...selectedTags,...tempSelectOption]);
      }
  },[selectOptions])



  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    fetchSelectOption(inputValue);
  };
  const handleSelectedTag = (newValue,actionMeta)=>{
    setSelectedTags(newValue);
  }
  return (
    <div style={{width:"100%"}}>
      <Select
        isSearchable="true"
        isMulti
        value={selectedTags}
        onChange={handleSelectedTag}
        options={tagList}
        onInputChange={handleInputChange}
      />
    </div>
  );
};
