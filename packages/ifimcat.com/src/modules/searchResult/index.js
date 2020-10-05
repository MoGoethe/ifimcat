import React, { Fragment } from "react";
import { useHistory } from 'react-router-dom';
import { Container } from "../../components/container";
import {
  Row,
  Col
} from "../../components/grid";
import { FullButton } from "../../components/fullButton";
import { ArticleProfile } from "../articleList";
import "./index.scss";
import {
  articles
} from "../../mock";

export function SearchResult(props) {
  const history = useHistory();
  const keywords = history.location.search.split("?keywords=")[1]
  const { rowProps } = props;

  return (
    <Fragment>
      <Container>
        <div className="if-searchResult p-t-8n p-b-12n">
          <div className="if-searchResult__keywords m-b-4n">Search results for: <span>{keywords}</span></div>
          <Row {...rowProps}>
            {
              articles.map((article, index) => (
                <Col colSpan={8} key={`if-searchResult--${index}`}>
                  <ArticleProfile data={article} />
                </Col>
              ))
            }
          </Row>
        </div>
      </Container>
      <Container fullScreen={true}>
        <FullButton>Load More </FullButton>
      </Container>
    </Fragment>
    
  )
}
