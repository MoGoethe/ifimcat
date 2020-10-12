import React from "react";
import classnames from "classnames";
import "./index.scss";

export function Module(props) {

  const {
    title,
    className,
    ...rest
  } = props;

  const cls = classnames("if-module", className);

  return (
    <div className={cls} {...rest}>
      <div className="if-module-hd">{title}</div>
      <div className="if-module-bd">
        {props.children}
      </div>
    </div>
  )
}