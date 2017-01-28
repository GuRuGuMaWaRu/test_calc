import React from "react";

function CalcButton(props) {
  return (
    <button onClick={event => props.onClick(props.value, event)}>
      {props.value}
    </button>
  );
}

export default CalcButton;
