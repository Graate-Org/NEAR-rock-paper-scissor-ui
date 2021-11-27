import React, { ReactElement } from "react";
import styled from "styled-components";
import Flex from "../Flex";
import Text from "../Text";

const LegendColorCode = styled.div<{ bg: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
  background: ${({ bg }) => bg};
`;

export default function GameCardLegend(): ReactElement {
  return (
    <div>
      <Flex justifyContent="flex-start">
        <LegendColorCode bg="#F5A621" />
        <Text fontSize={12} fontWeight={300} color="#fff">
          created game
        </Text>
      </Flex>
      <Flex justifyContent="flex-start">
        <LegendColorCode bg="#10DCE9" />
        <Text fontSize={12} fontWeight={300} color="#fff">
          started game
        </Text>
      </Flex>
      <Flex justifyContent="flex-start">
        <LegendColorCode bg="#E23332" />
        <Text fontSize={12} fontWeight={300} color="#fff">
          concluded game
        </Text>
      </Flex>
    </div>
  );
}
