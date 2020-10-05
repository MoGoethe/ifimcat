import React, { Fragment } from "react";
import { Container } from "../../components/container";
import { Navigation } from "../../modules/navigation";
import { Footer } from "../../modules/footer";
import { Break404 } from "../../modules/breaks";

function Page404(props) {

  return (
    <Fragment>
      <Container className="navigation-container">
        <Navigation />
      </Container>
      <Container>
        <Break404 />
        <Footer />
      </Container>
    </Fragment>
  )
};

export default Page404;