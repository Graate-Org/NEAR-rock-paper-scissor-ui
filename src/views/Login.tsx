import { useHistory } from "react-router";
import RegularButton from "../components/Button";
import Flex from "../components/Flex";
import { AppProps } from "../interfaces/IApp.interface";

const Login: React.FC<AppProps> = ({ contract, wallet }) => {
	const history = useHistory();

	const onButtonClick = () => {
		if (wallet?.requestSignIn) {
			wallet.requestSignIn(contract.contractId, "NEAR Rock Paper Scissor");
			return history.push("/");
		}
	};

	return (
		<Flex style={{ minHeight: "100vh" }}>
			<RegularButton onClick={onButtonClick}>Log In</RegularButton>
		</Flex>
	);
};

export default Login;
