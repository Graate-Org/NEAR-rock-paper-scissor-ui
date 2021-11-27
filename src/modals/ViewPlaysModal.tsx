import React, { ReactElement } from "react";
import ModalComponent from ".";
import Flex from "../components/Flex";
import Spacing from "../components/Spacing";
import Text from "../components/Text";
import { HandPaperIcon, HandRockIcon, HandScissorsIcon } from "../icons";
import { PlayWrapper } from "./PlayModal";

export type playProps = "rock" | "paper" | "scissors";
interface Props {
  player1: string;
  player2: string;
  play1: playProps;
  play2: playProps;
  open: boolean;
  handleClose: VoidFunction;
}

export default function ViewPlaysModal({ player1, player2, play1, play2, open, handleClose }: Props): ReactElement {
  return (
    <>
      <ModalComponent handleClose={handleClose} open={open}>
        <Flex style={{ width: "100%" }} flexDirectionMd="column" justifyContent="space-between">
          <Flex flexDirection="column">
            <Text fontSize={12} fontWeight={400} textAlign="center" transform="lowercase">
              {player1}
            </Text>
            <PlayWrapper>{play1 === "scissors" ? <HandScissorsIcon /> : play1 === "rock" ? <HandRockIcon /> : play1 === "paper" ? <HandPaperIcon /> : null}</PlayWrapper>
          </Flex>
          <Spacing marginHorizontal="10px" marginVerticalMd="30px"></Spacing>
          <Flex flexDirection="column">
            <Text fontSize={12} fontWeight={400} textAlign="center" transform="lowercase">
              {player2}
            </Text>
            <PlayWrapper>{play2 === "scissors" ? <HandScissorsIcon /> : play2 === "rock" ? <HandRockIcon /> : play2 === "paper" ? <HandPaperIcon /> : null}</PlayWrapper>
          </Flex>
        </Flex>
      </ModalComponent>
    </>
  );
}
