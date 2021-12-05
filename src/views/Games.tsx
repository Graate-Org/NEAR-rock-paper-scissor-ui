import styled from "styled-components";
import AppBar from "../components/AppBar";
import CreateGameBtn from "../components/CreateGameBtn";
import Flex from "../components/Flex";
import GameCard from "../components/GameCard";
import GameCardLegend from "../components/GameCard/Legend";
import Spacing from "../components/Spacing";
import { AppProps } from "../interfaces/IApp.interface";

export const GameCardGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 40px;
`;

const Games: React.FC<AppProps> = () => {
	return (
		<div>
			<AppBar route="/" title="Home" />
			<Flex justifyContent="space-between" alignItems="center">
				<CreateGameBtn />
			</Flex>
			<Spacing marginTop="22px" marginBottom="54px">
				<GameCardLegend />
			</Spacing>

			<GameCardGrid>
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
					status="started"
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
					status="concluded"
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
					status="started"
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
					status="concluded"
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
			</GameCardGrid>
		</div>
	);
};

export default Games;
