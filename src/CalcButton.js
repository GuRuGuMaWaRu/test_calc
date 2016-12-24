import React from "react";

function CalcButton(props) {
  return (
    <button onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default CalcButton;
