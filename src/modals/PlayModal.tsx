import React, { ReactElement } from "react";
import styled from "styled-components";
import ModalComponent from ".";
import Text from "../components/Text";
import { HandPaperIcon, HandRockIcon, HandScissorsIcon } from "../icons";

export type playProps = "rock" | "paper" | "scissors";
interface Props {
	play: playProps;
	open: boolean;
	handleClose: VoidFunction;
}

export const PlayWrapper = styled.div`
	background: #242b42;
	box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
	border-radius: 6px;
	padding: 30px;
	width: max-content;
`;

export default function PlayModal({
	play,
	open,
	handleClose,
}: Props): ReactElement {
	return (
		<>
			<ModalComponent handleClose={handleClose} open={open}>
				<PlayWrapper>
					{play === "scissors" ? (
						<HandScissorsIcon />
					) : play === "rock" ? (
						<HandRockIcon />
					) : play === "paper" ? (
						<HandPaperIcon />
					) : null}
				</PlayWrapper>
				<Text
					fontSize={18}
					fontWeight={600}
					textAlign="center"
					transform="capitalize"
				>
					{play}
				</Text>
			</ModalComponent>
		</>
	);
}
