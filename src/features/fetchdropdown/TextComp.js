import { Button, Card, TextField } from "@shopify/polaris";
import React, { useState, useCallback, memo} from "react";
import { useDispatch } from "react-redux";
import { saveAttribute } from "./fetchDropdownSlice";

const TextComp = (props) => {
  const dispatch=useDispatch();
  const { name,val} = props;
  const [value, setValue] = useState(val);

  const handleChange = useCallback((value) => {
    setValue(value);
  }, []);

  const clickHandler=()=>{
    dispatch(saveAttribute({name,value}))
  }

  return (
      <Card title={name} sectioned>
        <TextField value={value} onChange={(value)=>{handleChange(value)}} />
        <br/>
        <Button primary onClick={clickHandler}>Save Attribute</Button>
      </Card>
  );
};

export default memo(TextComp);
