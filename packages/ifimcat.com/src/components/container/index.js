import React from "react";
import classNames from "classnames";
import "./index.scss";

export function Container(props) {
  const {
    className,
    containerStyle,
    mainStyle,
    fullScreen
  } = props;
  const cls = classNames("if-container", className, {
    "if-container--fullScreen": fullScreen
  });

  return (
    <div className={cls} style={containerStyle}>
      <div className="if-container-main" style={mainStyle}>
        {props.children}
      </div>
    </div>
  )
}