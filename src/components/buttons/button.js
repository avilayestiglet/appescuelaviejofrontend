import React from "react";

const ButtonTheme = ({
    child,
    myclass,
    onClick
}) => (
    <button type="button" className={myclass} onClick={onClick}>
      { child }
    </button>
  );

  export default ButtonTheme;
