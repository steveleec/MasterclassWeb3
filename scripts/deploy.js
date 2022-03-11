// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const LudikToken = await hre.ethers.getContractFactory("LudikToken");
  const ludikToken = await LudikToken.deploy();

  var tx = await ludikToken.deployed();
  console.log("LudikToken deployed to:", ludikToken.address);
  // console.log("Waiting for confirmations");
  // await tx.deployTransaction.wait(5);
  return;
  try {
    await hre.run("verify:verify", {
      address: ludikToken.address,
      constructorArguments: [],
    });
  } catch (error) {
    console.error("Error veryfing contract", error);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
