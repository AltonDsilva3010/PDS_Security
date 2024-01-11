const ProductContract = artifacts.require("ProductContract");

let contractA = artifacts.require("FarmerContract");
module.exports = function (deployer) {
 deployer.deploy(ProductContract , contractA.address);
};