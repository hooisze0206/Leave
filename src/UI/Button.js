import React from "react";
import "./Button.css";

const Button = (Props) => {
  return (
    <button className="button" type={Props.type} onClick={Props.onClick}>
      <span>{Props.children}</span>
    </button>
  );
};

export default Button;
