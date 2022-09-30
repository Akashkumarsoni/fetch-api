import { Select, TextField } from "@shopify/polaris";
import React, { useState } from "react";

const SelectInput = (props) => {    
  const [inputText, setInputText] = useState("");
  const [optionText,setOptionText]=useState("");
  const getText = (e) => {
    setInputText(e);
    props.getdata(e);
  };
  const optionsuid = [
    { label: "Equals", value: "1" },
    { label: "Not Equal", value: "2" },
    { label: "Contains", value: "3" },
    { label: "Not Contains", value: "4" },
    { label: "Starts with", value: "5" },
    { label: "Ends with", value: "6" },
  ];
  const getSelectValue = (e) => {
    setOptionText(e);
    props.getselectdata(e);
  };
  return (
    <div className="seleinp" id={props.index}>
        
      <Select
        options={optionsuid}
        onChange={getSelectValue}
        value={optionText}
      />

      <TextField
        value={inputText}
        onChange={getText}
        placeholder={props.plcaeholder}
      />
    </div>
  );
};

export default SelectInput;
