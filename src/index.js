import React, { useState, useEffect } from "react";
import regeneratorRuntime from "regenerator-runtime";
import ReactDOM from "react-dom";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import { SignIn } from "./components/SignIn";
import App from "./App";

// pass objects to window context
window.fcl = fcl;
window.types = t;

// conversion method for window context
window.convertToHex = function (str) {
  return Buffer.from(str, "UTF-8").reduce(
    (output, elem) => output + ("0" + elem.toString(16).slice(-2)),
    ""
  );
};

// test contract address
window.TEST_CONTRACT_ADDRESS = "0x01cf0e2f2f715450";

fcl
  .config()
  // EMULATOR SETUP
  .put("accessNode.api", "http://localhost:8080")
  .put("challenge.handshake", "http://localhost:8701/flow/authenticate");

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
