import React from "react";
import "./index.scss";

export function ClassifyScreen(props) {

  const {
    data={},
    ...rest
  } = props;

  return (
    <div className="if-classifyScreen" {...rest}>
      <div className="if-classifyScreen-left">
        <img src={`/assets/graphql-icon.svg`} className="if-classifyScreen__icon" alt={data.name}/>
      </div>
      <div className="if-classifyScreen-right">
        <h3 className="if-classifyScreen__title">{data.name}</h3>
        <p className="if-classifyScreen__description">{data.description}</p>
      </div>
    </div>
  )
}