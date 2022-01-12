const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('ERC1363', function () {
  beforeEach(async () => {
    ;[contractsOwner, payableWallet] = await ethers.getSigners()

    const ERC1363 = await hre.ethers.getContractFactory('ERC1363Mock')
    const erc1363 = await ERC1363.deploy('ERC1363Token', 'ERC1363')
    await erc1363.deployed()

    const CrowdsaleToken = await hre.ethers.getContractFactory('CrowdsaleToken')
    const crowdsaleToken = await CrowdsaleToken.deploy()
    await crowdsaleToken.deploy()

    const ERC1363Payable = await hre.ethers.getContractFactory('ERC1363PayableCrowdsale')
    const erc1363Payable = await ERC1363Payable.deploy(10, payableWallet.address, crowdsaleToken.address, erc1363.address)
    await erc1363Payable.deployed()
  })
  describe('CrowdsaleToken Deployment', () => {
    it('has a name', async () => {
      expect(await crowdsaleToken.name()).to.equal('CrowdsaleToken')
    })

    it('has a symbol', async () => {
      expect(await crowdsaleToken.symbol()).to.equal('CRWD')
    })

    it('Should set the owner of the contract as contractOwner', async () => {
      expect(await crowdsaleToken.owner()).to.equal(contractOwner.address)
    })
  })

  describe('ERC1363 Deployment', () => {
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
