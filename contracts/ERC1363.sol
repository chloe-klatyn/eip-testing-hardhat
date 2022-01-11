//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import 'hardhat/console.sol';
import 'erc-payable-token/contracts/token/ERC1363/ERC1363.sol';

contract MyToken is ERC1363 {
  constructor(string memory name, string memory symbol) ERC20(name, symbol) {
    console.log('msg sender', msg.sender);
  }

  // your stuff
}
