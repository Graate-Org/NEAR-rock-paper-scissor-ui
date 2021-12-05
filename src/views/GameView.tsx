import { useState } from "react";
import AppBar from "../components/AppBar";
import RegularButton from "../components/Button";
import Flex from "../components/Flex";
import GameCard from "../components/GameCard";
import Spacing from "../components/Spacing";
import { AppProps } from "../interfaces/IApp.interface";
import PlayModal, { playProps } from "../modals/PlayModal";
import ViewPlaysModal from "../modals/ViewPlaysModal";

const GameView: React.FC<AppProps> = () => {
	const [playModal, setPlayModal] = useState<boolean>(false);
	const [play, setPlay] = useState<playProps>("rock");

	const [viewPlayModal, setViewPlayModal] = useState<boolean>(false);
	const [play1, setPlay1] = useState<playProps>("rock");
	const [play2, setPlay2] = useState<playProps>("rock");

	const playArr: playProps[] = ["scissors", "rock", "paper"];

	return (
		<>
			<AppBar route="/games" title="Games" />
			<Flex justifyContent="center" itemsFlex={0.65}>
				<GameCard
					id="2836363-567343525"
					status="created"
					staked={4352}
					created="7th November 2021"
					player1="melvinmanni.testnet"
					player2="bot"
					winner="Pending..."
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