import { BigNumber, Contract, providers } from "ethers";

import {
  approveBusd,
  allowance,
  init,
  purchaseGuineaPigWithBusd,
  purchaseLandWithBusd,
  getListOfNftsPerAccount,
  getGuineaPigData,
  getLandData,
  balanceOf,
  totalSupply,
  tokenURI,
  getWalletData,
} from "pachacuy-sc";

var provider, account, signer;

function setUpListeners() {
  var bttn = document.getElementById("connect");
  bttn.addEventListener("click", async function () {
    if (window.ethereum) {
      [account] = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Billetera metamask", account);

      provider = new providers.Web3Provider(window.ethereum);
      signer = provider.getSigner(account);
    }
  });

  var bttn = document.getElementById("allowanceButton");
  bttn.addEventListener("click", async function () {
    var wallet = document.getElementById("allowanceAmount").value;
    var _allowance = await allowance(wallet);
    console.log(_allowance.toString());
  });

  var bttn = document.getElementById("approveButton");
  bttn.addEventListener("click", async function () {
    var valorCajaTexto = document.getElementById("approveAmount").value;
    var value = BigNumber.from(`${valorCajaTexto}000000000000000000`);
    var tx = await approveBusd(value, signer);
    console.log("Approve terminado");
  });

  var bttn = document.getElementById("purchaseGuineaPigButton");
  bttn.addEventListener("click", async function () {
    var value = document.getElementById("purchaseGuineaPig").value;
    await purchaseGuineaPigWithBusd(value, signer);
  });

  var bttn = document.getElementById("purchaseGuineaLndButton");
  bttn.addEventListener("click", async function () {
    var value = document.getElementById("purchaseGuineaLnd").value;
    console.log("click", value);
    await purchaseLandWithBusd(value, signer);
  });

  var bttn = document.getElementById("listOfNftButton");
  bttn.addEventListener("click", async function () {
    var value = document.getElementById("listOfNft").value;
    var list = await getListOfNftsPerAccount(value);
    console.log(list);
  });

  var bttn = document.getElementById("guineaPigDataButton");
  bttn.addEventListener("click", async function () {
    var value = document.getElementById("guineaPigData").value;
    var data = await getGuineaPigData(value);
    console.log(data);
  });

  var bttn = document.getElementById("landDataButton");
  bttn.addEventListener("click", async function () {
    var value = document.getElementById("landData").value;
    var landData = await getLandData(value);
    console.log(landData);
  });

  var bttn = document.getElementById("tokenURIButton");
  bttn.addEventListener("click", async function () {
    var value = document.getElementById("tokenURI").value;
    var uri = await tokenURI(value);
    console.log(uri);
  });

  var bttn = document.getElementById("walletDataButton");
  bttn.addEventListener("click", async function () {
    var value = document.getElementById("walletData").value;
    var walletData = await getWalletData(value);
    console.log(walletData);
  });

  var bttn = document.getElementById("balanceOfButton");
  bttn.addEventListener("click", async function () {
    var value1 = document.getElementById("balanceOf1").value;
    var value2 = document.getElementById("balanceOf2").value;
    var balance = await balanceOf(value1, value2);
    console.log(balance.toString());
  });
}

async function initSmartContracts() {
  // _account, price, _guineaPigId, _uuid, _raceAndGender
  // _account, price, _ix, custodianWallet
  var [NFT, PurhcaseContract] = await init(window.ethereum);
  PurhcaseContract.on(
    "GuineaPigPurchaseFinish",
    (_account, price, _guineaPigId, _uuid, _raceAndGender) => {
      console.log(" === GuineaPigPurchaseFinish ===");
      console.log("_account", _account);
      console.log("price", price.toString());
      console.log("_guineaPigId", _guineaPigId.toNumber());
      console.log("_uuid", _uuid.toString());
      console.log("_raceAndGender", _raceAndGender);
    }
  );

  PurhcaseContract.on(
    "GuineaPigPurchaseInit",
    (_account, price, _ix, custodianWallet) => {
      console.log(" === GuineaPigPurchaseInit ===");
      console.log("_account", _account);
      console.log("price", price.toString());
      console.log("_ix", _ix.toNumber());
      console.log("custodianWallet", custodianWallet);
    }
  );

  PurhcaseContract.on(
    "PurchaseLand",
    (_account, uuid, landPrice, _location, custodianWallet) => {
      console.log(" === PurchaseLand ===");
      console.log("_account", _account);
      console.log("uuid", uuid.toString());
      console.log("landPrice", landPrice.toString());
      console.log("_location", _location.toString());
      console.log("custodianWallet", custodianWallet);
    }
  );
}

async function setUp() {
  // init pachacuy-sc library
  setUpListeners();
  await initSmartContracts();
}

setUp()
  .then()
  .catch((e) => console.log(e));
