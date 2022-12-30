import { Box, Button, Card, Select } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AttributeComp from "./AttributeComp";
import { fetchCategories,addAttribute } from "./fetchDropdownSlice";
import SelectComp from "./SelectComp";

const FetchDropdown = () => {
  const [selectedAttribute,setSelectedAttribute]=useState('')
  const state = useSelector((state) => state.fetchDropdownReducer);
  const dispatch = useDispatch();
  const options = Object.values(state.attributes).map((ele) => {
    return ele;
  });
  useEffect(() => {
    dispatch(fetchCategories([]));
  }, []);
  const changeHandler=(value)=>{
    setSelectedAttribute(value)
  }
  const clickHandler=()=>{
    let ind=options.findIndex((ele) => ele.label === selectedAttribute);
    dispatch(addAttribute({selectedAttribute,ind}))
  }
  console.log(state)
  return (
    <>
      {state.categories.length > 0 &&
        state.categories.map((ele, i) => {
          return <SelectComp key={ele} opts={ele} index={i+1} />;
        })}
      {Object.keys(state.attributes).length > 0 ? (
        <div className="box box--bordered">
          <Card title='Attributes' sectioned>
            <Select options={options} onChange={changeHandler} value={selectedAttribute} />
            <Button onClick={clickHandler} primary={true}>Add Attribute</Button>
          </Card>
        {state.selectedAttributes.length>0 ? state.selectedAttributes.map((ele,i)=>{return <AttributeComp name={ele} index={i+1}/>}) : ''}
      </div>
      ) : (
        ""
      )}
      {state.status === "idle" ? (
        ""
      ) : (
        <span className="loadspan">
          Loading...{" "}
          <img
            alt="loading gif"
            className="loadpic"
            src="https://i.gifer.com/origin/3f/3face8da2a6c3dcd27cb4a1aaa32c926_w200.webp"
          />
        </span>
      )}
    </>
  );
};

export default FetchDropdown;
