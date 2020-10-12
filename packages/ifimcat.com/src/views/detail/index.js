import React, { Fragment, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Container } from "../../components/container";
import { Navigation } from "../../modules/navigation";
import { ArticleDetail } from "../../modules/articleDetail";
import { Accept } from "../../modules/accept";
import { Footer } from "../../modules/footer";
import { LoadingBar } from "../../components/loading";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Q_GETBLOGBYKEY, M_ARTICLE } from "../../queries";

function ArtcileDetailPage(props) {
  const params = useParams();
  const { data = {}, loading } = useQuery(Q_GETBLOGBYKEY, {
    variables: { key: params.key }
  });

  const [updateData] = useMutation(M_ARTICLE, {
    variables: {
      data: {
        id: data.getBlogByKey?.id,
        glance: data.getBlogByKey?.glance + 1,
      }
    }
  });

  useEffect(() => {
    const timer = setTimeout(updateData, 10000);
    return () => {
      clearTimeout(timer);
    }
  }, [updateData])

  if (loading) {
    return <LoadingBar />
  }

  return (
    <Fragment>
      <Container>
        <Navigation />
      </Container>
      <Container className="p-b-20n" fullScreen={true}>
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