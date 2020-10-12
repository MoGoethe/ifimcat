import React from "react";
import classnames from "classnames";
import "./index.scss";

export function TagList(props) {

  const {
    data=[],
    className,
    ...rest
  } = props;

  const cls = classnames("if-tagList", className);

  return (
    <div className={cls} {...rest}>
      <div className="if-tagList-list">
        {
          data.map((tag, index) => (
            <a href={`/tag/${tag.key}`} key={tag.key} className="if-tagList__tag">{tag.name}</a>
          ))
        }
      </div>
    </div>
  )
}