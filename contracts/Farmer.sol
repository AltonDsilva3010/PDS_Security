// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.19;
import "@openzeppelin/contracts/access/AccessControl.sol";

contract FarmerContract is AccessControl{
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant FARMER_ROLE = keccak256("FARMER_ROLE");
    address owner;
    // MyContract myContract = new MyContract();
    constructor() payable {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); // Set the contract deployer as the default admin
        _grantRole(ADMIN_ROLE, msg.sender);
        owner = msg.sender;
    }

    address[] public farmerAddresses; //All farmers
    uint256 public farmerCount;
    address[] public farmerRequests;

    function addOfficial(address _adminacc) public onlyRole(ADMIN_ROLE){
        grantRole(ADMIN_ROLE, _adminacc);
    }
    
    function canAccessResource(address user) public view onlyRole(ADMIN_ROLE) returns (bool) {
        return hasRole(ADMIN_ROLE, user);
    }

    function farmerRegistration(
        address _address
    ) public {
        farmerCount++;
        farmerRequests.push(_address);
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
}