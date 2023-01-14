import solc from 'solc';
import fs from 'fs';

const compileContract = async (name) => {
  const sourceCode = fs.readFileSync(`contracts/${name}.sol`, 'utf8');

  const solcInput = {
    language: 'Solidity',
    sources: {
      contract: {
        content: sourceCode,
      },
    },
    settings: {
      optimizer: {
        enabled: true,
      },
      outputSelection: {
        '*': {
          '*': ['abi', 'evm.bytecode', 'evm.gasEstimates'],
        },
      },
    },
  };

  let result = undefined;

  // getting the development snapshot
  await new Promise((resolve, reject) => {
    solc.loadRemoteVersion('latest', async (err, solcSnapshot) => {
      console.log('starting compilation');
      if (err) {
        console.log('error', err);
      } else {
        result = JSON.parse(solcSnapshot.compile(JSON.stringify(solcInput))).contracts.contract[name]

        resolve(result);
      }
    });
  })

  console.log('result', result);

  return result;
};

export default compileContract