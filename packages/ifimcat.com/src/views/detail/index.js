import React, { Fragment } from "react";
import { useParams } from 'react-router-dom';
import { Container } from "../../components/container";
import { Navigation } from "../../modules/navigation";
import { ArticleDetail } from "../../modules/articleDetail";
import { Accept } from "../../modules/accept";
import { Footer } from "../../modules/footer";
import { LoadingBar } from "../../components/loading";
import { useQuery } from '@apollo/react-hooks';
import { Q_GETBLOGBYKEY } from "../../queries";

function ArtcileDetailPage(props) {
  const params = useParams();
  const { data = {}, loading } = useQuery(Q_GETBLOGBYKEY, {
    variables: { key: params.key }
  });


  if (loading) {
    return <LoadingBar />
  }

  return (
    <Fragment>
      <Container className="navigation-container">
        <Navigation />
      </Container>
      <Container className="p-b-20n">
        <ArticleDetail article={data.getBlogByKey} />
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