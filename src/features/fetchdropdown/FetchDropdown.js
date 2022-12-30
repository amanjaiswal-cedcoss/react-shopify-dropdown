import { Banner, Button, Card, DataTable, Select } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextComp from "./TextComp";
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
    dispatch(addAttribute(value))
  }
  console.log(state)
  return (
    <>
      {state.categories.length > 0 &&
        state.categories.map((ele, i) => {
          if(i===0){return <SelectComp key={ele} name={'Categories'} opts={ele} index={i+1} />;}
          else return <SelectComp key={ele} name={'Sub-Categories'} opts={ele} index={i+1} />;
        })}
      {Object.keys(state.attributes).length > 0 ? (
        <>
          <Card title='Attributes' sectioned>
            <Select options={options} onChange={changeHandler} value={selectedAttribute} />
          </Card>
        {Object.entries(state.targetAttribute).length>0 ? <TextComp name={state.targetAttribute.attribute} val={state.targetAttribute.value}/> : ''}
      </>
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
      {state.selectedAttributes.length>0?<Card title='Attributes Table'>
        <DataTable
          columnContentTypes={['text','text']}
          headings={['Attribute','Value',]}
          rows={state.selectedAttributes.map(ele=>{return Object.values(ele)})}
        />
        </Card>:''}
        {state.error!==''?<Banner status="critical">Error : {state.error}</Banner>:''}
    </>
  );
};

export default FetchDropdown;
