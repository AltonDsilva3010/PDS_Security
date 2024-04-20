// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.19;
import "@openzeppelin/contracts/access/AccessControl.sol";

contract FarmerContract is AccessControl{
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant FARMER_ROLE = keccak256("FARMER_ROLE");
    uint apmcscount;
    uint productscount;
    address owner;
    // MyContract myContract = new MyContract();
    constructor() payable {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); // Set the contract deployer as the default admin
        _grantRole(ADMIN_ROLE, msg.sender);
        owner = msg.sender;
        apmcscount = 0;
        productscount = 0;
    }

    //Unique commodities fixed in Frontend

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
        string tplicence;
        uint256 msp;
        uint apmcid;
        address curowner;
        address buyer;
        bool sold ;
        bool quality;
    }
    mapping(address => productDetails[]) public farmerProducts;
    address[] public farmerAddresses; //All farmers
    uint256 public farmerCount;
    address[] public farmerRequests;
    APMC[] public apmcs;
    productDetails[] public allProducts;
    function addOfficial(address _adminacc) public onlyRole(ADMIN_ROLE){
        grantRole(ADMIN_ROLE, _adminacc);
    }
    
    function canAccessResource(address user) public view onlyRole(ADMIN_ROLE) returns (bool) {
        return hasRole(ADMIN_ROLE, user);
    }

    function farmerRegistration(
        address _addressvar
    ) public {
        farmerCount++;
        farmerRequests.push(_addressvar);
    }

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

    function addProduct( string memory _name , uint256 quantity , string memory _unit , string memory _img ,string memory _tplic,uint apmcid, uint256 msp) public payable onlyRole(FARMER_ROLE){
        require(apmcid <= apmcscount,"APMC Doesnt exist");
        
        productDetails  memory newProduct = productDetails({
            productId: productscount,
            commodityName : _name,
            quantity : quantity,
            unit : _unit ,
            image : _img ,
            tplicence: _tplic,
            msp: msp, //From frontend fixed
            apmcid: apmcid,
            sold : false,
            curowner: msg.sender,
            buyer: address(0),
            quality: false
        });
            farmerProducts[msg.sender].push(newProduct);
            allProducts.push(newProduct);
            productscount++;    
        }


    function getFarmerProducts(address _addressvar) public view returns(productDetails[] memory){
        return farmerProducts[_addressvar];
    }
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

    function getFarmers() public view returns (address[] memory) {
        return farmerAddresses;
    }

    function getFarmersRequests() public view returns (address[] memory) {
        return farmerRequests;
    }

    function getAllFarmerProducts() public view returns(productDetails[] memory){
        return allProducts;
    }

    function getAllAPMC() public view returns(APMC[] memory){
        return apmcs;
    }

    function getAProduct(uint productId) public view returns(productDetails memory){
        return allProducts[productId];
    }

    function getProductsinAPMC(uint apmcid) public view returns(productDetails[] memory){
         productDetails[] memory result;

    // Iterate through all products
    for (uint i = 0; i < allProducts.length; i++) {
        // Check if the product belongs to the specified APMC ID
        if (allProducts[i].apmcid == apmcid) {
            // Increase the size of the result array by 1 and add the product
            result = new productDetails[](result.length + 1);
            result[result.length - 1] = allProducts[i];
        }
    }

    return result;
    }

    function inspectFoodSafety(uint productId) public payable{
        require(productId <= allProducts.length, "Invalid product ID");
        allProducts[productId].quality = true;
    }

    function buyProduct(uint productId) public payable {
    require(productId <= allProducts.length, "Invalid product ID");
    require(allProducts[productId].sold == false, "Product is already sold");

    // Calculate the total price to be paid
    uint totalPrice = allProducts[productId].msp;
    require(msg.value >= totalPrice, "Insufficient funds");

    // Mark the product as sold
    allProducts[productId].sold = true;
    allProducts[productId].curowner = msg.sender;

    // Transfer the amount to the farmer
    payable(allProducts[productId].curowner).transfer(totalPrice);
}

    function sellFoodtoDistri(address distri,uint productId) public payable{
        require(productId <= allProducts.length, "Invalid product ID");
        uint totalPrice = allProducts[productId].msp * allProducts[productId].quantity;
        require(msg.value >= totalPrice, "Insufficient funds");
        
        allProducts[productId].curowner = distri;
        payable(msg.sender).transfer(totalPrice);
    }

}