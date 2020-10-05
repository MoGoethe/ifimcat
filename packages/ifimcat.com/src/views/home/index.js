import React, { Fragment } from "react";
import { Container } from "../../components/container";
import {
  Row,
  Col
} from "../../components/grid";
import { Sticky } from "../../components/sticky";
import { LoadingBar } from "../../components/loading";
import { Module } from "../../modules/module";
import { Navigation } from "../../modules/navigation";
import { Footer } from "../../modules/footer";
import { Banner } from "../../modules/banner";
import { ArticleList } from "../../modules/articleList";
import { TagList } from "../../modules/tagList";
import { TopicList } from "../../modules/topicList";
import { useQuery } from '@apollo/react-hooks';
import { Q_HOME } from "../../queries"
import {
  carouselData,
  articles,
  tags,
  topics
} from "../../mock";

function Home(props) {
  const { data, loading } = useQuery(Q_HOME);
  console.log(data)

  return (
    <Fragment>
      {loading && <LoadingBar />}
      <Container className="navigation-container">
        <Navigation />
      </Container>
      <Container className="p-b-12n">
        <Row gutter={[32, 0]}>
          <Col colSpan={18}>
            <ArticleList data={articles} rowProps={{gutter:[12, 28]}} />
          </Col>
          <Col colSpan={6}>
            <Sticky top={24} style={{paddingBottom: "48px"}}>
              <Module title="标签" className="m-t-8n">
                <TagList data={tags} />
              </Module>
              <Module title="专题" className="m-t-12n">
                <TopicList data={topics} />
              </Module>
            </Sticky>
          </Col>
        </Row>
      </Container>
      <Container fullScreen={true}>
        <Banner data={carouselData} height={440} action={true} dots={true} dealy={8000} />
      </Container>
      <Container>
        <Footer />
      </Container>
    </Fragment>
  )
};

export default Home;