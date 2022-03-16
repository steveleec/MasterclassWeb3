import { BigNumber, Contract, providers } from "ethers";

import busdTokenAbi from "./abiBUSD";
import abi from "./abi";

var addressLudikToken = "0xF3e5633F426c87b20c02fc32F1b72812603FE92F";
var addressBusdToken = "0xAE078F6E349B6C033A39fD5947f83b1A78A0eC41";
var provider, account, contractLudik, contractBUSD, signer;

function createContractIntance() {
  provider = new providers.Web3Provider(window.ethereum);
  contractLudik = new Contract(addressLudikToken, abi, provider);
  contractBUSD = new Contract(addressBusdToken, busdTokenAbi, provider);
}

async function getContractInfo() {
  console.log("Nombre del token:", await contractLudik.name());
  console.log("Símbolo del SC:", await contractLudik.symbol());
}

function setUpListeners() {
  var bttn = document.getElementById("connect");
  bttn.addEventListener("click", async function () {
    if (window.ethereum) {
      [account] = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Billetera metamask", account);
      signer = provider.getSigner(account);
    }
  });

  var bttn = document.getElementById("approveButton");
  bttn.addEventListener("click", async function () {
    var valorCajaTexto = document.getElementById("approveAmount").value;
    var value = BigNumber.from(`${valorCajaTexto}000000000000000000`);
    await contractBUSD.connect(signer).approve(addressLudikToken, value);
  });

  var bttn = document.getElementById("purchaseButton");
  bttn.addEventListener("click", async function () {
    var valorCajaTexto = document.getElementById("purchaseAmount").value;
    var value = BigNumber.from(`${valorCajaTexto}000000000000000000`);
    console.log(signer);
    var tx = await contractLudik.connect(signer).purchaseTokensWithBUSD(value);
    console.log(tx);
  });
}

function setUpEventListener() {
  contractLudik.on("Transfer", (from, to, amount) =>
    console.log(from, to, amount)
  );
}

async function setUp() {
  createContractIntance();
  await getContractInfo();
  setUpListeners();
  setUpEventListener();
}

setUp()
  .then()
  .catch((e) => console.log(e));
