import { BigNumber, Contract, providers, ethers } from "ethers";

window.ethers = ethers;

import {
  initMarketplace,
  listNftsOfAccount,
  getListOfNftsForSale,
} from "pachacuy-marketplace";

import {
  getContract,
  getAllGameInformation,
  getInformationByRank,
} from "pachacuy-info";

import {
  init,
  approveBusd,
  allowance,
  // purchase
  purchaseGuineaPigWithBusd,
  purchaseGuineaPigWithPcuy,
  purchaseLandWithBusd,
  purchaseLandWithPcuy,
  purchasePachaPassWithPcuy,
  purchasePachaPassWithBusd,
  // get NFT data
  getGuineaPigData,
  getLandData,
  getPachaPassData,
  getWalletData,
  // helpers
  isGuineaPigAllowedInPacha,
  getListOfNftsPerAccount,
  balanceOf,
  totalSupply,
  tokenURI,
  signTatacuyTransaction,
  mintTatacuy,
  mintWiracocha,
  // tatacuy
  signTatacuyTxAndVerify,
  finishTatacuyCampaign,
  startTatacuyCampaign,
  // wiracocha
  signWiracochaTxAndReceivePcuy,
} from "pachacuy-sc";

var provider, account, signer;

const domain = {
  name: "My App",
  version: "1",
  chainId: 97,
  verifyingContract: "0x1111111111111111111111111111111111111111",
};

const types = {
  Mail: [
    { name: "from", type: "Person" },
    { name: "to", type: "Person" },
    { name: "content", type: "string" },
  ],
  Person: [
    { name: "name", type: "string" },
    { name: "wallet", type: "address" },
  ],
};

const mail = {
  from: {
    name: "Alice",
    wallet: "0x2111111111111111111111111111111111111111",
  },
  to: {
    name: "Bob",
    wallet: "0x3111111111111111111111111111111111111111",
  },
  content: "Hello!",
};

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
      window.signer = signer;
    }
  });

  var bttn = document.getElementById("allowanceButton");
  bttn.addEventListener("click", async function () {
    var wallet = document.getElementById("allowanceAmount").value;
    var _allowance = await allowance(wallet);
    console.log(_allowance.toString());

    var res = await signTatacuyTransaction(signer, "10", "lee");
    console.log(res);
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

  var bttn = document.getElementById("ListOfNftsButton");
  bttn.addEventListener("click", async function () {
    var value = document.getElementById("listOfNfts").value;
    var res = await listNftsOfAccount(value);
    console.log(res);
  });

  var bttn = document.getElementById("ListOfNftsForSale");
  bttn.addEventListener("click", async function () {
    var res = await getListOfNftsForSale();
    console.log(res);
  });

  var bttn = document.getElementById("MintTatacuy");
  bttn.addEventListener("click", async function () {
    var value = document.getElementById("mintTatacuyId").value;
    var res = await mintTatacuy(signer, value);
    console.log(res);
  });

  var bttn = document.getElementById("SignTatacuy");
  bttn.addEventListener("click", async function () {
    var guineaPigUuid = document.getElementById("signTatacuy0").value;
    var likelihood = document.getElementById("signTatacuy1").value;
    var pachaOwner = document.getElementById("signTatacuy2").value;
    var pachaUuid = document.getElementById("signTatacuy3").value;
    var res = await signTatacuyTxAndVerify(
      signer,
      guineaPigUuid,
      likelihood,
      pachaOwner,
      pachaUuid
    );
    console.log(res);
  });

  var bttn = document.getElementById("SignWiracocha");
  bttn.addEventListener("click", async function () {
    var guineaPigUuid = document.getElementById("signWiracocha0").value;
    var samiPoints = document.getElementById("signWiracocha1").value;
    var pachaOwner = document.getElementById("signWiracocha2").value;
    var pachaUuid = document.getElementById("signWiracocha3").value;
    var res = await signWiracochaTxAndReceivePcuy(
      signer,
      guineaPigUuid,
      samiPoints,
      pachaOwner,
      pachaUuid
    );
    console.log(res);
  });

  var bttn = document.getElementById("StartTatacuyC");
  bttn.addEventListener("click", async function () {
    var pachaUuid = document.getElementById("startttc1").value;
    var tatacuyUuid = document.getElementById("startttc2").value;
    var totalFunds = document.getElementById("startttc3").value;
    var prizePerWinner = document.getElementById("startttc4").value;
    var res = await startTatacuyCampaign(
      signer,
      pachaUuid,
      tatacuyUuid,
      totalFunds,
      prizePerWinner
    );
    console.log(res);
  });

  var bttn = document.getElementById("FinishTatacuyC");
  bttn.addEventListener("click", async function () {
    var pachaUuid = document.getElementById("finishttc").value;
    var { tatacuyOwner, totalSamiPoints, samiPointsClaimed, changeSamiPoints } =
      await finishTatacuyCampaign(signer, pachaUuid);
    console.log(tatacuyOwner);
    console.log(totalSamiPoints.toString());
    console.log(samiPointsClaimed.toString());
    console.log(changeSamiPoints.toString());
  });
}

async function initSmartContracts() {
  /**
    * return [
        nftpContract,
        pacContract,
        tataCuyContract,
        wiracochaContract,
        chakraContract,
        hatunWasiContract,
      ];
   */
  var [NFT, PurhcaseContract, TatacuyContract, WiracochaContract] = init(
    window.ethereum
  );
  console.log(WiracochaContract);
  WiracochaContract.on(
    "WiracochaExchange",
    (
      exchanger,
      pachaOwner,
      pachaUuid,
      amountPcuy,
      totalPcuyBalance,
      samiPoints,
      ratePcuyToSami
    ) => {
      console.log("exchanger", exchanger);
      console.log("pachaOwner", pachaOwner);
      console.log("pachaUuid", pachaUuid.toString());
      console.log("amountPcuy", amountPcuy.toString());
      console.log("totalPcuyBalance", totalPcuyBalance.toString());
      console.log("samiPoints", samiPoints.toString());
      console.log("ratePcuyToSami", ratePcuyToSami.toString());
    }
  );

  TatacuyContract.on(
    "TatacuyTryMyLuckResult",
    (
      account,
      hasWon,
      prizeWinner,
      likelihood,
      pachaUuid,
      tatacuyUuid,
      pachaOwner,
      idFromFront
    ) => {
      console.log("account", account);
      console.log("hasWon", hasWon);
      console.log("prizeWinner", prizeWinner);
      console.log("likelihood", likelihood);
      console.log("pachaUuid", pachaUuid);
      console.log("tatacuyUuid", tatacuyUuid);
      console.log("pachaOwner", pachaOwner);
      console.log("idFromFront", idFromFront);
    }
  );

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
  initSmartContracts();
  // init pachacuy-sc library
  await setUpListeners();
}

setUp()
  .then()
  .catch((e) => console.log(e));
