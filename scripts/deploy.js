const hre = require('hardhat')

async function main() {
  const ERC1363 = await hre.ethers.getContractFactory('ERC1363')
  const erc1363 = await ERC1363.deploy('ERC1363Token', 'ERC1363')
  await erc1363.deployed()

  console.log('ERC1363 token deployed to:', erc1363.address)
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

runMain()
