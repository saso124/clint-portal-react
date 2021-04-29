import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useSelectOptionsByKeyword } from '_hooks/useSelectOptionsByKeyword';

export default function ParkTagSelect({tags}) {
  const [selectedOption, setSelectedOption] = useState([]);
  const [defaultOption, setDefaultOption] = useState([]);
  const {selectOptions, fetchSelectOption} = useSelectOptionsByKeyword();

  useEffect(()=>{
    if(tags == null)
      setSelectedOption([]);
    else
    {
      const tempSelectedOption = tags.map((item)=>({value:item.id,label:item.amenity}));
      setSelectedOption(tempSelectedOption);
      setDefaultOption(tempSelectedOption);
      console.log('setSelectedOption',tempSelectedOption);
    }    
  },[tags])

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
      fetchSelectOption(inputValue);
    console.log('fetchSelectOption',selectOptions);
      if(selectOptions.length != 0){
          const tempSelectOption = selectOptions.map(
            function (item){
              if(selectedOption.indexOf(item.id) >-1){
                return {value:item.id,label:item.amenity};
              }
            }
          );

        const subSelectionOption = selectOptions.concat(tempSelectOption);
        setSelectedOption(subSelectionOption);
      }
  };
  return (
    <div style={{width:"100%"}}>
      <Select
        isSearchable="true"
        isMulti
        defaultValue={defaultOption}
        value = {selectedOption}
        onChange={setSelectedOption}
        options={selectedOption}
        onInputChange={handleInputChange}
      />
    </div>
  );
};
