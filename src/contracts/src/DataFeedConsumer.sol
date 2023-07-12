// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 * @title Data Feeds Consumer contract
 * @notice This contract is a demonstration of using Data Feeds.
 * @notice NOT FOR PRODUCTION USE
 */

/**
 * If you are reading data feeds on L2 networks, you must
 * check the latest answer from the L2 Sequencer Uptime
 * Feed to ensure that the data is accurate in the event
 * of an L2 sequencer outage. See the
 * https://docs.chain.link/data-feeds/l2-sequencer-feeds
 * page for details.
 */

contract DataFeedConsumer {
  AggregatorV3Interface internal dataFeed;

  constructor(address dataFeedAddress) {
    dataFeed = AggregatorV3Interface(
      dataFeedAddress
    );
  }

  /**
   * Returns the latest answer.
   */
  function getLatestData() public view returns (int) {
    // prettier-ignore
    (
    /* uint80 roundID */,
      int answer,
    /*uint startedAt*/,
    /*uint timeStamp*/,
    /*uint80 answeredInRound*/
    ) = dataFeed.latestRoundData();
    return answer;
  }
}
