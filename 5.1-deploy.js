const { TezosToolkit } = require('@taquito/taquito');
const { importKey } = require('@taquito/signer');
const { RpcClient } = require('@taquito/rpc');
require('dotenv').config();

async function main() {
  const Tezos = new TezosToolkit(process.env.DATAHUB_URL);

  let CONTRACT_JSON = [ { "prim": "parameter",
    "args":
      [ { "prim": "or",
          "args":
            [ { "prim": "int", "annots": [ "%decrement" ] },
              { "prim": "int", "annots": [ "%increment" ] } ] } ] },
  { "prim": "storage", "args": [ { "prim": "int" } ] },
  { "prim": "code",
    "args":
      [ [ { "prim": "UNPAIR" },
          { "prim": "IF_LEFT",
            "args":
              [ [ { "prim": "SWAP" }, { "prim": "SUB" } ],
                [ { "prim": "ADD" } ] ] },
          { "prim": "NIL", "args": [ { "prim": "operation" } ] },
          { "prim": "PAIR" } ] ] } ]
          
  // 1. Deploy the contract
  importKey(
    Tezos,
    process.env.EMAIL,
    process.env.PASSWORD,
    process.env.MM,
    process.env.SECRET
  ).then(async () => {
    return Tezos.contract.originate({
      code: CONTRACT_JSON,
      storage: 0
    })
  }).then((operation) => {
    return operation.contract()
  }).then((contract) => {
    console.log(`Deployed at: ${contract.address}`);
  }).catch((error) => {
    console.log(`Error: ${JSON.stringify(error, null, 2)}`);
  });
}

main();