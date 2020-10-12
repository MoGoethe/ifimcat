import React, { Fragment } from "react";
import { Container } from "../../components/container";
import { Navigation } from "../../modules/navigation";
import { SearchResult } from "../../modules/searchResult";
import { Footer } from "../../modules/footer";

function SearchPage(props) {

  return (
    <Fragment>
      <Container className="navigation-container">
        <Navigation />
      </Container>
      <SearchResult rowProps={{ gutter: [12, 28] }} />
      <Container>
        <Footer style={{ borderTop: 0 }} />
      </Container>
    </Fragment>
  )
};

export default SearchPage;