import React from "react";

const CalcButton = (props) => {
  return (
    <button onClick={() => props.onClick(props.value)}> { props.value } </button>
  );
}

export default CalcButton;
