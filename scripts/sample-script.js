const hre = require("hardhat");

async function main() {
  const LudikToken = await hre.ethers.getContractFactory("LudikToken");
  const ludikToken = await LudikToken.deploy();
  var tx = await ludikToken.deployed();

  console.log("LudikToken deployed to:", ludikToken.address);
  console.log("Tx Hash", tx.hash);

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

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
