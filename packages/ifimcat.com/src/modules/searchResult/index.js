import React, { Fragment } from "react";
import { useHistory } from 'react-router-dom';
import { ListEmpty } from "../../components/listEmpty";
import { Container } from "../../components/container";
import {
  Row,
  Col
} from "../../components/grid";
import { FullButton } from "../../components/fullButton";
import { ArticleProfile } from "../articleList";
import { LoadingBar } from "../../components/loading";
import { useQuery } from '@apollo/react-hooks';
import { Q_SEARCH } from "../../queries";
import "./index.scss";

export function SearchResult(props) {
  const history = useHistory();
  const keywords = history.location.search.split("?keywords=")[1]
  const { rowProps } = props;

  const { data = {}, loading } = useQuery(Q_SEARCH, {
    variables: { keywords }
  });

  if (loading) {
    return <LoadingBar />
  }

  return (
    <Fragment>
      <Container>
        <div className="if-searchResult p-t-8n p-b-12n">
          <div className="if-searchResult__keywords m-b-4n">Search results for: <span>{keywords}</span></div>
          <Row {...rowProps}>
            {
              !data?.getBlogByKeywords.length && <ListEmpty
                title="Nothing found"
                description="Sorry, but nothing matched your search terms. Please try again with some different keywords."
              />
            }
            {
              data?.getBlogByKeywords.map((article, index) => (
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
