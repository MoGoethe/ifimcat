import React from "react";
import classnames from "classnames";
import "./index.scss";

export function TopicList(props) {

  const {
    data=[],
    className,
    ...rest
  } = props;

  const cls = classnames("if-topicList", className);

  return (
    <div className={cls} {...rest}>
      <div className="if-topicList-list">
        {
          data.map((tag, index) => (
            <a href={`/topic/${tag.key}`} key={tag.key} className="if-topicList__topic">{tag.name}</a>
          ))
        }
      </div>
    </div>
  )
}