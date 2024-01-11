// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19 ;
import "./FarmerContract.sol";


contract ProductContract{
    FarmerContract public farmerContract;

    constructor(address _farmerContractAddress) {
        farmerContract = FarmerContract(_farmerContractAddress);
    }

    struct productDetails{
        string name;
        uint256 msp;
        uint256 requiredQuantity;
        string unit;
    }

    uint256[] public productIds; 

    mapping(uint256 => productDetails) public products;

    event ProductAdded(string indexed name , uint256 msp , uint256 requiredQuantity , uint256 indexed productId , string unit);
    event ProductUpdated(uint256 indexed productId , string name , uint256 msp , uint256  requiredQuantity , string unit);
    event ProductDeleted(uint256 indexed productId);

    // Modifier that checks if the sender has the FARMER_ROLE in FarmerContract
    modifier onlyFarmerRole() {
        require(farmerContract.hasRole(farmerContract.FARMER_ROLE(), msg.sender), "Not authorized");
        _;
    }

    modifier onlyAdmin() {
        require(farmerContract.hasRole(farmerContract.ADMIN_ROLE(), msg.sender), "Not authorized as an admin");
        _;
    }


    function addProduct(string memory _name , uint256 _msp , uint256 _requiredQuantity,uint256 _productId,string memory _unit) public onlyAdmin{
        // check whether product is present or not
        productDetails memory newProduct = productDetails({
            name : _name,
            msp : _msp,
            requiredQuantity : _requiredQuantity,
            unit : _unit
        });
        products[_productId] = newProduct;
        emit ProductAdded(_name, _msp, _requiredQuantity, _productId, _unit);
    }

    function updateProduct(uint256 _productID , string memory _name , uint256 _msp,uint256 _requiredQuantity,string memory _unit) public onlyAdmin{
        // before updateing check presence of prooduct
        productDetails memory str = products[_productID];
        str.name = _name; 
        str.msp = _msp;
        str.requiredQuantity = _requiredQuantity;
        str.unit = _unit;
        products[_productID] = str;
        emit ProductUpdated(_productID,_name,_msp,_requiredQuantity,_unit);
    }

    function deleteProduct(uint256 _productID) public {
        delete products[_productID];
        emit ProductDeleted(_productID);
    }

    function getAllProductDetailsById(uint256 _productID) public view returns(productDetails memory) {
        return products[_productID];
    }
}