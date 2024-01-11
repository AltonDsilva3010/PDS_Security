// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;

import "./ProductContract.sol";
import "./FarmerContract.sol";

contract AuctionStore{
    ProductContract public productContract;
    FarmerContract public farmerContract;
    address public owner;
    uint locationscount;
    constructor(address _productContractAddress,address _farmerContractAddress) {
        owner = msg.sender;
        productContract = ProductContract(_productContractAddress);
        farmerContract = FarmerContract(_farmerContractAddress);
        locationscount = 0;
    }
    struct AuctionProduct {
        uint256 aucproductId;
        string name;
        string description;
        string category;
        string location;
        address productOwner;
        uint256 price;
        address buyer;
        bool isSold;
    }
    
    AuctionProduct[] public aucproducts;
    mapping(string => bool) private locationExists;
    string[] public locations;
    
    // Modifier that checks if the sender has the FARMER_ROLE in FarmerContract
    modifier onlyFarmerRole() {
        require(farmerContract.hasRole(farmerContract.FARMER_ROLE(), msg.sender), "Not authorized");
        _;
    }

    modifier onlyAdmin() {
        require(farmerContract.hasRole(farmerContract.ADMIN_ROLE(), msg.sender), "Not authorized as an admin");
        _;
    }

    event ProductPurchased(uint256 indexed productId, address indexed buyer, uint256 amount);
    

    function addLocation(string memory _newLocation) public onlyAdmin{
        require(!locationExists[_newLocation], "Location already exists");

        locations.push(_newLocation);
        locationExists[_newLocation] = true;
    }

    function getLocationList() public view returns (string[] memory) {
        return locations;
    }

    function createProduct(uint _productId,string memory _name, string memory _description, string memory _category,string memory _location) public onlyFarmerRole{
        require(bytes(productContract.getAllProductDetailsById(_productId).name).length != 0, "Item with this ID does not exists");
        require(locationExists[_location],"Location does not exist");
        AuctionProduct memory newProduct = AuctionProduct({
            aucproductId: aucproducts.length,
            name: _name,
            description: _description,
            category: _category,
            location: _location,
            productOwner: msg.sender,
            price: productContract.getAllProductDetailsById(_productId).msp,
            buyer: address(0),
            isSold: false
        });
        aucproducts.push(newProduct);
    }

    function buyProduct(uint256 aucproductId) public payable {
        require(aucproductId < aucproducts.length, "Product does not exist");
        AuctionProduct storage product = aucproducts[aucproductId];
        require(!product.isSold, "Product has already been sold");
        require(msg.value == product.price, "Incorrect amount sent. Send the exact product price.");

        product.isSold = true;
        product.buyer = msg.sender;
        emit ProductPurchased(aucproductId, msg.sender, msg.value);
    }

    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No balance to withdraw");
        payable(owner).transfer(contractBalance);
    }

    function getNumberOfProducts() public view returns (uint256) {
        return aucproducts.length;
    }

    function listAllProducts() public view returns (AuctionProduct[] memory) {
        return aucproducts;
    }
}