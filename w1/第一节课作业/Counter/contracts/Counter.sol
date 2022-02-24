// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Counter {
    address private owner;
    uint256 public counter;
    constructor() {
        owner = msg.sender;
    }
    
    function add(uint256 value) external returns (bool) {
        counter = counter + value;
        return true;
    }
    
    function sub(uint256 value) external returns (bool) {
        counter = counter - value;
        return true;
    }
}