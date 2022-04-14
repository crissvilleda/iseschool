import React, { useEffect } from "react";
import "./Title.css";

const uniqueId = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

const TitleUnderline = ({
  title,
  color = "#296073",
  className = "",
  id_title = "title-" + uniqueId(),
}) => {
  const loadTitle = () => {
    const element = document.querySelector(`#${id_title}`);
    if (element) {
      element.style.setProperty("--ww", "0px");
      const width_add = 30;
      const element_width = element.offsetWidth + width_add;
      element.style.setProperty("--ww", `${element_width}px`);
      element.style.setProperty("--color", color);
    }
  };
  useEffect(() => {
    window.onload = () => {
      loadTitle();
    };
    loadTitle();
  }, []);
  return (
    <h1 className={`title-underline ${className}`} id={id_title}>
      {title}
    </h1>
  );
};

export default TitleUnderline;
