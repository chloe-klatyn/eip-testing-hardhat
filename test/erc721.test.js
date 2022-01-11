const { ethers } = require('hardhat')
const { expect } = require('chai')

describe('ERC721WithRoyalties', () => {
  let erc721
  beforeEach(async () => {
    ;[contractOwner, seller1, seller2, buyer1, buyer2] = await ethers.getSigners()

    const ERC721 = await hre.ethers.getContractFactory('ERC721ContractWideRoyalties')
    erc721 = await ERC721.deploy('ERC721Royalties', 'ERC721')
    await erc721.deployed()
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

  describe('Minting and Royalties', () => {
    it('mints the correct amount of tokens to seller', async () => {
      let tokenBalance = await erc721.balanceOf(seller1.address)
      await erc721.mint(seller1.address)
      await erc721.mint(seller1.address)

      newTokenBalance = await erc721.balanceOf(seller1.address)
      expect((newTokenBalance - tokenBalance).toString()).to.equal('2')
    })

    it('sets the correct tokenId for newly minted tokens', async () => {
      let txn = await erc721.mint(seller1.address)
      let token = await txn.wait()
      let tokenId = token.events[0].args[2]
      expect(tokenId.toString()).to.equal('0')

      txn = await erc721.mint(seller1.address)
      token = await txn.wait()
      tokenId = token.events[0].args[2]
      expect(tokenId.toString()).to.equal('1')

      txn = await erc721.mint(seller1.address)
      token = await txn.wait()
      tokenId = token.events[0].args[2]
      expect(tokenId.toString()).to.equal('2')
    })

    it('sets the correct value for default royalties', async () => {
      await erc721.setDefaultRoyalty(contractOwner.address, 500)
      royalties = await erc721.royaltyInfo(0, 100)
      // console.log('royalties: ', royalties[0])
      expect(royalties[0]).to.equal(contractOwner.address)
      expect(royalties[1].toString()).to.equal('5')
    })

    it('sets the correct value of royalty for specific tokens', async () => {})
    it('transfers NFT to buyer when purchase is made', async () => {})
    it('transfers royalty to contract owner when purchase is made', async () => {})
  })
})
