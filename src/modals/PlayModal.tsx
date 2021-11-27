import React, { ReactElement } from "react";
import styled from "styled-components";
import Flex from "../components/Flex";
import { CloseCircleIcon, HandPaperIcon, HandRockIcon, HandScissorsIcon } from "../icons";

interface Props {
  play: "rock" | "paper" | "scissors";
  open: boolean;
  handleClose: VoidFunction;
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  background: #1a2036;
  border-radius: 5px;
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 350px;
  min-width: 500px;
  @media all and (max-width: 640px) {
    min-height: 350px;
    min-height: unset;
  }
`;

const PlayWrapper = styled.div`
  background: #242b42;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  padding: 30px;
`;

const CloseWrapper = styled.button`
  border: none;
  background: transparent;
  right: 10px;
  position: absolute;
  top: 10px;
  cursor: pointer;
`;

export default function PlayModal({ play, open, handleClose }: Props): ReactElement {
  return (
    <>
      {open && (
        <Wrapper>
          <Flex>
            <Card>
              <CloseWrapper>
                <CloseCircleIcon onClick={handleClose} />
              </CloseWrapper>
              <PlayWrapper>{play === "scissors" ? <HandScissorsIcon /> : play === "rock" ? <HandRockIcon /> : play === "paper" ? <HandPaperIcon /> : null}</PlayWrapper>
            </Card>
          </Flex>
        </Wrapper>
      )}
    </>
  );
}
