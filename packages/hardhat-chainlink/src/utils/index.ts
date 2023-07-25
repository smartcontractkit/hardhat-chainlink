import { BigNumber, BigNumberish } from "ethers";

import { AGGREGATOR_PROXY_PHASE_OFFSET } from "../shared/constants";

export const getRoundId = (
  _phaseId: BigNumberish,
  _aggregatorRoundId: BigNumberish
): BigNumber => {
  const phaseId = BigNumber.from(_phaseId);
  const aggregatorRoundId = BigNumber.from(_aggregatorRoundId);

  const result = phaseId
    .shl(AGGREGATOR_PROXY_PHASE_OFFSET)
    .or(aggregatorRoundId);

  return result.and(
    BigNumber.from("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
  );
};

export const parseRoundId = (
  _roundId: BigNumberish
): {
  phaseId: BigNumber;
  aggregatorRoundId: BigNumber;
} => {
  const roundId = BigNumber.from(_roundId);

  const phaseId = roundId.div(
    BigNumber.from(2).pow(AGGREGATOR_PROXY_PHASE_OFFSET)
  );
  const aggregatorRoundId = roundId.and(BigNumber.from("0xFFFFFFFFFFFFFFFF"));

  return {
    phaseId,
    aggregatorRoundId,
  };
};
