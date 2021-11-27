import React, { ReactElement } from "react";
import styled from "styled-components";
import Flex from "../components/Flex";
import { CloseCircleIcon } from "../icons";
import { modalZoomInAnimation, modalZoomOutAnimation } from "./utils";

export type playProps = "rock" | "paper" | "scissors";
interface Props {
  open: boolean;
  handleClose: VoidFunction;
  children?: React.ReactNode;
}

const Wrapper = styled.div<{ open: boolean }>`
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
  animation: ${({ open }) => (open ? modalZoomInAnimation() : modalZoomOutAnimation())} 0.6s 1 forwards;
`;

const Card = styled.div`
  background: #1a2036;
  border-radius: 5px;
  padding: 50px;
  display: flex;
  flex-direction: column;
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

const CloseWrapper = styled.button`
  border: none;
  background: transparent;
  right: 10px;
  position: absolute;
  top: 10px;
  cursor: pointer;
`;

export default function ModalComponent({ open, handleClose }: Props): ReactElement {
  const [closeModal, setCloseModal] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setCloseModal(true);
      }, 500);
    } else {
      setCloseModal(false);
    }
  }, [open]);
  return (
    <>
      {!closeModal && (
        <Wrapper
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
          open={open}
        >
          <Flex>
            <Card>
              <CloseWrapper>
                <CloseCircleIcon onClick={handleClose} />
              </CloseWrapper>
              <></>
            </Card>
          </Flex>
        </Wrapper>
      )}
    </>
  );
}
