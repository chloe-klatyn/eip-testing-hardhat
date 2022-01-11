const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('ERC1363', function () {
  beforeEach(async () => {
    ;[contractOwner, seller1, seller2, buyer1, buyer2] = await ethers.getSigners()

    const ERC1363 = await hre.ethers.getContractFactory('ERC1363')
    const erc1363 = await ERC1363.deploy('ERC1363Token', 'ERC1363')
    await erc1363.deployed()
  })

  describe('Deployment', () => {
    it('has a name', async () => {
      expect(await erc1363.name()).to.equal('ERC1363Token')
    })

    it('has a symbol', async () => {
      expect(await erc1363.symbol()).to.equal('ERC1363')
    })

    it('Should set the owner of the contract as contractOwner', async () => {
      expect(await erc1363.owner()).to.equal(contractOwner.address)
    })
  })
})
