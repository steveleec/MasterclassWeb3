import { BigNumber, Contract, providers } from "ethers";

// BUSD
import busdTokenABI from "./abiBUSD";

// Ludik Token
import ludikTokenABI from "./abi";
var addressLudikToken = "0xac3136DF37237b4767AC4e4D97F9D07Ae5A5B7B9";
var addressBusdToken = "0xAEBff8F209a895b22B1F87714319B12C3d12ACf6";
var account, signer, provider, contractLudik, contractBUSD;

function createContractInstance() {
  // Connectar con contrato
  provider = new providers.Web3Provider(window.ethereum);
  contractLudik = new Contract(addressLudikToken, ludikTokenABI, provider);
  contractBUSD = new Contract(addressBusdToken, busdTokenABI, provider);
}

async function getContractInfo() {
  console.log(await contractLudik.name());
  console.log(await contractLudik.symbol());
}

function setUpListeners() {
  // Connectar a metamask
  var bttn = document.getElementById("connect");
  bttn.addEventListener("click", async function () {
    if (window.ethereum) {
      [account] = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(account);
      signer = provider.getSigner(account);
    }
  });

  // Approve button
  var bttn = document.getElementById("approveButton");
  bttn.addEventListener("click", async function () {
    var valInputBox = document.getElementById("approveAmount").value;
    var value = BigNumber.from(`${valInputBox}000000000000000000`);
    await contractBUSD.connect(signer).approve(addressLudikToken, value);
  });

  // Comprar Tokens Button
  var bttn = document.getElementById("purchaseButton");
  bttn.addEventListener("click", async function () {
    var valInputBox = document.getElementById("purchaseAmount").value;
    var value = BigNumber.from(`${valInputBox}000000000000000000`);
    var tx = await contractLudik.connect(signer).purchaseLudikTokens(value);
    console.log(tx);
  });
}

async function getComponent() {
  // Metamask
  createContractInstance();
  await getContractInfo();
  setUpListeners();
}

getComponent()
  .then()
  .catch((e) => console.log(e));
