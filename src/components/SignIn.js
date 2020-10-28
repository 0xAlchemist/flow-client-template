import React from "react";
import { Hero, Container, Heading, Button } from "react-bulma-components";

import fcl from "../flow/config";

const runGetLatestBlock = async () => {
  const response = await fcl.send([
    fcl.script`
      pub fun main(): UInt64 {
        return getLatestBlock().height
      }
    `,
  ]);

  setBlockData(await fcl.decode(response));
  console.log({ blockData });
};

window.fcl;
window.runGetLatestBlock = runGetLatestBlock;

export const SignIn = () => (
  <Hero color="primary" size="fullheight">
    <Hero.Body className="has-text-centered">
      <Container>
        <Heading>0xAlchemist's</Heading>
        <Heading subtitle size={3}>
          Flow Lab
        </Heading>
        <Button onClick={fcl.authenticate}>Sign In / Sign Up</Button>
      </Container>
    </Hero.Body>
  </Hero>
);
