import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Game } from "../../interfaces/IGame.interface";
import Flex from "../Flex";
import Text from "../Text";
import { parseDate } from "../../utils/helperFunctions";
import { AppProps } from "../../interfaces/IApp.interface";
import StakeModal from "../../modals/StakeModal";

interface Props {
	staked: number | string;
	id: string;
	createdAt: string;
	status: number;
	children?: React.ReactNode;
	players: Game["players"];
	disabled?: boolean;
	choice?: string;
	maxPlayersReached?: boolean;
	player2TimePlayed?: string;
	getWinner?: () => void;
	contract?: AppProps["contract"];
	showModal?: boolean;
	noLink?: boolean;
	handleClose?: () => void;
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

export const ViewLink = styled(Link)`
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
	children,
	players,
	disabled,
	choice,
	maxPlayersReached,
	player2TimePlayed,
	contract,
	showModal,
	handleClose,
	noLink,
}: Props): ReactElement {
	const [counter, setCounter] = useState(0);
	const [winner, setWinner] = useState("");

	const getWinner = async () => {
		if (status === 2) {
			try {
				const res = await contract?.getWinner({ _gameId: id });
				setWinner(res);
			} catch (error) {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		getWinner();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contract, status, id]);

	const endGame = async () => {
		if (status === 1 && counter < 1) {
			try {
				await contract?.payout({ _gameId: id });
				getWinner();
			} catch (error) {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		let intervalId: any;
		if (player2TimePlayed) {
			// TODO: change to 120000
			const endTime = Math.round(Number(player2TimePlayed) / 1000000) + 90000;

			if (new Date().getTime() < endTime) {
				intervalId = setInterval(() => {
					setCounter((endTime - new Date().getTime()) / 1000);
				}, 1000);
			} else {
				clearInterval(intervalId);
				setCounter(0);

				endGame();
			}
		}

		return () => clearInterval(intervalId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contract, counter, id, player2TimePlayed]);

	return (
		<Wrapper>
			<Flex>
				<CardBar status={status} />
				<div style={{ width: "100%" }}>
					<CardText fontWeight={600} mb="20px" fontSize={18}>
						Game ID: {id}
					</CardText>

					<Flex flexDirection="row" justifyContent="space-between">
						<div>
							<CardText mb="2px" fontSize={14}>
								Amount Staked: {staked} NEAR
							</CardText>

							<CardText mb="2px" fontSize={14}>
								Created: {parseDate(createdAt)}
							</CardText>

							{players?.length
								? players.map((player, idx) => (
										<CardText key={player.id} mb="2px" fontSize={14}>
											Player {idx + 1}: {player?.name}
										</CardText>
								  ))
								: null}

							{choice && (
								<CardText mb="2px" fontSize={14}>
									Choice: {choice}
								</CardText>
							)}

							{maxPlayersReached && (
								<CardText style={{ color: "yellow" }} mb="2px" fontSize={14}>
									Maximum number of players for this game has been reached.
									Please play another game.
								</CardText>
							)}

							{winner && (
								<CardText mb="2px" fontSize={14}>
									Winner: {winner}
								</CardText>
							)}
						</div>
						{player2TimePlayed && (
							<CardText style={{ fontSize: "20px" }} mb="2px" fontSize={14}>
								{counter > 0
									? `Time Left: ${counter.toFixed(0)}`
									: "Game concluded!"}
							</CardText>
						)}
					</Flex>

					{children && (
						<div style={{ width: "100%", margin: "10px" }}>{children}</div>
					)}

					{(!disabled && !noLink) && (
						<Flex style={{ marginTop: 12 }} justifyContent="flex-end">
							<ViewLink to={`/games/${id}`}>View details</ViewLink>
						</Flex>
					)}
				</div>
			</Flex>

			{showModal && handleClose && (
				<StakeModal
					open={showModal}
					handleClose={handleClose}
					contract={contract}
					players={players}
					gameId={id}
				/>
			)}
		</Wrapper>
	);
}
