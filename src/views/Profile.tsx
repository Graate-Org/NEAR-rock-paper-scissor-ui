import styled from "styled-components";
import CreateGameBtn, { GameStatsCard } from "../components/CreateGameBtn";
import Flex from "../components/Flex";
import GameCard from "../components/GameCard";
import GameCardLegend from "../components/GameCard/Legend";
import Spacing from "../components/Spacing";
import { AppProps } from "../interfaces/IApp.interface";

const CardGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 40px;
`;

const Profile: React.FC<AppProps> = () => {
	return (
		<div>
			<Flex justifyContent="space-between" alignItems="center">
				<CreateGameBtn onClick={() => { }} />
				<GameStatsCard win={3} draw={0} loss={1} />
			</Flex>

			<Spacing marginTop="22px" marginBottom="54px">
				<GameCardLegend />
			</Spacing>

			<CardGrid>
				<GameCard
					id="2836363-567343525"
					status="created"
					route="/games/2836363-567343525"
					staked={4352}
					created="7th November 2021"
				/>
				<GameCard
					id="2836363-567343525"
					status="created"
					route="/games/2836363-567343525"
					staked={4352}
					created="7th November 2021"
				/>
				<GameCard
					id="2836363-567343525"
					status="created"
					route="/games/2836363-567343525"
					staked={4352}
					created="7th November 2021"
				/>
				<GameCard
					id="2836363-567343525"
					status="created"
					route="/games/2836363-567343525"
					staked={4352}
					created="7th November 2021"
				/>
				<GameCard
					id="2836363-567343525"
					status="created"
					route="/games/2836363-567343525"
					staked={4352}
					created="7th November 2021"
				/>
				<GameCard
					id="2836363-567343525"
					status="created"
					route="/games/2836363-567343525"
					staked={4352}
					created="7th November 2021"
				/>
			</CardGrid>
		</div>
	);
};

export default Profile;
