import React from "react";
import { Input } from "./style";

const Field = ({ type, name, onBlur, onChange }) => {
  return <Input type={type} name={name} onBlur={onBlur} onChange={onChange} required />;
};

export default Field;
