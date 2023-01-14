import Web3 from 'web3';
import { INFURA_GOERLI_ENDPOINT } from '../configs/nodes.mjs';
import {
  ABI_UNISWAP_EXCHANGE, BYTECODE_UNISWAP_EXCHANGE,
} from '../configs/UNISWAP_V1.mjs';
import { MAIN_ADDRESS, MAIN_ADDRESS_PRIVATE_KEY } from '../configs/creds.js';


const web3 = new Web3(INFURA_GOERLI_ENDPOINT);
web3.eth.accounts.wallet.add(MAIN_ADDRESS_PRIVATE_KEY);

const gasEstimate = await web3.eth.estimateGas({data: BYTECODE_UNISWAP_EXCHANGE});

console.log(gasEstimate);

// await web3.eth.personal.unlockAccount(ETH_ADDRESS_1, ETH_ADDRESS_1_PRIVATE_KEY, 600);

const contract = new web3.eth.Contract(ABI_UNISWAP_EXCHANGE);
const deploy = contract.deploy({data: BYTECODE_UNISWAP_EXCHANGE});
const deployment = await deploy.send({
  from: MAIN_ADDRESS,
  gas: gasEstimate
});

const deployedAddress = deployment.options.address;
console.log(`Deployed contract at: ${deployedAddress}`);