const { TezosToolkit } = require('@taquito/taquito');
const { importKey } = require('@taquito/signer');
require('dotenv').config();

async function main() {
  const Tezos = new TezosToolkit(process.env.DATAHUB_URL);
  
  // 1. Import the Faucet Key
  importKey(
    Tezos,
    process.env.EMAIL,
    process.env.PASSWORD,
    process.env.MM,
    process.env.SECRET
  ).then(async () => {
    // Replace with deployed contract address :
    return Tezos.contract.at('....')
  }).then((contract) => {
    console.log(`Incrementing storage value by 7`);
    return contract.methods.increment(7).send();
  }).then((operation) => {
    console.log(`Awaiting confirmation of ${operation.hash}`);
    return operation.confirmation(3).then(() => operation.hash);
  }).then((hash) => {
    console.log(`Operation injected: https://florence.tzstats.com/${hash}`)
  }).catch((error) => {
    console.log(`Error: ${JSON.stringify(error, null, 2)}`)
  });
}

main();