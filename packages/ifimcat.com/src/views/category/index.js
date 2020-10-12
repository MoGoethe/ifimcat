import React, { Fragment, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Container } from "../../components/container";
import {
  Row,
  Col
} from "../../components/grid";
import { Sticky } from "../../components/sticky";
import { Navigation } from "../../modules/navigation";
import { ClassifyScreen } from "../../modules/classifyScreen";
import { ClassifyList } from "../../modules/classifyList";
import { ClassifyProfile } from "../../modules/classifyProfile";
import { Footer } from "../../modules/footer";
import { LoadingBar } from "../../components/loading";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Q_CATEGORY, M_CATEGORY } from "../../queries";

function CategoryPage() {
  const params = useParams();
  const { data = {}, loading } = useQuery(Q_CATEGORY, {
    variables: { key: params.key}
  });

  const [updateData] = useMutation(M_CATEGORY, {
    variables: {
      data: {
        id: data.getCategory?.id,
        glance: data.getCategory?.glance + 1,
      }
    }
  });

  useEffect(() => {
    const timer = setTimeout(updateData, 5000);
    return () => {
      clearTimeout(timer);
    }
  }, [updateData])


  if (loading) {
    return <LoadingBar />
  }

  return (
    <Fragment>
      <Container className="classify-page">
        <Navigation />
        <ClassifyScreen data={data.getCategory} />
      </Container>
      <Container className="p-b-12n">
        <Row gutter={[32, 0]} className="p-t-8n p-b-8n">
          <Col colSpan={18}>
            <ClassifyList data={data.getCategory?.blogs} />
          </Col>
          <Col colSpan={6}>
            <Sticky top={24}>
              <ClassifyProfile data={data.getCategory} />
            </Sticky>
          </Col>
        </Row>
      </Container>
      <Container>
        <Footer />
      </Container>
    </Fragment>
  )
};

export default CategoryPage;