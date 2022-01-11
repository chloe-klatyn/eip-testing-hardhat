const { ethers } = require('hardhat')
const { expect } = require('chai')

describe('ERC721WithRoyalties', () => {
  let erc721
  beforeEach(async () => {
    ;[contractOwner, seller1, seller2, buyer1, buyer2] = await ethers.getSigners()

    const ERC721 = await hre.ethers.getContractFactory('ERC721ContractWideRoyalties')
    erc721 = await ERC721.deploy('ERC721Royalties', 'ERC721')
    await erc721.deployed()
    const contractAddress = erc721.address
  })

  describe('Deployment', () => {
    it('has a name', async () => {
      expect(await erc721.name()).to.equal('ERC721Royalties')
    })

    it('has a symbol', async () => {
      expect(await erc721.symbol()).to.equal('ERC721')
    })

    it('Should set the owner of the contract as contractOwner', async () => {
      expect(await erc721.owner()).to.equal(contractOwner.address)
    })
  })

  // describe('Minting', () => {
  //   it('mints the correct amount of tokens to seller', async () => {})
  //   it('transfers nft to buyer when purchase is made', async () => {})
  // })
})
