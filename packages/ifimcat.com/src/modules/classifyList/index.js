import React from "react";
import "./index.scss";

export function ClassifyList(props) {

  const {
    data = [],
    ...rest
  } = props;

  return (
    <div {...rest} className="if-classifyList">
      {
        data.map((article, index) => (
          <div className="if-classifyList-item" key={`if-classifyList--${index}`}>
            <div className="if-classifyList-left">
              <div className="if-classifyList-overview">
                <img src="https://dummyimage.com/240x240/CCC/aaa" alt={article.title} />
                {/* <img src={`/assets/picture/${data.id % PICTURECOUNT}`} alt={article.title} /> */}
              </div>
            </div>
            <div className="if-classifyList-right">
              <h4 className="if-classifyList__title" title={article.title}><a href={`/article/${article.key}`}>{article.title}</a></h4>
              <p className="if-classifyList-tags">
                {
                  article.tags.map((tag, i) => (
                    <a href={`/tag/${tag.key}`} key={`if-classifyList-tag--${i}`}>{tag.name}</a>
                  ))
                }
              </p>
              <p className="if-classifyList-info">
                <span className="if-classifyList__info if-classifyList__awesome">{article.awesome}</span>
                <span className="if-classifyList__info if-classifyList__glance">{article.glance}</span>
              </p>
            </div>
          </div>
        ))
      }
    </div>
  )
}