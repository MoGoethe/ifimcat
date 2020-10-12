import React from "react";
import "./index.scss";

export function Sticky(props) {

  const {
    style = {},
    top = 0,
    ...rest
  } = props;

  const styles = { ...style };
  if (top !== undefined) {
    styles.top = top + 'px';
  }

  return (
    <div className="if-sticky" style={styles} {...rest}>
      {props.children}
    </div>
  )
}