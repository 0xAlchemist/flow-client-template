import React from "react";

import { Hero, Container, Heading } from "react-bulma-components";

import "./App.scss";

const App = () => (
  <Hero color="primary" size="fullheight">
    <Hero.Body className="has-text-centered">
      <Container>
        <Heading>0xAlchemist's</Heading>
        <Heading subtitle size={3}>
          Wicked Cool React Boilerplate
        </Heading>
      </Container>
    </Hero.Body>
  </Hero>
);

export default App;
