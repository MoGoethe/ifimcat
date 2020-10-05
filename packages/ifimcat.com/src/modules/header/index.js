import React from "react";
import classNames from "classnames";
import "./index.scss";

function Header(props) {

  const {
    className,
    ...rest,
  } = props;
  const cls = classNames("if-header", className);

  return (
    <div className={cls} {...rest}>
      home1
    </div>
  )
};

export default Header;