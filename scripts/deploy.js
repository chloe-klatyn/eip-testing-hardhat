const hre = require('hardhat')

async function main() {
  const ERC721 = await hre.ethers.getContractFactory('ERC721ContractWideRoyalties')
  const erc721 = await ERC721.deploy('ERC721Royalties', 'ERC721')

  await erc721.deployed()

  console.log('ERC721 deployed to:', erc721.address)
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
