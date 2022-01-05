import { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Big from "big.js";
import AppBar from "../components/AppBar";
import RegularButton from "../components/Button";
import Flex from "../components/Flex";
import GameCard from "../components/GameCard";
import Spacing from "../components/Spacing";
import Spinner from "../icons/Spinner";
import { AppProps } from "../interfaces/IApp.interface";
import { Game, Player } from "../interfaces/IGame.interface";

const GameView: React.FC<AppProps> = ({ currentUser, contract }) => {
	const { id } = useParams<{ id: string }>();
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [details, setDetails] = useState<Game>({
		id: "",
		numOfPlayers: 0,
		players: [],
		stakers: [],
		createdBy: "",
		createdAt: "",
		status: 0,
		winners: [],
		pool: 0,
	});
	const [players, setPlayers] = useState<Player[]>([]);
	const isAPlayer = players.find(
		(player) => player.name === currentUser?.accountId
	);
	const [showStakeModal, setShowStakeModal] = useState(false);

	useEffect(() => {
		if (id) {
			const getDetails = async () => {
				setLoading(true);

				try {
					const res: Game[] = await contract?.getGame({ _gameId: id });
					const res2: Player[] = await contract?.getGamePlayers({
						_gameId: id,
					});
					setPlayers(res2);
					setDetails(res[0]);
					setLoading(false);
				} catch (error) {
					history.push("/rooms");
					console.log(error);
				}
			};

			getDetails();
		}
	}, [contract, history, id]);

	const totalStake = useMemo(() => {
		if (details?.pool) {
			return (Number(details?.pool) / 10 ** 24).toFixed();
		}

		return 0;
	}, [details?.pool]);

	const handlePlay = async () => {
		const txFee = Big(0.2)
			.times(10 ** 24)
			.toFixed();

		const GAS = Big(3)
			.times(10 ** 13)
			.toFixed();

		try {
			await contract?.play({ _gameId: details?.id }, GAS, txFee);
		} catch (error) {
			console.log(error);
		}
	};

	const player2TimePlayed = useMemo(() => {
		if (players?.length === details?.numOfPlayers) {
			return players[details?.numOfPlayers - 1]?.timePlayed;
		}

		return undefined;
	}, [details?.numOfPlayers, players]);

	const disablePlay = useMemo(() => {
		if (details?.status === 2) {
			return true;
		}

		if (isAPlayer) {
			return true;
		}

		if (players?.length === details?.numOfPlayers) {
			return true;
		}

		return false;
	}, [details?.status, details?.numOfPlayers, isAPlayer, players?.length]);

	const choice = useMemo(() => {
		if (isAPlayer) {
			return isAPlayer?.choice === 0
				? "ROCK"
				: isAPlayer?.choice === 1
				? "PAPER"
				: "SCISSORS";
		}

		return undefined;
	}, [isAPlayer]);

	return (
		<>
			<AppBar
				route={`/rooms/${details?.roomId}`}
				title="Games"
				currentUser={currentUser}
			/>
			{loading ? (
				<Spinner />
			) : (
				<Flex justifyContent="center" itemsFlex={0.65}>
					<GameCard
						id={details?.id}
						status={details?.status}
						staked={totalStake}
						createdAt={details?.createdAt}
						players={players.length ? players : []}
						choice={choice}
						maxPlayersReached={
							!isAPlayer && players?.length === details?.numOfPlayers
						}
						player2TimePlayed={player2TimePlayed}
						contract={contract}
						showModal={showStakeModal}
						handleClose={() => setShowStakeModal(false)}
						noLink
					>
						<Spacing marginTop="39px" marginBottom="15px">
							<Flex justifyContent="space-between" flex={0.3}>
								<RegularButton
									aria-disabled={disablePlay}
									disabled={
										disablePlay || !players?.length || details?.status === 2
											? true
											: false
									}
									onClick={() => setShowStakeModal(true)}
								>
									Stake
								</RegularButton>
								<RegularButton
									aria-disabled={disablePlay}
									disabled={disablePlay}
									onClick={handlePlay}
								>
									Play
								</RegularButton>
							</Flex>
						</Spacing>
					</GameCard>
				</Flex>
			)}
		</>
	);
};

export default GameView;
