import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS, INFURA_GOERLI_ENDPOINT, QUIKNODE_RINKEBY_QUICKNODE } from '../../configs/nodes.mjs';
import { MAIN_ADDRESS, MAIN_ADDRESS_PRIVATE_KEY, ETH_ADDRESS_2 } from '../../configs/creds.js';

const web3 = new Web3(QUIKNODE_RINKEBY_QUICKNODE);
web3.eth.accounts.wallet.add(MAIN_ADDRESS_PRIVATE_KEY);

const createAccount = () => {
// Generate a new Ethereum account
  const account = web3.eth.accounts.create();

  console.log(`Ethereum address: ${account.address}`);
  console.log(`Private key: ${account.privateKey}`);
}

// createAccount()

const getBalance = (address) => {
  web3.eth.getBalance(address, (error, balance) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Balance: ${balance} Wei`);
      const etherBalance = web3.utils.fromWei(balance, 'ether');
      console.log(`Balance: ${etherBalance} Ether`);
    }
  });
}


getBalance('0xfd329b2aee05DD34637E9580869e0cedf96Bd543')


const sendTransaction = () => {

  const amount = '0.2'
  // Set the private key for signing transactions

// Create the transaction object
  const transaction = {
    from: web3.eth.accounts.wallet[0].address,
    to: '0x8a093882518B6ec04358CB11Df1E48f2Ff29c9D8',
    value: web3.utils.toWei(amount, 'ether'),
    gas: 21000
  };

// Send the transaction
  web3.eth.sendTransaction(transaction)
    .then((receipt) => {
      console.log(`Transaction receipt: ${receipt.transactionHash}`);
    })
    .catch((error) => {
      console.error(error);
    });
}

// sendTransaction()

const estimateGas = () => {
// Create the transaction object
  const transaction = {
    from: web3.eth.accounts.wallet[0].address,
    to: ETH_ADDRESS_2,
    value: web3.utils.toWei('0.01', 'ether')
  };

// Estimate the gas required for the transaction
  web3.eth.estimateGas(transaction)
    .then((gasEstimate) => {
      console.log(`Estimated gas: ${gasEstimate}`);
    })
    .catch((error) => {
      console.error(error);
    });
}

// estimateGas()

const iterateWithContract = async () => {

// Create the contract object
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  const data = await contract.methods.retrieve().call()

  console.log('defaultAccount', contract.defaultAccount);
  console.log(data);
}

// iterateWithContract()