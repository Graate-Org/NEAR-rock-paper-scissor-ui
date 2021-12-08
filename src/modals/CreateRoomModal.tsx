import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Big from "big.js";
import ModalComponent from ".";
import RegularButton from "../components/Button";
import Text from "../components/Text";
import { AppProps, Visibility } from "../interfaces/IApp.interface";
import Spinner from "../icons/Spinner";

export type playProps = "rock" | "paper" | "scissors";

interface Props extends AppProps {
	open: boolean;
	handleClose: VoidFunction;
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

const CreateRoomModal: React.FC<Props> = ({ handleClose, open, contract }) => {
	const history = useHistory();
	const [loading, setLoading] = useState(false);

	const txFee = Big(0.7)
		.times(10 ** 24)
		.toFixed();

	const GAS = Big(3)
		.times(10 ** 13)
		.toFixed();

	const handleClick = async (type: Visibility) => {
		const visibility = type !== "PRIVATE";

		try {
			setLoading(true);
			await contract.createRoom({ _isVisible: visibility }, GAS, txFee);
			handleClose();
			history.push("/rooms");
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
							Want to Create a Public or Private Room?
						</Text>
						<PlayWrapper>
							<RegularButton
								role="button"
								onClick={() => handleClick("PUBLIC")}
							>
								Public
							</RegularButton>
							<RegularButton
								role="button"
								onClick={() => handleClick("PRIVATE")}
							>
								Private
							</RegularButton>
						</PlayWrapper>
					</>
				) : (
					<Spinner />
				)}
			</ModalComponent>
		</>
	);
};

export default CreateRoomModal;
