import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import AppBar from "../components/AppBar";
import RegularButton from "../components/Button";
import Flex from "../components/Flex";
import GameCard from "../components/GameCard";
import Spacing from "../components/Spacing";
import Spinner from "../icons/Spinner";
import { AppProps } from "../interfaces/IApp.interface";
import { Game } from "../interfaces/IGame.interface";
import PlayModal, { playProps } from "../modals/PlayModal";
import ViewPlaysModal from "../modals/ViewPlaysModal";

const GameView: React.FC<AppProps> = ({ currentUser, contract }) => {
	const { id } = useParams<{ id: string }>();
	const history = useHistory();
	const [playModal, setPlayModal] = useState<boolean>(false);
	const [play, setPlay] = useState<playProps>("rock");
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
	const [viewPlayModal, setViewPlayModal] = useState<boolean>(false);
	const [play1, setPlay1] = useState<playProps>("rock");
	const [play2, setPlay2] = useState<playProps>("rock");

	const playArr: playProps[] = ["scissors", "rock", "paper"];

	useEffect(() => {
		if (id) {
			const getDetails = async () => {
				setLoading(true);

				try {
					const res: Game[] = await contract?.getGame({ _gameId: id });
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

	const totalStake = () => {
		if (details?.stakers?.length) {
			const stakes = details?.stakers.map((staker) => staker.stake);
			return stakes.reduce((prev, cur) => prev + cur, 0);
		}

		return 0;
	};

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
						id={id}
						status={details?.status}
						staked={totalStake()}
						createdAt={details?.createdAt}
						winner="Pending..."
						players={details?.players.length ? details?.players : []}
					>
						<Spacing marginTop="39px" marginBottom="15px">
							<Flex justifyContent="space-between" flex={0.3}>
								<RegularButton
									onClick={() => {
										const randomPlay1: playProps =
											playArr[Math.floor(Math.random() * 3)];
										const randomPlay2: playProps =
											playArr[Math.floor(Math.random() * 3)];
										setPlay1(randomPlay1);
										setPlay2(randomPlay2);
										setViewPlayModal(true);
									}}
								>
									View Plays
								</RegularButton>
								<RegularButton onClick={() => {}}>Stake</RegularButton>
								<RegularButton
									onClick={() => {
										const randomPlay: playProps =
											playArr[Math.floor(Math.random() * 3)];
										setPlay(randomPlay);
										setPlayModal(true);
									}}
								>
									Play
								</RegularButton>
							</Flex>
						</Spacing>
					</GameCard>
				</Flex>
			)}

			<PlayModal
				play={play}
				open={playModal}
				handleClose={() => setPlayModal(false)}
			/>
			<ViewPlaysModal
				open={viewPlayModal}
				play1={play1}
				play2={play2}
				handleClose={() => setViewPlayModal(false)}
				player1="melvinmanni09.testnet"
				player2="bot"
			/>
		</>
	);
};

export default GameView;
