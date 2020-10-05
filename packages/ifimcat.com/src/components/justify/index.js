import React from "react";
import classnames from "classnames";
import "./index.scss";

export function Justify(props) {
  const {
    className,
    leftStyle = {},
    left,
    right,
    ...rest
  } = props;

  const cls = classnames("if-justify", className);

  return (
    <div className={cls} {...rest}>
      <div className="if-justify--left" {...leftStyle}>{left || props.children}</div>
      <div className="if-justify--right">{right}</div>
    </div>
  )
}