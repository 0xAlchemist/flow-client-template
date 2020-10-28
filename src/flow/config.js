import * as fcl from "@onflow/fcl";

// Setting up the Flow Client Library
// - Only testing mainnet for now
//
fcl
  .config()
  .put("accessNode.api", "https://flow-access-mainnet.portto.io") //https://access-001.mainnet1.nodes.onflow.org
  .put("challenge.handshake", "https://flow-wallet.blocto.app/authn");

export default fcl;
