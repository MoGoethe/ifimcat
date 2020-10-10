import React from "react";
import pinyin from "pinyin";
import "./index.scss";

export function ClassifyScreen(props) {

  const {
    data={},
    ...rest
  } = props;
  const regexp = /^[\u4e00-\u9fa5]/ig;
  let name = data.name || '';
  if (regexp.test(data.name)) {
    name = pinyin(data.name, {
      style: pinyin.STYLE_NORMAL
    }).join('').toLocaleLowerCase();
  }
  return (
    <div className="if-classifyScreen" {...rest}>
      <div className="if-classifyScreen-left">
        <img src={`/assets/logos/${name}-rect.svg`} className="if-classifyScreen__icon" alt={data.name}/>
      </div>
      <div className="if-classifyScreen-right">
        <h3 className="if-classifyScreen__title">{data.name}</h3>
        <p className="if-classifyScreen__description">{data.description}</p>
      </div>
    </div>
  )
}