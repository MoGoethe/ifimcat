import React, { Fragment } from "react";
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
import { useQuery } from '@apollo/react-hooks';
import { Q_TOPIC } from "../../queries";

function TopicPage() {
  const params = useParams();
  const { data = {}, loading } = useQuery(Q_TOPIC, {
    variables: { key: params.key }
  });

  if (loading) {
    return <LoadingBar />
  }

  return (
    <Fragment>
      <Container className="classify-page">
        <Navigation />
        <ClassifyScreen data={data.getTopic} />
      </Container>
      <Container className="p-b-12n">
        <Row gutter={[32, 0]} className="p-t-8n p-b-8n">
          <Col colSpan={18}>
            <ClassifyList data={data.getTopic?.blogs} />
          </Col>
          <Col colSpan={6}>
            <Sticky top={24}>
              <ClassifyProfile data={data.getTopic} />
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

export default TopicPage;