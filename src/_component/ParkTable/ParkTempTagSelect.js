import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { useSelectOptionsByKeyword } from '_hooks/useSelectOptionsByKeyword';

export default function ParkTempTagSelect({tags}) {
  const [selectedOption, setSelectedOption] = useState([]);
  const {selectOptions, fetchSelectOption} = useSelectOptionsByKeyword();

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

  const filterOption = (inputValue) => {
    if(selectOptions.length != 0)
    return selectOptions.filter(i =>
      i.label.includes(inputValue)
    );
  };
  
  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(fetchSelectOption(inputValue));
      // callback(filterOption(inputValue));
    }, 1000);
  };

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
      <AsyncSelect
          cacheOptions
          isMulti
          //loadOptions={selectedOption}
          loadOptions={loadOptions}
          defaultOptions={selectedOption}
          onInputChange={handleInputChange}
      />
    </div>
  );
};
