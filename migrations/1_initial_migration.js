const Auction = artifacts.require("FarmerContract");

module.exports = function (deployer) {
 deployer.deploy(Auction);
};