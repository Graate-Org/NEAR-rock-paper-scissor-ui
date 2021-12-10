import { useEffect, useState } from "react";
import styled from "styled-components";
import AppBar from "../../components/AppBar";
import CreateGameBtn from "../../components/CreateGameBtn";
import Flex from "../../components/Flex";
import RoomCard from "../../components/RoomCard";
import Text from "../../components/Text";
import Spinner from "../../icons/Spinner";
import { AppProps } from "../../interfaces/IApp.interface";
import { Room } from "../../interfaces/IRoom.interface";
import CreateRoomModal from "../../modals/CreateRoomModal";
import { parseDate } from "../../utils/helperFunctions";

const CardGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 40px;
	margin-top: 3rem;
`;

const Rooms: React.FC<AppProps> = ({ contract, currentUser }) => {
	const [rooms, setRooms] = useState<Room[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getRooms = async () => {
			setLoading(true);

			try {
				const res: Room[] = await contract.getRooms({
					isJoined: true,
					acct: currentUser?.accountId,
				});

				setRooms(res);

				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};

		getRooms();
	}, [contract, currentUser?.accountId, showModal]);


	return (
		<div>
			<AppBar route="/" title="Home" currentUser={currentUser} />
			<Flex justifyContent="space-between" alignItems="center">
				<CreateGameBtn text="Create Room" onClick={() => setShowModal(true)} />
			</Flex>

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
							membersCount={room?.members?.length || 0}
							created={parseDate(room?.createdAt)}
						/>
					))
				) : (
					<Text textAlign="center">No room yet! Create one</Text>
				)}
			</CardGrid>
			<CreateRoomModal
				open={showModal}
				handleClose={() => setShowModal(false)}
				contract={contract}
			/>
		</div>
	);
};

export default Rooms;
