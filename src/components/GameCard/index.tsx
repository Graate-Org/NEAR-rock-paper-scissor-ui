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
	status: number;
	winner?: string;
	children?: React.ReactNode;
	players: Game["players"];
	disabled?: boolean;
}

export type gameProps = Props;

const Wrapper = styled.div`
	background-color: #2e3650;
	background-image: url("./game-bg.svg");
	border-radius: 5px;
	position: relative;
	padding: 26px 20px 46px 20px;
`;

const CardBar = styled.div<{ status: number }>`
	background: ${({ status }) =>
		status === 1
			? "#10DCE9"
			: status === 0
			? "#F5A621"
			: status === 2
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
	players,
	disabled,
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

					{players?.length
						? players.map((player, idx) => (
								<CardText key={player.id} mb="2px" fontSize={14}>
									Player`${idx + 1}`: {player?.name}
								</CardText>
						  ))
						: null}

					{winner && (
						<CardText mb="2px" fontSize={14}>
							Winner: {winner}
						</CardText>
					)}

					{children && (
						<div style={{ width: "100%", margin: "10px" }}>{children}</div>
					)}

					{!disabled && (
						<Flex style={{ marginTop: 12 }} justifyContent="flex-end">
							<ViewLink to={`/games/${id}`}>View details</ViewLink>
						</Flex>
					)}
				</div>
			</Flex>
		</Wrapper>
	);
}
