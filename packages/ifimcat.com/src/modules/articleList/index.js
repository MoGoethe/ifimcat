import React from "react";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
  if (!data) {
    return null
  }
  return (
    <div className="if-articleProfile">
      <a className="if-articleProfile-img" href={`/article/${data.key}`}>
        <img src={`/assets/illustrations/illu-${data.id % PICTURECOUNT}.jpg`} alt="" />
      </a>
      <div className="if-articleProfile-tags">
        {
          (data.tags || []).map((tag, index) => (
            <span
              onClick={() => history.push(`/tag/${tag.key}`)}
              className="if-articleProfile-tag"
              key={`if-articleProfile-tag--${index}`}>
              {tag.name}
            </span>
          ))
        }
      </div>
      <h3 className="if-articleProfile__title">
        <a href={`/article/${data.key}`}>{data.title}</a>
      </h3>
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