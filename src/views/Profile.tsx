import { useEffect, useState } from "react";
import styled from "styled-components";
import Text from "../components/Text";
import RoomCard from "../components/RoomCard";
import Spinner from "../icons/Spinner";
// import GameCard from "../components/GameCard";
import { AppProps } from "../interfaces/IApp.interface";
import { Room } from "../interfaces/IRoom.interface";
import { parseDate } from "../utils/helperFunctions";
import Spacing from "../components/Spacing";
import Flex from "../components/Flex";
import { ProfileIcon } from "../icons";

const CardGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 40px;
`;

const Profile: React.FC<AppProps> = ({ currentUser, contract }) => {
	const [rooms, setRooms] = useState<Room[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getProfile = async () => {
			setLoading(true);

			try {
				const res: Room[] = await contract?.getProfile({
					acct: currentUser?.accountId,
				});

				setRooms(res);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};

		getProfile();
	}, [contract, currentUser?.accountId]);

	return (
		<div>
			<Spacing marginBottom="68px">
				<Flex justifyContent="space-between">
					<Text fontSize={18} textAlign="center">
						Rooms I'm Active in
					</Text>
					<Flex alignItems="center">
						<ProfileIcon
							style={{ width: 15, marginRight: 10, fill: "#10DCE9" }}
						/>
						<Text>{currentUser?.accountId}</Text>&nbsp;◊
					</Flex>
				</Flex>
			</Spacing>

			<CardGrid>
				{loading ? (
					<Spinner />
				) : rooms?.length ? (
					rooms?.map((room) => (
						<RoomCard
							key={room?.id}
							id={room?.id}
							privacy={room?.isVisible === 0 ? "public" : "private"}
							route={`/rooms/${room?.id}`}
							created={parseDate(room?.createdAt)}
							contract={contract}
						/>
					))
				) : (
					<Text textAlign="center">No room yet! Create one</Text>
				)}
			</CardGrid>
		</div>
	);
};

export default Profile;
