const { TezosToolkit } = require('@taquito/taquito');
const { importKey } = require('@taquito/signer');
require('dotenv').config();

async function main() {
  const Tezos = new TezosToolkit(process.env.DATAHUB_URL);
 
  console.log(`Importing account ${process.env.PKH}`);
  
  importKey(
    Tezos,
    process.env.EMAIL,
    process.env.PASSWORD,
    process.env.MM,
    process.env.SECRET
  ).catch((error) => {
    console.log(JSON.stringify(error, null, 2))
  })
}

main();