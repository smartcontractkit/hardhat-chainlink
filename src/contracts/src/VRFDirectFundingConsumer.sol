// SPDX-License-Identifier: MIT
// An example of a consumer contract that directly pays for each request.
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "@chainlink/contracts/src/v0.8/VRFV2WrapperConsumerBase.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

contract VRFv2DirectFundingConsumer is
VRFV2WrapperConsumerBase,
ConfirmedOwner
{
  event RequestSent(uint256 requestId, uint32 numWords);
  event RequestFulfilled(
    uint256 requestId,
    uint256[] randomWords,
    uint256 payment
  );

  struct RequestStatus {
    uint256 paid; // amount paid in link
    bool fulfilled; // whether the request has been successfully fulfilled
    uint256[] randomWords;
  }
  mapping(uint256 => RequestStatus)
  public s_requests; /* requestId --> requestStatus */

  // past requests Id.
  uint256[] public requestIds;
  uint256 public lastRequestId;

  // Depends on the number of requested values that you want sent to the
  // fulfillRandomWords() function. Test and adjust
  // this limit based on the network that you select, the size of the request,
  // and the processing of the callback request in the fulfillRandomWords()
  // function.
  uint32 public callbackGasLimit = ${CALLBACK_GAS_LIMIT};

  // The default is 3, but you can set this higher.
  uint16 public requestConfirmations = ${REQUEST_CONFIRMATIONS};

  // Number of random values in one request.
  // Cannot exceed VRFV2Wrapper.getConfig().maxNumWords.
  uint32 public numWords = ${NUM_WORDS};

  // Address LINK
  address public linkAddress = ${LINK_CONTRACT_ADDRESS};

  // address WRAPPER
  address public wrapperAddress = ${WRAPPER_ADDRESS};

  constructor()
  ConfirmedOwner(msg.sender)
  VRFV2WrapperConsumerBase(linkAddress, wrapperAddress)
  {}

  function requestRandomWords()
  external
  onlyOwner
  returns (uint256 requestId)
  {
    requestId = requestRandomness(
      callbackGasLimit,
      requestConfirmations,
      numWords
    );
    s_requests[requestId] = RequestStatus({
      paid: VRF_V2_WRAPPER.calculateRequestPrice(callbackGasLimit),
      randomWords: new uint256[](0),
      fulfilled: false
    });
    requestIds.push(requestId);
    lastRequestId = requestId;
    emit RequestSent(requestId, numWords);
    return requestId;
  }

  function fulfillRandomWords(
    uint256 _requestId,
    uint256[] memory _randomWords
  ) internal override {
    require(s_requests[_requestId].paid > 0, "request not found");
    s_requests[_requestId].fulfilled = true;
    s_requests[_requestId].randomWords = _randomWords;
    emit RequestFulfilled(
      _requestId,
      _randomWords,
      s_requests[_requestId].paid
    );
  }

  function getRequestStatus(
    uint256 _requestId
  )
  external
  view
  returns (uint256 paid, bool fulfilled, uint256[] memory randomWords)
  {
    require(s_requests[_requestId].paid > 0, "request not found");
    RequestStatus memory request = s_requests[_requestId];
    return (request.paid, request.fulfilled, request.randomWords);
  }

  /**
   * Allow withdraw of Link tokens from the contract
   */
  function withdrawLink() public onlyOwner {
    LinkTokenInterface link = LinkTokenInterface(linkAddress);
    require(
      link.transfer(msg.sender, link.balanceOf(address(this))),
      "Unable to transfer"
    );
  }
}
