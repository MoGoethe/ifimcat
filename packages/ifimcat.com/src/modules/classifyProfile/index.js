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
    }).join('');
  }
  name = name.toLocaleLowerCase();

  return (
    <div {...rest} className="if-classifyProfile">
      <div className="if-classifyProfile-info">
        <img src={`/assets/logos/${name}-rect.svg`} className="if-classifyProfile-info__img" alt={data.name} />
        <div className="if-classifyProfile-info__solgan">{data.slogan}</div>
      </div>
      <div className="if-classifyProfile-text p-b-4n">{data.subname}</div>
      <div className="if-classifyProfile-text">
        浏览次数 <br /> <span>{data.glance}</span>
      </div>
      <div className="if-classifyProfile-text">
        创建者 <br /> <span>{author && author.username}</span>
      </div>
      <div className="if-classifyProfile-text">
        联系方式 <br /> <span>{author && author.email}</span>
      </div>
    </div>
  )
}