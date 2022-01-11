//SPDX-License-Identifier: Unlicense
// Adapted from https://github.com/dievardump/EIP2981-implementation

pragma solidity ^0.8.4;

import 'hardhat/console.sol';
import './ERC2981.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract ERC721ContractWideRoyalties is ERC721, ERC2981, Ownable {
  uint nextTokenId;

  constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {}

  /// @inheritdoc	ERC165
  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC2981) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  /// @notice Allows to set the royalties on the contract
  /// @dev This function in a real contract should be protected with a onlyOwner (or equivalent) modifier
  /// @param recipient the royalties recipient
  /// @param value royalties value (between 0 and 10000)
  function setRoyalties(address recipient, uint value) public {
    _setRoyalties(recipient, value);
  }

  /// @notice Mint one token to `to`
  /// @param to the recipient of the token
  function mint(address to) external {
    uint tokenId = nextTokenId;
    _safeMint(to, tokenId, '');

    nextTokenId = tokenId + 1;
  }

  /// @notice Mint several tokens at once
  /// @param recipients an array of recipients for each token
  function mintBatch(address[] memory recipients) external {
    uint tokenId = nextTokenId;
    for (uint i; i < recipients.length; i++) {
      _safeMint(recipients[i], tokenId, '');
      tokenId++;
    }

    nextTokenId = tokenId;
  }
}
