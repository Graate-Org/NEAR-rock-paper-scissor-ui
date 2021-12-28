import { ReactElement, useEffect, useMemo, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import Big from "big.js";
import AppBar from "../../components/AppBar";
import RegularButton from "../../components/Button";
import Flex from "../../components/Flex";
import GameCard from "../../components/GameCard";
import Spacing from "../../components/Spacing";
import Text from "../../components/Text";
import Spinner from "../../icons/Spinner";
import { AppProps } from "../../interfaces/IApp.interface";
import { Game } from "../../interfaces/IGame.interface";
import { Room, RoomRequest } from "../../interfaces/IRoom.interface";
import { parseDate } from "../../utils/helperFunctions";
import { GameCardGrid } from "../Games";

const CardWrapper = styled.div`
	background-color: #1e2131;
	border-radius: 8px;
	position: relative;
	padding: 26px 20px 46px 20px;
`;

export const RoomTab = styled.div`
	margin: 10px auto;
	display: flex;
	border-radius: 8px;
	background: #7f88a9;
	border: 0.1px solid #f2f2f221;
`;

export const TabBtn = styled(RegularButton)<{ activeTab: boolean }>`
	padding: 15px;
	min-width: unset;
	box-shadow: unset;
	border: 0;
	background: ${({ activeTab }) => (activeTab ? "#1e2131" : "#7f88a9")};
	color: ${({ activeTab }) => (activeTab ? "#fff" : "#2e36509e")};
`;

const MemberList = (props: { members: string[] }): ReactElement => (
	<>
		{props.members.map((val) => (
			<Text fontSize={16} mb="10px" textAlign="center" fontWeight={500}>
				{val}
			</Text>
		))}
	</>
);

const GamesList = (props: {
	games: Game[];
	disabled: boolean;
}): ReactElement => {
	const totalStake = (game: Game) => {
		if (game?.stakers?.length) {
			const stakes = game?.stakers.map((staker) => staker.stake);
			return stakes.reduce((prev, cur) => prev + cur, 0);
		}

		return 0;
	};

	return (
		<>
			{props.games.length > 0 ? (
				<GameCardGrid>
					{props.games.map((game) => (
						<GameCard
							key={game.id}
							createdAt={game.createdAt}
							staked={totalStake(game)}
							status={game.status}
							id={game.id}
							players={game.players}
							disabled={props.disabled}
						/>
					))}
				</GameCardGrid>
			) : (
				<Text textAlign="center">No Games Yet</Text>
			)}
		</>
	);
};

const RequestList: React.FC<{
	requests: RoomRequest[];
	contract: AppProps["contract"];
	refetch: () => void;
}> = ({ requests, contract, refetch }) => {
	const [responding, setResponding] = useState(false);

	const respondToRequest = async (choice: boolean, accountId: string) => {
		setResponding(true);

		try {
			await contract?.responseToRequest({
				_roomId: requests[0]?.roomId,
				acct: accountId,
				acceptance: choice,
			});

			refetch();
			setResponding(false);
		} catch (error: any) {
			console.log(error?.message);
			setResponding(false);
		}
	};

	return (
		<>
			{requests?.length ? (
				requests.map((val) => (
					<div style={{ marginBottom: "3rem" }}>
						<Text fontSize={16} mb="10px" textAlign="left" fontWeight={500}>
							{val?.accountId} wants to join this room.
						</Text>
						<Flex justifyContent="center">
							<RegularButton
								onClick={() => respondToRequest(true, val?.accountId)}
								disabled={responding}
								mt="15px"
								mr="10px"
							>
								Accept
							</RegularButton>
							<RegularButton
								onClick={() => respondToRequest(false, val?.accountId)}
								disabled={responding}
								mt="15px"
							>
								Reject
							</RegularButton>
						</Flex>
					</div>
				))
			) : (
				<Text textAlign="center">No Requests Yet</Text>
			)}
		</>
	);
};

const GameView: React.FC<AppProps> = ({ currentUser, contract }) => {
	const { id } = useParams<{ id: string }>();
	const history = useHistory();
	const [activeTab, setActiveTab] = useState<"games" | "members" | "requests">(
		"games"
	);
	const [details, setDetails] = useState<Room>();
	const [games, setGames] = useState<Game[]>([]);
	const [loading, setLoading] = useState(false);
	const [reload, setReload] = useState(false);
	const [requestPending, setRequestPending] = useState(false);
	const [syncing, setSyncing] = useState(false);
	const [members, setMembers] = useState<Room["members"]>([]);
	const [requests, setRequests] = useState<RoomRequest[]>([]);
	const [checkingRequest, setCheckingRequest] = useState(true);
	const [refetch, setRefetch] = useState(false);

	const txFee = Big(0.5)
		.times(10 ** 24)
		.toFixed();

	const GAS = Big(3)
		.times(10 ** 13)
		.toFixed();

	useEffect(() => {
		if (id) {
			const getDetails = async () => {
				setLoading(true);

				try {
					const res: Room[] = await contract?.getRoom({ _roomId: id });
					const gameRes: Game[] = await contract?.getRoomGames({ _roomId: id });
					setDetails(res[0]);
					setGames(gameRes);
					setLoading(false);
				} catch (error) {
					history.push("/rooms");
					console.log(error);
				}
			};

			getDetails();
		}
	}, [contract, history, id, reload]);

	useEffect(() => {
		const getMembers = async () => {
			try {
				const res: Room["members"] = await contract.getRoomMembers({
					_roomId: details?.id,
				});

				setMembers(res);
			} catch (error) {
				console.log(error);
			}
		};

		if (details?.id) {
			getMembers();
		}
	}, [contract, details?.id]);

	useEffect(() => {
		if (details?.isVisible === 1) {
			const getRoomRequests = async () => {
				try {
					const res: RoomRequest[] = await contract?.getRoomRequests({
						_roomId: id,
					});

					setRequests(res);

					const arr = res.filter(
						(req) => req.accountId === currentUser?.accountId
					);

					const isPending = arr?.length && arr[0]?.state !== 1 ? true : false;

					setRequestPending(isPending);

					setCheckingRequest(false);
				} catch (error: any) {
					console.log(error?.message);
					setCheckingRequest(false);
				}
			};

			getRoomRequests();
		} else {
			setCheckingRequest(false);
		}
	}, [contract, currentUser?.accountId, details?.isVisible, id, refetch]);

	const isOwner = details?.owner === currentUser?.accountId;

	const isMember = useMemo(() => {
		if (members?.length) {
			const arr = members?.map((member) => member.accountId);
			return arr.includes(currentUser?.accountId as string);
		}

		return false;
	}, [currentUser?.accountId, members]);

	const joinRoom = async () => {
		setSyncing(true);

		try {
			const res = await contract.joinPublicRoom({
				_roomId: details?.id,
				_isVisible: true,
			});

			res && setReload(!reload);
			setSyncing(false);
		} catch (error) {
			console.log(error);
			setSyncing(false);
		}
	};

	const requestToJoinRoom = async () => {
		setSyncing(true);

		const privateRmTxFee = Big(0.5)
			.times(10 ** 24)
			.toFixed();

		try {
			await contract.requestToJoinPrivateRoom(
				{
					_roomId: details?.id,
				},
				GAS,
				privateRmTxFee
			);

			setSyncing(false);
			setRequestPending(true);
		} catch (error) {
			console.log(error);
			setSyncing(false);
		}
	};

	const createGame = async () => {
		try {
			await contract.createGame({ _roomId: id }, GAS, txFee);
		} catch (error) {
			console.log(error);
		}
	};

	const clickHandler = () => {
		if (isMember || isOwner) {
			return createGame();
		}

		if (details?.isVisible === 0) {
			return joinRoom();
		}

		if (details?.isVisible === 1) {
			return requestToJoinRoom();
		}
	};

	return (
		<>
			<AppBar route="/rooms" title="Rooms" currentUser={currentUser} />
			{loading ? (
				<Flex
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
				>
					<Spinner />
				</Flex>
			) : (
				<>
					<Flex justifyContent="center" itemsFlex={0.6}>
						<CardWrapper style={{ paddingBottom: 26 }}>
							<Text mb="30px" textAlign="center" fontWeight={600} fontSize={24}>
								{details?.id}
							</Text>

							<Text mb="10px" textAlign="center">
								Created: {parseDate(details?.createdAt as string)}
							</Text>
							<Text mb="10px" textAlign="center">
								Created By: {details?.owner}
							</Text>
							<Text textAlign="center">
								Privacy: {details?.isVisible === 0 ? "PUBLIC" : "PRIVATE"}
							</Text>

							<Flex justifyContent="center">
								{requestPending ? (
									<RegularButton disabled={true} mt="15px">
										Request Sent
									</RegularButton>
								) : syncing || checkingRequest ? (
									<Spinner />
								) : (
									<RegularButton onClick={clickHandler} mt="15px">
										{isOwner || isMember ? "CREATE GAME" : "JOIN ROOM"}
									</RegularButton>
								)}
							</Flex>
						</CardWrapper>
					</Flex>

					<Spacing marginTop="68px" marginBottom="20px">
						<Flex justifyContent="center">
							<RoomTab>
								<TabBtn
									onClick={() => setActiveTab("games")}
									activeTab={activeTab === "games"}
								>
									Games
								</TabBtn>
								<TabBtn
									onClick={() => setActiveTab("members")}
									activeTab={activeTab === "members"}
								>
									Members
								</TabBtn>
								{currentUser?.accountId === details?.owner && (
									<TabBtn
										onClick={() => setActiveTab("requests")}
										activeTab={activeTab === "requests"}
									>
										Requests
									</TabBtn>
								)}
							</RoomTab>
						</Flex>
					</Spacing>
					<Flex justifyContent="center" itemsFlex={0.9}>
						<CardWrapper>
							<Flex
								style={{ minHeight: 350 }}
								flexDirection="column"
								alignItems="center"
								justifyContent="center"
							>
								{activeTab === "members" && (
									<MemberList
										members={members.map((member) => member.accountId)}
									/>
								)}
								{activeTab === "games" && (
									<GamesList games={games} disabled={requestPending} />
								)}
								{activeTab === "requests" && (
									<RequestList
										requests={requests}
										contract={contract}
										refetch={() => setRefetch(!refetch)}
									/>
								)}
							</Flex>
						</CardWrapper>
					</Flex>
				</>
			)}
		</>
	);
};

export default GameView;
