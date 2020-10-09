import React from "react";
import classnames from "classnames";
import {
  Row,
  Col
} from "../../components/grid";
import {
  SORTRULES,
  PICTURECOUNT
} from "../../config";
import "./index.scss";

export function ArticleProfile(props) {
  const {
    data
  } = props;
  if (!data) {
    return null
  }
  return (
    <div className="if-articleProfile">
      <div className="if-articleProfile-img">
        <img src={`/assets/illustrations/illu-${data.id % PICTURECOUNT}.jpg`} alt="" />
      </div>
      <div className="if-articleProfile-tags">
        {
          (data.tags || []).map((tag, index) => (
            <a href={`/tag/${tag.key}`} className="if-articleProfile-tag" key={`if-articleProfile-tag--${index}`}>
              {tag.name}
            </a>
          ))
        }
      </div>
      <h3 className="if-articleProfile__title"><a href={`/article/${data.key}`}>{data.title}</a></h3>
    </div>
  )
}

export function ArticleList(props) { 

  const {
    className,
    data = [],
    rowProps = {},
    ...rest
  } = props;

  const cls = classnames("if-articleList p-t-8n p-b-8n", className);

  return (
    <div className={cls} {...rest}>
      <Row {...rowProps}>
        {
          data.map((article, index) => {
            return (
              <Col colSpan={SORTRULES[index % SORTRULES.length]} key={`if-articleList--${index}`}>
                <ArticleProfile data={article} />
              </Col>
            )
          })
        }
      </Row>
    </div>
  )
};