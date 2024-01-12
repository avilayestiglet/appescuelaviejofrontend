import React from "react";
import ButtonTheme from "./button";

const ButtonClean = ({
    child,
    myclass = "btn_on-hover btn theme-bg-secondary text-white w-100",
    onClick
}) => (
    <ButtonTheme child={child} onClick={onClick} myclass={myclass}></ButtonTheme>
  );

  export default ButtonClean;
