import React from "react";

function Button({ text, handleClick, className }) {
  return (
    <button className="button-82-pushable" role="button" onClick={handleClick}>
      <span className="button-82-shadow"></span>
      <span className="button-82-edge"></span>
      <span className="button-82-front text">{text ? text : 'clear cart'}</span>
    </button>
  );
}

export default Button;
