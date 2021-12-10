import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Game } from "../../interfaces/IGame.interface";
import Flex from "../Flex";
import Text from "../Text";
import { parseDate } from "../../utils/helperFunctions";

interface Props {
	staked: number;
	id: string;
	createdAt: string;
	status: Game["status"];
	winner?: string;
	children?: React.ReactNode;
}

export type gameProps = Props;

const Wrapper = styled.div`
	background-color: #2e3650;
	background-image: url("./game-bg.svg");
	border-radius: 5px;
	position: relative;
	padding: 26px 20px 46px 20px;
`;

const CardBar = styled.div<{ status: Game["status"] }>`
	background: ${({ status }) =>
		status === "ACTIVE"
			? "#10DCE9"
			: status === "CREATED"
			? "#F5A621"
			: status === "COMPLETED"
			? "#E23332"
			: null};
	position: absolute;
	width: 90%;
	height: 7px;
	top: 0;
`;

const CardText = styled(Text)`
	color: #b1b9d8;
`;

const ViewLink = styled(Link)`
	font-family: "Poppins";
	font-style: normal;
	font-weight: 500;
	font-size: 15px;
	line-height: 13px;
	/* identical to box height */
	color: #808fbe;
	text-decoration: underline;
`;

export default function GameCard({
	createdAt,
	status,
	staked,
	id,
	winner,
	children,
}: Props): ReactElement {
	return (
		<Wrapper>
			<Flex>
				<CardBar status={status} />
				<div style={{ width: "100%" }}>
					<CardText fontWeight={600} mb="20px" fontSize={18}>
						Game ID: {id}
					</CardText>

					<CardText mb="2px" fontSize={14}>
						Amount Staked: {staked} NEAR
					</CardText>

					<CardText mb="2px" fontSize={14}>
						Created: {parseDate(createdAt)}
					</CardText>

					{/* {player1 && (
						<CardText mb="2px" fontSize={14}>
							Player1: {player1}
						</CardText>
					)}

					{player2 && (
						<CardText mb="2px" fontSize={14}>
							Player2: {player2}
						</CardText>
					)} */}

					{winner && (
						<CardText mb="2px" fontSize={14}>
							Winner: {winner}
						</CardText>
					)}

					{children && (
						<div style={{ width: "100%", margin: "10px" }}>{children}</div>
					)}

					<Flex style={{ marginTop: 12 }} justifyContent="flex-end">
						<ViewLink to={`/games/${id}`}>View details</ViewLink>
					</Flex>
				</div>
			</Flex>
		</Wrapper>
	);
}
