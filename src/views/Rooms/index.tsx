import styled from "styled-components";
import CreateGameBtn, { GameStatsCard } from "../../components/CreateGameBtn";
import Flex from "../../components/Flex";
import RoomCard from "../../components/RoomCard";
import GameCardLegend from "../../components/GameCard/Legend";
import Spacing from "../../components/Spacing";
import { AppProps } from "../../interfaces/IApp.interface";

const CardGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 40px;
`;

const Rooms: React.FC<AppProps> = () => {
	return (
		<div>
			<Flex justifyContent="space-between" alignItems="center">
				<CreateGameBtn />
				<GameStatsCard win={3} draw={0} loss={1} />
			</Flex>

			<Spacing marginTop="22px" marginBottom="54px">
				<GameCardLegend />
			</Spacing>

			<CardGrid>
				<RoomCard
					id="room-567343525"
					privacy="private"
					route="/rooms/room-567343525"
					membersCount={4352}
					created="7th November 2021"
				/>
				<RoomCard
					id="room-567343525"
					privacy="private"
					route="/rooms/room-567343525"
					membersCount={4352}
					created="7th November 2021"
				/>
				<RoomCard
					id="room-567343525"
					privacy="public"
					route="/rooms/room-567343525"
					membersCount={4352}
					created="7th November 2021"
				/>
				<RoomCard
					id="room-567343525"
					privacy="private"
					route="/rooms/room-567343525"
					membersCount={4352}
					created="7th November 2021"
				/>
				<RoomCard
					id="room-567343525"
					privacy="public"
					route="/rooms/room-567343525"
					membersCount={4352}
					created="7th November 2021"
				/>
				<RoomCard
					id="room-567343525"
					privacy="private"
					route="/rooms/room-567343525"
					membersCount={4352}
					created="7th November 2021"
				/>
			</CardGrid>
		</div>
	);
};

export default Rooms;
