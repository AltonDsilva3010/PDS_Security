const Auction = artifacts.require("FarmerContract");

contract("FarmerContract", async accounts => {

 let auction;
 const ownerAccount = accounts[0];
 const userAccountOne = accounts[1];
 const userAccountTwo = accounts[2];
 const amount = 5000000000000000000; // 5 ETH
 const smallAmount = 3000000000000000000; // 3 ETH

 beforeEach(async () => {
   auction = await Auction.new({from: ownerAccount});
 })
})