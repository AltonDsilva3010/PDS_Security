// SPDX-License-Identifier: GPL-3.0

pragma solidity <=0.8.19;

contract PushZero_Test{
    uint256 public num;

    function set(uint256 _n) public{
        num = _n;
    }
}