const { ethers } = require('hardhat')
const { expect } = require('chai')

describe('ERC721WithRoyalties', function () {
  let erc721
  beforeEach(async () => {
    ;[contractOwner, seller1, seller2, buyer1, buyer2] = await ethers.getSigners()

    const ERC721 = await hre.ethers.getContractFactory('ERC721ContractWideRoyalties')
    erc721 = await ERC721.deploy('ERC721Royalties', 'ERC721')
    await erc721.deployed()
    const contractAddress = erc721.address
    console.log('nft deployed to: ', contractAddress)
  })

  it('Should set the owner of the contract as contractOwner', async function () {
    expect(await erc721.owner()).to.equal(contractOwner.address)
  })
})
