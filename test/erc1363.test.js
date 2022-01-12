// adapted from: https://github.com/vittominacori/erc1363-payable-token/blob/master/test/examples/ERC1363PayableCrowdsale.behaviour.js

const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('ERC1363', function () {
  let crowdsaleToken
  let erc1363
  let crowdsaleContract

  beforeEach(async () => {
    ;[contractOwner, crowdsaleWallet, spender, recipient] = await ethers.getSigners()

    const ERC1363 = await hre.ethers.getContractFactory('ERC1363Mock')
    erc1363 = await ERC1363.deploy('ERC1363Token', 'ERC1363', contractOwner.address, 10000)
    await erc1363.deployed()

    const CrowdsaleToken = await hre.ethers.getContractFactory('CrowdsaleToken')
    crowdsaleToken = await CrowdsaleToken.deploy(10000)
    await crowdsaleToken.deployed()

    const CrowdsaleContract = await hre.ethers.getContractFactory('CrowdsaleContract')
    crowdsaleContract = await CrowdsaleContract.deploy(
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

    it('sets the owner of the contract as contractOwner', async () => {
      expect(await crowdsaleToken.owner()).to.equal(contractOwner.address)
    })

    it('mints initial supply of ERC20 tokens to contract deployer', async () => {
      expect((await crowdsaleToken.balanceOf(contractOwner.address)).toString()).to.equal('10000')
    })
  })

  describe('ERC1363 Deployment', () => {
    it('has a name', async () => {
      expect(await erc1363.name()).to.equal('ERC1363Token')
    })

    it('has a symbol', async () => {
      expect(await erc1363.symbol()).to.equal('ERC1363')
    })

    it('sets the owner of the contract as contractOwner', async () => {
      expect(await erc1363.owner()).to.equal(contractOwner.address)
    })

    it('mints initial supply of ERC1363 tokens to contract deployer', async () => {
      expect((await crowdsaleToken.balanceOf(contractOwner.address)).toString()).to.equal('10000')
    })
  })

  describe('Crowdsale Contract Deployment', () => {
    it('sets the owner of the contract as contractOwner', async () => {
      expect(await erc1363.owner()).to.equal(contractOwner.address)
    })

    it('sets the token to be distributed as the crowdsale token', async () => {
      expect(await crowdsaleContract.token()).to.equal(crowdsaleToken.address)
    })

    it('sets the accepted token as the ERC1363 token', async () => {
      expect(await crowdsaleContract.acceptedToken()).to.equal(erc1363.address)
    })

    it('sets the distribution rate to the value declared in the constructor', async () => {
      expect(await crowdsaleContract.rate()).to.equal(10)
    })
  })

  describe('receiving payment using transferAndCall', () => {
    it('should accept payments', async () => {})
    it('should log purchase event', async () => {})
    it('should assign tokens to sender', async () => {})
    it('should increase token raised', async () => {})
    it('should forward funds to wallet', async () => {})
    it('reverts on zero-valued payments', async () => {})
    it('reverts using a not accepted ERC1363', async () => {})
  })

  describe('receiving payment using transferFromAndCall', () => {
    it('should accept payments', async () => {})
    it('should log purchase event', async () => {})
    it('should assign tokens to sender', async () => {})
    it('should increase token raised', async () => {})
    it('should forward funds to wallet', async () => {})
    it('reverts on zero-valued payments', async () => {})
    it('reverts using a not accepted ERC1363', async () => {})
  })

  describe('receiving payment using approveAndCall', () => {
    it('should accept payments', async () => {})
    it('should log purchase event', async () => {})
    it('should assign tokens to sender', async () => {})
    it('should increase token raised', async () => {})
    it('should forward funds to wallet', async () => {})
    it('reverts on zero-valued payments', async () => {})
    it('reverts using a not accepted ERC1363', async () => {})
  })
})
