import { ethers } from "ethers";
import compileContract from "../scripts/compile-contract.mjs";
import fs from "fs";

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");

provider.listAccounts().then((accounts) => {
    console.log(accounts[0]);
});

const signer = new ethers.Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider);

const contract = await compileContract('HelloWorld')

const contractFactory = new ethers.ContractFactory(contract.abi, contract.evm.bytecode.object, signer);

const contractInstance = await contractFactory.deploy(5);

fs.writeFileSync('HelloWorld.abi', JSON.stringify(contract.abi))
fs.writeFileSync('HelloWorld.bin', contract.evm.bytecode.object)
