// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.4.24;

contract ERC677Receiver {
  function onTokenTransfer(address _sender, uint _value, bytes _data);
}
