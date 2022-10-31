import React from "react";
import { ButtonStyle } from "./style";

const Field = ({ text, onClick }) => {
  return <ButtonStyle onClick={onClick}>{text}</ButtonStyle>;
};

export default Field;
