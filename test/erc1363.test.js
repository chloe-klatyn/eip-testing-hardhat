const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('ERC1363', function () {
  let crowdsaleToken
  let erc1363

  beforeEach(async () => {
    ;[contractOwner, crowdsaleWallet] = await ethers.getSigners()

    const ERC1363 = await hre.ethers.getContractFactory('ERC1363Mock')
    erc1363 = await ERC1363.deploy('ERC1363Token', 'ERC1363', contractOwner.address, 10000)
    await erc1363.deployed()

    const CrowdsaleToken = await hre.ethers.getContractFactory('CrowdsaleToken')
    crowdsaleToken = await CrowdsaleToken.deploy(10000)
    await crowdsaleToken.deployed()

    const CrowdsaleContract = await hre.ethers.getContractFactory('CrowdsaleContract')
    const crowdsaleContract = await CrowdsaleContract.deploy(
      10,
      crowdsaleWallet.address,
      crowdsaleToken.address,
      erc1363.address
    )
    await crowdsaleContract.deployed()
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
