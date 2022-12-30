import { Button, Card, TextField } from "@shopify/polaris";
import React, { useState, useCallback, memo } from "react";

const AttributeComp = (props) => {
  const { name,index } = props;
  const [value, setValue] = useState("");

  const handleChange = useCallback((newValue) => {
    setValue(newValue);
  }, []);

  return (
      <Card title={name} sectioned subdued>
        <TextField value={value} onChange={(value)=>{handleChange(value,index)}} />
        <Button>Save Attribute</Button>
      </Card>
  );
};

export default memo(AttributeComp);
