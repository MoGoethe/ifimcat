import React, { Fragment } from "react";
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
import {
  tags,
  articles,
} from "../../mock";

function CategoryPage(props) {

  return (
    <Fragment>
      <Container className="classify-page">
        <Navigation />
        <ClassifyScreen data={tags[0]} />
      </Container>
      <Container className="p-b-12n">
        <Row gutter={[32, 0]} className="p-t-8n p-b-8n">
          <Col colSpan={18}>
            <ClassifyList data={articles} />
          </Col>
          <Col colSpan={6}>
            <Sticky top={24}>
              <ClassifyProfile data={tags[0]} />
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