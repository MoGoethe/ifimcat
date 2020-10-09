import React, { Fragment } from "react";
import {
  Row,
  Col
} from "../../components/grid";
import { Sticky } from "../../components/sticky";
import { ArticleProfile } from "../articleList";
import { markdownParser, dateTimeFormate } from '../../utils/tools';
import {
  PICTURECOUNT
} from "../../config";
import { useQuery } from '@apollo/react-hooks';
import { Q_CATEGORY } from "../../queries";
import "./index.scss";

export function ArticleDetail(props) {

  const {
    article = {},
  } = props;

  const { data } = useQuery(Q_CATEGORY, {
    variables: { key: article.category.key }
  });

  return (
    <Fragment>
      <Row className="m-t-8n">
        <Col colSpan={24}>
          <div className="if-articleDetail-head">
            <img src={`/assets/illustrations/illu-${article.id % PICTURECOUNT}.jpg`} className="if-articleDetail__img" alt={article.title} />
            <h1 className="if-articleDetail__title">{article.title}</h1>
          </div>
        </Col>
      </Row>
      <Row gutter={[32, 0]} className="p-t-12n">
        <Col colSpan={18}>
          <div className="if-articleDetail" id="article-detail">
            <div
              className="if-articleDetail-main"
              dangerouslySetInnerHTML={{ __html: markdownParser.render(article.body || '') }}
            />
          </div>
        </Col>
        <Col colSpan={6}>
          <Sticky top={24}>
            <div className="if-articleDetail-info">
              <div className="if-articleDetail__text">
                AUTHOR <br /> <span>{article.author.username}</span>
              </div>
              <div className="if-articleDetail__text">
                CREATED AT <br /> <span>{dateTimeFormate(article.createAt, 'yyyy-MM-dd hh:mm:ss')}</span>
              </div>
              <div className="if-articleDetail__text">
                AWESOME <br /> <span>
                  <span className="if-articleDetail__action if-articleDetail__action-awesome">
                    {article.awesome}
                  </span>
                </span>
              </div>
              <div className="if-articleDetail__text">
                GLANCE <br /> <span>
                  <span className="if-articleDetail__action if-articleDetail__action-glance">
                    {article.glance}
                  </span>
                </span>
              </div>
              <div className="if-articleDetail__text">
                TAGS <br /> <span>{
                  article.tags.map((tag, index) => (
                    <a href={`/tag/${tag.key}`} key={`tag--${index}`} className="if-articleDetail__link">{tag.name}</a>
                  ))
                }</span>
              </div>
              {
                article.topic && (
                  <div className="if-articleDetail__text">
                    TOPIC <br /> <span>
                      <a href={`/topic/${article.topic.key}`} className="if-articleDetail__link">{article.topic.name}</a>
                    </span>
                  </div>
                )
              }
            </div>
          </Sticky>
        </Col>
      </Row>
      <Row gutter={[24, 0]} className="m-t-20n">
        <Col colSpan={24}>
          <div className="if-articleDetail-related">Read also </div>
        </Col>
        <Col colSpan={8}>
          <ArticleProfile data={data?.getCategory?.blogs[0]} />
        </Col>
        <Col colSpan={8}>
          <ArticleProfile data={data?.getCategory?.blogs[1]} />
        </Col>
        <Col colSpan={8}>
          <ArticleProfile data={data?.getCategory?.blogs[2]} />
        </Col>
      </Row>
    </Fragment>
  )
}
