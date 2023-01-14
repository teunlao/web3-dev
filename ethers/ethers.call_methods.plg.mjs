import { ethers } from "ethers";
import fs from "fs";

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");

//0x610178da211fef7d417bc0e6fed39f05609ad788

provider.listAccounts().then((accounts) => {
  console.log(accounts[0]);
});

const signer = new ethers.Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider);

const contract = new ethers.Contract('0x610178da211fef7d417bc0e6fed39f05609ad788', JSON.parse(fs.readFileSync('HelloWorld.abi')), signer)


await contract.setMessage(12, {
  gasLimit: 50000,
})

const message = await contract.getMessage()

console.log('message', parseInt(message, 10));
