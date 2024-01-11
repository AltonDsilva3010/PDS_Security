const AutionStoreContract = artifacts.require("AuctionStore");

let contractA = artifacts.require("FarmerContract");
let contractB = artifacts.require("ProductContract");
module.exports = function (deployer) {
 deployer.deploy(AutionStoreContract , contractB.address ,contractA.address);
};