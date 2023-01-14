import Web3 from "web3";

export default async function contractDeploy(nodeUrl, ownerAddress, privateKey, contractObject) {
  const web3 = new Web3(nodeUrl);
  web3.eth.accounts.wallet.add(privateKey);

  const gasEstimate = await web3.eth.estimateGas({
    data: contractObject.bytecode
  });
  console.log('gas', gasEstimate)


  const contract = new web3.eth.Contract(contractObject.abi);
  const deploy = contract.deploy({ data: contractObject.bytecode });
  const deployment = await deploy.send({
    from: ownerAddress,
    gas: 1500000
  });

  console.log(`Deployed contract at: ${deployment.address}`);
}