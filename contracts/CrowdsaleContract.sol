//SPDX-License-Identifier: Unlicense
// Adapted from https://github.com/vittominacori/erc1363-payable-token/blob/master/contracts/examples/ERC1363PayableCrowdsale.sol

pragma solidity ^0.8.0;

import 'hardhat/console.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import 'erc-payable-token/contracts/payment/ERC1363Payable.sol';

contract CrowdsaleContract is ERC1363Payable, ReentrancyGuard {
  using SafeERC20 for IERC20;

  // The token being sold
  IERC20 private _token;

  // Address where funds are collected
  address private _wallet;

  // How many token units a buyer gets per ERC1363 token
  uint private _rate;

  // Amount of ERC1363 token raised
  uint private _tokenRaised;

  /**
   * Event for token purchase logging
   * @param operator who called function
   * @param beneficiary who got the tokens
   * @param value ERC1363 tokens paid for purchase
   * @param amount amount of tokens purchased
   */
  event TokensPurchased(address indexed operator, address indexed beneficiary, uint value, uint amount);

  constructor(
    uint rate_,
    address wallet_,
    IERC20 token_,
    IERC1363 acceptedToken_
  ) ERC1363Payable(acceptedToken_) {
    require(rate_ > 0);
    require(wallet_ != address(0));
    require(address(token_) != address(0));

    _rate = rate_;
    _wallet = wallet_;
    _token = token_;
  }

  function token() public view returns (IERC20) {
    return _token;
  }

  function wallet() public view returns (address) {
    return _wallet;
  }

  function rate() public view returns (uint) {
    return _rate;
  }

  function tokenRaised() public view returns (uint) {
    return _tokenRaised;
  }

  function _transferReceived(
    address operator,
    address sender,
    uint amount,
    bytes memory data
  ) internal override {
    _buyTokens(operator, sender, amount, data);
  }

  function _approvalReceived(
    address sender,
    uint amount,
    bytes memory data
  ) internal override {
    IERC20(acceptedToken()).transferFrom(sender, address(this), amount);
    _buyTokens(sender, sender, amount, data);
  }

  function _buyTokens(
    address operator,
    address sender,
    uint amount,
    bytes memory data
  ) internal nonReentrant {
    uint sentTokenAmount = amount;
    _preValidatePurchase(sentTokenAmount);

    // calculate token amount to be created
    uint tokens = _getTokenAmount(sentTokenAmount);

    // update state
    _tokenRaised += sentTokenAmount;

    _processPurchase(sender, tokens);
    emit TokensPurchased(operator, sender, sentTokenAmount, tokens);

    _updatePurchasingState(sender, sentTokenAmount, data);

    _forwardFunds(sentTokenAmount);
    _postValidatePurchase(sender, sentTokenAmount);
  }

  function _preValidatePurchase(uint sentTokenAmount) internal pure {
    require(sentTokenAmount != 0);
  }

  function _postValidatePurchase(address beneficiary, uint sentTokenAmount) internal {
    // optional override
  }

  function _deliverTokens(address beneficiary, uint tokenAmount) internal {
    _token.safeTransfer(beneficiary, tokenAmount);
  }

  function _processPurchase(address beneficiary, uint tokenAmount) internal {
    _deliverTokens(beneficiary, tokenAmount);
  }

  function _updatePurchasingState(
    address beneficiary,
    uint sentTokenAmount,
    bytes memory data
  ) internal {
    // optional override
  }

  function _getTokenAmount(uint sentTokenAmount) internal view returns (uint) {
    return sentTokenAmount * _rate;
  }

  function _forwardFunds(uint sentTokenAmount) internal {
    IERC20(acceptedToken()).safeTransfer(_wallet, sentTokenAmount);
  }
}
