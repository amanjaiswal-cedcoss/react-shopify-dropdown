import { Card, Select } from "@shopify/polaris";
import React, { useState, useCallback, memo } from "react";
import { useDispatch} from "react-redux";
import { fetchCategories,fetchAttributes, clearPrev } from "./fetchDropdownSlice";

const SelectComp = (props) => {
  const dispatch = useDispatch();
  const {name,opts,index} = props;

  // mapping the options for select component from Polaris
  const options = opts.map((ele) => {
    return { label: ele.name, value: ele.name };
  });

  const [selected, setSelected] = useState(options[0]);
  
  // function to dispatch action as per the value of hasChildren in the respective category 
  const handleSelectChange = useCallback((value,indexCat) => {
    let indexOpt = options.findIndex((ele) => ele.label === value);
    if(opts[indexOpt].hasChildren){
      dispatch(clearPrev(indexCat))
      dispatch(fetchCategories(opts[indexOpt].parent_id));
    }
    else{
      dispatch(fetchAttributes({browseNodeId:opts[indexOpt].browseNodeId,category:opts[indexOpt].category['primary-category'],sub_category:opts[indexOpt].category['sub-category']}))
    }
    setSelected(value);
  }, []);


  return (
      <Card title={name} sectioned>
      <Select
        options={options}
        onChange={(value)=>handleSelectChange(value,index)}
        value={selected}
      />
      </Card>
  );
};

export default memo(SelectComp);
