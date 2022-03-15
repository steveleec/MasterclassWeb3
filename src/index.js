import { BigNumber, Contract, providers } from "ethers";

// BUSD
import busdTokenABI from "./abiBUSD";

// Ludik Token
import ludikTokenABI from "./abi";
var addressLudikToken = "0x4E6E5451A55516168307Bd4F40197786c5eCcB4c";
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
  ethereum.on("accountsChanged", (accounts) => console.log(accounts));
  ethereum.on("connect", (connectInfo) => console.log(connectInfo));
  ethereum.on("chainChanged", (connectInfo) => console.log(connectInfo));

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

function setUpEventListeners() {
  contractLudik.on("Transfer", (from, to, amount) => {
    console.log(from, to, amount.toString());
  });
}

async function getComponent() {
  console.log("hello 6");
  // Metamask
  createContractInstance();
  await getContractInfo();
  setUpListeners();
  setUpEventListeners();
}

getComponent()
  .then()
  .catch((e) => console.log(e));
