import React, { Fragment } from "react";
import { Container } from "../../components/container";
import { Navigation } from "../../modules/navigation";
import { Footer } from "../../modules/footer";
import { Break500 } from "../../modules/breaks";

function Page500(props) {

  return (
    <Fragment>
      <Container className="navigation-container">
        <Navigation />
      </Container>
      <Container>
        <Break500 />
        <Footer />
      </Container>
    </Fragment>
  )
};

export default Page500;