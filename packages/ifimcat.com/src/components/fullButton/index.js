import React from "react";
import classNames from "classnames";
import "./index.scss";

export function FullButton(props) {

  const {
    text,
    className,
    onClick,
    ...rest
  } = props;

  const cls = classNames("if-fullBtn", className);
  const click = () => {
    onClick && onClick();
  }

  return (
    <button className={cls} {...rest} onClick={click}>
      {text || props.children}
    </button>
  )
}