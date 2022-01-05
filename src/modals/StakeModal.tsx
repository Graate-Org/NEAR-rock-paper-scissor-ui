import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Big from "big.js";
import ModalComponent from ".";
import RegularButton from "../components/Button";
import Text from "../components/Text";
import { AppProps } from "../interfaces/IApp.interface";
import Spinner from "../icons/Spinner";
import { Player } from "../interfaces/IGame.interface";

interface Props extends AppProps {
	open: boolean;
	handleClose: VoidFunction;
	players: Player[];
	gameId: string;
}

export const PlayWrapper = styled.div`
	background: #242b42;
	box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
	border-radius: 6px;
	padding: 30px;
	width: max-content;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 1rem;
	margin-top: 1rem;
`;

const StakeModal: React.FC<Props> = ({
	handleClose,
	open,
	contract,
	players,
	gameId,
}) => {
	const history = useHistory();
	const [loading, setLoading] = useState(false);

	const txFee = Big(1)
		.times(10 ** 24)
		.toFixed();

	const GAS = Big(20)
		.times(10 ** 13)
		.toFixed();

	const handleClick = async (id: string) => {
		try {
			setLoading(true);
			const res: any = await contract.stake(
				{ _gameId: gameId, stakeOn: id },
				GAS,
				txFee
			);
			handleClose();
			res && history.push(`/games/${gameId}`);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<>
			<ModalComponent handleClose={handleClose} open={open}>
				{!loading ? (
					<>
						<Text
							fontSize={18}
							fontWeight={600}
							textAlign="center"
							transform="capitalize"
						>
							Who do you want to stake on?
						</Text>
						<PlayWrapper>
							{players?.map((player) => (
								<RegularButton
									role="button"
									onClick={() => handleClick(player?.name)}
								>
									{player?.name}
								</RegularButton>
							))}
						</PlayWrapper>
					</>
				) : (
					<Spinner />
				)}
			</ModalComponent>
		</>
	);
};

export default StakeModal;
