import React from "react";
import ButtonTheme from "./button";

const ButtonSearch = ({
    child,
    myclass = "btn_on-hover btn theme-bg-primary text-white w-100",
    onClick
}) => (
    <ButtonTheme child={child} onClick={onClick} myclass={myclass}></ButtonTheme>
  );

  export default ButtonSearch;
