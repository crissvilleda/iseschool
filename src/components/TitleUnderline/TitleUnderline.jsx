import React, { useEffect } from "react";
import "./Title.css";

const TitleUnderline = ({ title, color = "#296073", className = "" }) => {
  const loadTitle = () => {
    const element = document.querySelector("#title");
    element.style.setProperty("--ww", "0px");
    const width_add = 30;
    const element_width = element.offsetWidth + width_add;
    element.style.setProperty("--ww", `${element_width}px`);
    element.style.setProperty("--color", color);
  };
  useEffect(() => {
    window.onload = () => {
      loadTitle();
    };
    loadTitle();
  }, []);
  return (
    <h1 className={`title-underline ${className}`} id="title">
      {title}
    </h1>
  );
};

export default TitleUnderline;
