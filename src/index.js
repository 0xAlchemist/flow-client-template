import React, { useState, useEffect } from "react";
import regeneratorRuntime from "regenerator-runtime";
import ReactDOM from "react-dom";
import fcl from "./flow/config";
import * as t from "@onflow/types";

import { SignIn } from "./components/SignIn";
import App from "./App";

// pass objects to window context
window.fcl = fcl;
window.types = t;

const runGetLatestBlock = async () => {
  const response = await fcl.send([
    fcl.script`
    pub fun main(): UInt64 {
      return getCurrentBlock().height
    }
  `,
  ]);

  const blockData = await fcl.decode(response);
  console.log({ blockData });
};

window.runGetLatestBlock = runGetLatestBlock;

// conversion method for window context
window.convertToHex = function (str) {
  return Buffer.from(str, "UTF-8").reduce(
    (output, elem) => output + ("0" + elem.toString(16).slice(-2)),
    ""
  );
};

// test contract address
// window.TEST_CONTRACT_ADDRESS = "0x01cf0e2f2f715450";

const AppContainer = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fcl.currentUser().subscribe((user) => {
      if (user.loggedIn) setLoggedIn(true);
      else setLoggedIn(false);
    });
  }, []);

  return <div>{!loggedIn ? <SignIn /> : <App />}</div>;
};

ReactDOM.render(<AppContainer />, document.getElementById("react-app"));
