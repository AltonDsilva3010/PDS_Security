// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.19;
import "@openzeppelin/contracts/access/AccessControl.sol";


/*
    this Farmer Contract . 
    this contract take 
    -- farmer details
    -- APMC details
    -- Product Details 
 */
contract FarmerContract is AccessControl{
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant FARMER_ROLE = keccak256("FARMER_ROLE");
    uint apmcscount;
    uint productscount;
    address owner;
    constructor() payable {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); 
        _grantRole(ADMIN_ROLE, msg.sender);
        owner = msg.sender;
        apmcscount = 0;
        productscount = 0;
    }


    struct APMC{
       uint apmcid;
       string apmcname;
       string addressloc;
       string state;
       string district;
       string[] commoditiestraded;
       uint contact;
    }

    struct productDetails {
        uint productId;
        string commodityName ;
        uint256 quantity ;
        string unit;
        string image;
        string tplic;
        uint apmcid;
        address curowner;
        uint highestBid;
        address highestBidder;
        uint auctionEndTime;
        bool quality;
    }

    struct bidDetails{
        uint productId;
        uint time;
        uint bid;
        address bidderAddress;
    }


    // mapping(address => productDetails[]) public farmerProducts;
    address[] public farmerAddresses; //All farmers address
    uint256 public farmerCount; // total farmers
    address[] public farmerRequests; // array of farmer who want to join this system
    APMC[] public apmcs; // array of all apmcs
    productDetails[] public allProducts; // array of all products
    bidDetails[] public allBids; 
    mapping(uint => bool) public bidsDone;

    // function for adding Official 
    function addOfficial(address _adminacc) public onlyRole(ADMIN_ROLE){
        grantRole(ADMIN_ROLE, _adminacc);
    }
    
    function farmerRegistration(
        address _addressvar
    ) public {
        farmerCount++;
        farmerRequests.push(_addressvar);
    }

    // function that add APMC to apmcs array 
    function addAPMC(
        string memory _apmcname,
        string memory _addressloc,
        string memory _state,
        string memory _district,
        string[] memory _commoditiestraded,
        uint _contact
    ) public onlyRole(ADMIN_ROLE){
        uint apmcid = ++apmcscount;
        APMC memory newAPMC = APMC(apmcid,_apmcname,_addressloc,_state, _district, _commoditiestraded, _contact);
        apmcs.push(newAPMC);
    }


    // function that add product into allProducts array 
    function addProduct(
    string memory _name,
    uint256 _quantity,
    string memory _unit,
    string memory _img,
    string memory _tplic,
    uint256 _apmcid
) public payable onlyRole(FARMER_ROLE) {
    require(_apmcid <= apmcscount, "APMC doesn't exist");

    // Calculate auction end time
    // uint256 auctionEndTime = block.timestamp + (_durationMinutes * 60);

    productDetails memory newProduct = productDetails({
        productId: productscount,
        commodityName: _name,
        quantity: _quantity,
        unit: _unit,
        image: _img,
        tplic: _tplic,
        apmcid: _apmcid,
        curowner: msg.sender,
        highestBid: 0,
        highestBidder: address(0),
        auctionEndTime: 0,
        quality: false
        
    });

    // Add the new product to the mappings and lists
    // farmerProducts[msg.sender].push(newProduct);
    allProducts.push(newProduct);

    // Increment the product count
    productscount++;
}


// function that start auction 
function startAuction(uint _auctionEndTime,uint productId) public {

    require(allProducts[productId].curowner == msg.sender ,"You're not the owner");// check for whether product owner start bid or not
    require(allProducts[productId].quality == true,"Quality Not Verified"); // bid cannot be started without quality check
    // uint256 auctionEndTime = block.timestamp + (_durationMinutes * 60);
    bidsDone[productId] = false;
    allProducts[productId].auctionEndTime = _auctionEndTime;
}


    // function getFarmerProducts(address _addressvar) public view returns(productDetails[] memory){
    //     return farmerProducts[_addressvar];
    // }

    function grantRoleToFarmer(address _farmer) public onlyRole(ADMIN_ROLE) {

    // Remove the address from the farmerRequests array.
    for (uint256 i = 0; i < farmerRequests.length; i++) {
        if (farmerRequests[i] == _farmer) {
            farmerRequests[i] = farmerRequests[farmerRequests.length - 1]; //swap the one at the very end with the i'th
            farmerRequests.pop();
            break;
        }
    }

    // Grant the FARMER_ROLE to the address.
    grantRole(FARMER_ROLE, _farmer);

    // Add the address to the farmerAddresses array.
    farmerAddresses.push(_farmer);
    }

    // return list of all farmer address who is using this application
    function getFarmers() public view returns (address[] memory) {
        return farmerAddresses;
    }

    // return list of all farmer address who want to join this application
    function getFarmersRequests() public view returns (address[] memory) {
        return farmerRequests;
    }

    // return product array 
    function getAllFarmerProducts() public view returns(productDetails[] memory){
        return allProducts;
    }

    // return all apmc details
    function getAllAPMC() public view returns(APMC[] memory){
        return apmcs;
    }

    // return specific product from product array having id = productId
    function getAProduct(uint productId) public view returns(productDetails memory){
        return allProducts[productId];
    }

    // return all product belong to particular APMC 
    function getProductsinAPMC(uint apmcid) public view returns(product Details[] memory){
    productDetails[] memory result;

    for (uint i = 0; i < allProducts.length; i++) {
        if (allProducts[i].apmcid == apmcid) {
            result = new productDetails[](result.length + 1);
            result[result.length - 1] = allProducts[i];
        }
    }

    return result;
    }

    // return all bids that are present in this app
    function getAllBids() public view returns(bidDetails[] memory){
        return allBids;
    }

    // checking for all product quality
    function inspectFoodSafety(uint productId) public payable{
        require(productId <= allProducts.length, "Invalid product ID");
        allProducts[productId].quality = true;
    }

    //user place bid for particular product
    function placeBid(uint productId) public payable {
    require(productId <= allProducts.length, "Invalid product ID"); 
    require(block.timestamp < allProducts[productId].auctionEndTime, "Auction has ended"); // cannot place bid after bid is ended
    require(msg.value > allProducts[productId].highestBid, "Value is lower than highest bid"); // bid pirce cannot be lesser than highest bid

    if (allProducts[productId].highestBidder != address(0)) {
            // Refund the previous highest bidder
            payable(allProducts[productId].highestBidder).transfer(allProducts[productId].highestBid);
        }

    allProducts[productId].highestBidder = msg.sender;
    allProducts[productId].highestBid = msg.value;
    bidDetails memory newBid = bidDetails({
        productId: productId,
        time: block.timestamp,
        bid: msg.value,
        bidderAddress: msg.sender
    });
    allBids.push(newBid);
}


// Function called after Auction is Ended
function endAuction(uint256 productId) public{

        require(allProducts[productId].curowner == msg.sender ,"You're not the owner");// only product owner allowed to end auction
        require(allProducts[productId].quality == true,"Quality Not Verified"); 
        require(block.timestamp >= allProducts[productId].auctionEndTime, "Auction has not ended yet");// auction should not end before auctionEndTime
        require(productId <= allProducts.length, "Invalid product ID");
        bidsDone[productId] = true;
        payable(allProducts[productId].curowner).transfer(allProducts[productId].highestBid);// made payment to owner after bids are successfully placed
    }

// Function : farmer buy produt at MSP 
function buyAtMSP(uint productId) public payable{
    require(block.timestamp >= allProducts[productId].auctionEndTime, "Auction has not ended yet"); 
    require(allProducts[productId].highestBid == 0, "Cannot buy at MSP"); 
    allProducts[productId].highestBidder = msg.sender;
    allProducts[productId].highestBid = msg.value;
    bidDetails memory newBid = bidDetails({
        productId: productId,
        time: block.timestamp,
        bid: msg.value,
        bidderAddress: msg.sender
    });
    allBids.push(newBid);
}

}