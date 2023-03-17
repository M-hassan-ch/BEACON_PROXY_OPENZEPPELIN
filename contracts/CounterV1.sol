// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract CounterV1{
    uint public count;

    function init(uint val) public{
        count = val;
    }
    
    function inc() public{
        count += 1;
    }

    function duplicate() public pure returns (address){
        return address(0);
    }
}