const hre = require("hardhat");

async function main() {
  // Dolar digital acuñado a nuestro favor
  const BUSDToken = await hre.ethers.getContractFactory("BUSDToken");
  const bUSDToken = await BUSDToken.deploy();
  await bUSDToken.deployed();
  console.log("BUSD deployed to:", bUSDToken.address);

  // Nuestro token creado
  const LudikToken = await hre.ethers.getContractFactory("LudikToken");
  const ludikToken = await LudikToken.deploy(bUSDToken.address);
  await ludikToken.deployed();

  console.log("LudikToken deployed to:", ludikToken.address);

  try {
    await hre.run("verify:verify", {
      address: ludikToken.address,
      constructorArguments: [bUSDToken.address],
    });
  } catch (error) {
    console.error("Error veryfing contract", error);
  }

  try {
    await hre.run("verify:verify", {
      address: bUSDToken.address,
      constructorArguments: [],
    });
  } catch (error) {
    console.error("Error veryfing contract", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
