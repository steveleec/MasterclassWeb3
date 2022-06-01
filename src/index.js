import { BigNumber, Contract, providers, ethers } from "ethers";

window.ethers = ethers;

import {
  getContract,
  getAllGameInformation,
  getInformationByRank,
  getPriceInPcuy,
} from "pachacuy-info";

import {
  init,
  approveBusd,
  allowance,
  // purchase
  purchaseGuineaPigWithPcuy,
  purchaseLandWithPcuy,
  purchasePachaPassWithPcuy,
  // get NFT data
  getGuineaPigWithUuid,
  getPachaWithUuid,
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
  // tatacuy
  signTatacuyTxAndVerify,
  finishTatacuyCampaign,
  startTatacuyCampaign,
  // wiracocha
  mintWiracocha,
  signWiracochaTxAndReceivePcuy,
  // rps
  playRockPaperScissors,
  updateFoodPriceAtChakra,
  // misay wasi
  startMisayWasiRaffle,
  purchaseMisayWasi,
  purchaseTicketFromMisayWasi,
  // qhatu wasi
  purchaseQhatuWasi,
  startQhatuWasiCampaign,
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
    await purchaseGuineaPigWithPcuy(value, signer);
  });

  var bttn = document.getElementById("purchaseGuineaLndButton");
  bttn.addEventListener("click", async function () {
    var value = document.getElementById("purchaseGuineaLnd").value;
    console.log("click", value);
    await purchaseLandWithPcuy(value, signer);
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
    var data = await getGuineaPigWithUuid(value);
    console.log(data);
  });

  var bttn = document.getElementById("landDataButton");
  bttn.addEventListener("click", async function () {
    var value = document.getElementById("landData").value;
    var landData = await getPachaWithUuid(value);
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

  var bttn = document.getElementById("MintTatacuy");
  bttn.addEventListener("click", async function () {
    var value = document.getElementById("mintTatacuyId").value;
    var res = await mintTatacuy(signer, value);
    console.log(res);
  });

  var bttn = document.getElementById("MintWiracocha");
  bttn.addEventListener("click", async function () {
    var value = document.getElementById("mintWiracochaId").value;
    var res = await mintWiracocha(signer, value);
    console.log(res);
  });

  var bttn = document.getElementById("SignTatacuy");
  bttn.addEventListener("click", async function () {
    var guineaPigUuid = document.getElementById("signTatacuy0").value;
    var likelihood = document.getElementById("signTatacuy1").value;
    var tatacuyUuid = document.getElementById("signTatacuy2").value;
    var timpestampFront = document.getElementById("signTatacuy3").value;
    /**
     * _signer: SignerData,
    _guineaPigUuid: number,
    _likelihood: number,
    _timeStampFront: number,
    _tatacuyUuid: number,
     */
    var res = await signTatacuyTxAndVerify(
      signer,
      guineaPigUuid,
      likelihood,
      timpestampFront,
      tatacuyUuid
    );
    console.log(res);
  });

  var bttn = document.getElementById("SignWiracocha");
  bttn.addEventListener("click", async function () {
    /**
     * _signer: SignerData,
     * _guineaPigUuid: number,
     * _samiPoints: number,
     * _pachaUuid: number,
     * _timeStampFront: number,
     * _wiracochaUuid: number
     */
    var guineaPigUuid = document.getElementById("signWiracocha0").value;
    var samiPoints = document.getElementById("signWiracocha1").value;
    var timestampFront = document.getElementById("signWiracocha2").value;
    var pachaUuid = document.getElementById("signWiracocha3").value;
    var wiracochaUuid = document.getElementById("signWiracocha4").value;
    var res = await signWiracochaTxAndReceivePcuy(
      signer,
      guineaPigUuid,
      samiPoints,
      pachaUuid,
      timestampFront,
      wiracochaUuid
    );
    console.log(res);
  });

  var bttn = document.getElementById("StartTatacuyC");
  bttn.addEventListener("click", async function () {
    var tatacuyUuid = document.getElementById("startttc2").value;
    var totalFunds = document.getElementById("startttc3").value;
    var prizePerWinner = document.getElementById("startttc4").value;
    var res = await startTatacuyCampaign(
      signer,
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

  var bttn = document.getElementById("RPS");
  bttn.addEventListener("click", async function () {
    var op1 = document.getElementById("rps1").value;
    var op2 = document.getElementById("rps2").value;
    var res = await playRockPaperScissors(op1, op2);
    console.log(res);
  });

  var bttn = document.getElementById("GetPriceid");
  bttn.addEventListener("click", async function () {
    var type = document.getElementById("getPrice").value;
    var res = await getPriceInPcuy(type);
    console.log(res.toString());
  });

  var bttn = document.getElementById("purchaseMisayWasi");
  bttn.addEventListener("click", async function () {
    var price = document.getElementById("purchaseMisayWasiId").value;
    var res = await purchaseMisayWasi(signer, price);
    console.log(res);
  });

  /**
   * _signer: Signer,
   * _misayWasiUuid: number,
   * _rafflePrize: number,
   * _ticketPrice: number,
   * _campaignEndDate: number,
   */
  var bttn = document.getElementById("startMisayW");
  bttn.addEventListener("click", async function () {
    var mswsUuid = document.getElementById("startMisayWId").value;
    var prize = document.getElementById("startMisayWId2").value;
    var ticketPrice = document.getElementById("startMisayWId3").value;
    var endDate = document.getElementById("startMisayWId4").value;
    var res = await startMisayWasiRaffle(
      signer,
      mswsUuid,
      prize,
      ticketPrice,
      endDate
    );
    console.log(res);
  });

  var bttn = document.getElementById("purchaseTicketMisayWasi");
  bttn.addEventListener("click", async function () {
    var mswsUuid = document.getElementById("ticketMSWS").value;
    var tickets = document.getElementById("ticketMSWS2").value;
    var res = await purchaseTicketFromMisayWasi(signer, mswsUuid, tickets);
    console.log(res);
  });

  var bttn = document.getElementById("purchaseQhatuWasi");
  bttn.addEventListener("click", async function () {
    var pachaUuid = document.getElementById("qhatuWasiId").value;
    var res = await purchaseQhatuWasi(signer, pachaUuid);
    console.log(res);
  });

  var bttn = document.getElementById("startQhatuWasiCampaign");
  bttn.addEventListener("click", async function () {
    var qhatuWasiUuid = document.getElementById("startQW1").value;
    var amountPcuy = document.getElementById("startQW2").value;
    var res = await startQhatuWasiCampaign(signer, qhatuWasiUuid, amountPcuy);
    console.log(res);
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
