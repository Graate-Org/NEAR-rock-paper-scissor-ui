import { ReactElement } from "react";
import styled from "styled-components";
import { AddCircleIcon } from "../icons";
import Flex from "./Flex";
import Spacing from "./Spacing";
import Text from "./Text";

const Wrapper = styled.button`
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
  padding: 12px 16px;
  background: #2e3650;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  min-width: 140px;
  border: 0;
  svg {
    margin-right: 7px;
  }
`;

export const GameStatsCard = ({ win, loss, draw }: { win: number; loss: number; draw: number }): ReactElement => {
  return (
    <Wrapper>
      <Flex flexDirection="column">
        <Text textAlign="center" fontSize={18} fontWeight={800}>
          Wins <br />{win}
        </Text>
      </Flex>
      <Spacing marginHorizontal="20px">
        <Flex flexDirection="column">
          <Text textAlign="center" fontSize={18} fontWeight={800}>
            Draw <br />{draw}
          </Text>
        </Flex>
      </Spacing>

      <Flex flexDirection="column">
        <Text textAlign="center" fontSize={18} fontWeight={800}>
          Loss <br />{loss}
        </Text>
      </Flex>
    </Wrapper>
  );
};

export const GameBtnWrapper = Wrapper;

export default function CreateGameBtn(): ReactElement {
  return (
    <Wrapper>
      <AddCircleIcon />
      <Text fontSize={14}>Create Game</Text>
    </Wrapper>
  );
}
