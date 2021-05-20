const { TezosToolkit } = require('@taquito/taquito');
const { importKey } = require('@taquito/signer');
require('dotenv').config();

async function main() {
  const Tezos = new TezosToolkit(process.env.DATAHUB_URL);
  
  const AMOUNT_TO_SEND = 2;
  const RECIPIENT = 'tz1RcXu53hCWKUU36hSG2y4fAaX8VwAfk2ku';
  
  importKey(
    Tezos,
    process.env.EMAIL,
    process.env.PASSWORD,
    process.env.MM,
    process.env.SECRET
  ).catch((error) => {
    console.log(JSON.stringify(error, null, 2))
  })
  
  console.log(`Transfering ${AMOUNT_TO_SEND} ꜩ to ${RECIPIENT}...`);
  Tezos.contract
    .transfer({ to: RECIPIENT, amount: AMOUNT_TO_SEND })
    .then((operation) => {
      console.log(`Waiting for ${operation.hash} to be confirmed...`);
      return operation.confirmation(1).then(() => operation.hash);
    })
    .then((hash) => console.log(`Operation injected: https://florence.tzstats.com/${hash} ...`))
    .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
}

main();

