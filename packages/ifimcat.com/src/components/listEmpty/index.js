import React from "react";
import "./index.scss";

export function ListEmpty(props) {

  const {
    title,
    description
  } = props;

  return (
    <div className="if-listEmpty">
      <div className="if-listEmpty__title">{title}</div>
      <div className="if-listEmpty__description">{description}</div>
    </div>
  )
}