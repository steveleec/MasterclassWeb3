require("dotenv").config();

const { expect } = require("chai");
const { Contract } = require("ethers");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  var owner, alice;
  var busdAddress;
  var LudikToken;
  var ludikToken;
  var provider;
  var BusdToken;
  var busdToken;
  var amountString = "100" + "000000000000000000";
  var busdAmount = ethers.BigNumber.from(amountString);

  it("Should return the new greeting once it's changed", async function () {
    [owner, alice] = await ethers.getSigners();
    if (!alice) alice = owner;
    console.log(owner.address, alice.address);

    // Deploying BUSD
    BusdToken = await hre.ethers.getContractFactory("BusdToken");
    busdToken = await BusdToken.deploy();
    await busdToken.deployed();

    // Acuñando a favor de Alice
    await busdToken.connect(owner).mint(alice.address, busdAmount);

    // Deploying Ludik Token
    LudikToken = await hre.ethers.getContractFactory("LudikToken");
    ludikToken = await LudikToken.deploy(busdToken.address);
    await ludikToken.deployed();

    console.log("LudikToken deployed to:", ludikToken.address);
  });

  it("Should return the new greeting once it's changed", async function () {
    var balance = await busdToken.balanceOf(alice.address);

    await busdToken.connect(alice).approve(ludikToken.address, busdAmount);
    await ludikToken.connect(alice).purchaseLudikTokens(busdAmount);

    var balance = await busdToken.balanceOf(alice.address);
    expect(balance.toString()).equal("0");

    var balance = await busdToken.balanceOf(ludikToken.address);
    expect(balance.toString()).equal(amountString);
  });
});
