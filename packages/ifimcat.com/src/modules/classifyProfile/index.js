import React from "react";
import pinyin from "pinyin";
import "./index.scss";

export function ClassifyProfile(props) {

  const {
    data = {},
    ...rest
  } = props;

  const { author } = data;
  const regexp = /^[\u4e00-\u9fa5]/ig;
  let name = data.name || '';
  if (regexp.test(data.name)) {
    name = pinyin(data.name, {
      style: pinyin.STYLE_NORMAL
    }).join('').toLocaleLowerCase();
  }

  return (
    <div {...rest} className="if-classifyProfile">
      <div className="if-classifyProfile-info">
        <img src={`/assets/logos/${name}.svg`} className="if-classifyProfile-info__img" alt={data.name} />
        <div className="if-classifyProfile-info__name">{data.name}</div>
      </div>
      <div className="if-classifyProfile-text p-b-4n">{data.subname}</div>
      <div className="if-classifyProfile-text">
        FOLLOWERS <br /> <span>{data.glance}</span>
      </div>
      <div className="if-classifyProfile-text">
        CREATOR <br /> <span>{author && author.username}</span>
      </div>
      <div className="if-classifyProfile-text">
        EMAIL <br /> <span>{author && author.email}</span>
      </div>
    </div>
  )
}