// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract HelloWorld {
	uint public message;

	constructor(uint _message) {
		message = _message;
	}

	function getMessage() public view returns (uint) {
		return message;
	}

	function setMessage(uint _message) public {
		message = _message;
	}
}	