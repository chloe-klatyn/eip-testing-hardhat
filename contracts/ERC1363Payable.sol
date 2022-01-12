//SPDX-License-Identifier: Unlicense
// Adapted from https://github.com/vittominacori/erc1363-payable-token/blob/master/contracts/examples/ERC1363PayableCrowdsale.sol
pragma solidity ^0.8.0;

import 'hardhat/console.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import 'erc-payable-token/contracts/payment/ERC1363Payable.sol';

contract Receiver is ERC1363Payable {
  using SafeERC20 for IERC20;

  // The ERC1363 token accepted
  IERC1363 private _acceptedToken;

  constructor(IERC1363 acceptedToken_) ERC1363Payable(acceptedToken_) {
    require(address(acceptedToken_) != address(0), 'ERC1363Payable: acceptedToken is zero address');
    require(acceptedToken_.supportsInterface(type(IERC1363).interfaceId));

    _acceptedToken = acceptedToken_;
  }
}
