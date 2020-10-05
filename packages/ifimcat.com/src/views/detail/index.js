import React, { Fragment } from "react";
import { Container } from "../../components/container";
import { Navigation } from "../../modules/navigation";
import { ArticleDetail } from "../../modules/articleDetail";
import { Accept } from "../../modules/accept";
import { Footer } from "../../modules/footer";
import {
  ArticleDetailEN
} from "../../mock"

function ArtcileDetailPage(props) {

  return (
    <Fragment>
      <Container className="navigation-container">
        <Navigation />
      </Container>
      <Container className="p-b-20n">
        <ArticleDetail article={ArticleDetailEN} />
      </Container>
      <Container fullScreen={true}>
        <Accept />
      </Container>
      <Container>
        <Footer style={{borderTop: 0}} />
      </Container>
    </Fragment>
  )
};

export default ArtcileDetailPage;