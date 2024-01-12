import React from "react";
import ButtonTheme from "./button";

const ButtonCreate = ({
    child,
    myclass = "btn_on-hover btn theme-bg-primary-light text-white w-100 mb-2",
    onClick
}) => (
    <ButtonTheme child={child} onClick={onClick} myclass={myclass}></ButtonTheme>
  );

  export default ButtonCreate;
