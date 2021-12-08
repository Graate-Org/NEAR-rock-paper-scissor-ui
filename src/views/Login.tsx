import RegularButton from "../components/Button";
import Flex from "../components/Flex";
import { AppProps } from "../interfaces/IApp.interface";

const Login: React.FC<AppProps> = ({ contract, wallet }) => {
	const onButtonClick = async () => {
		if (wallet?.requestSignIn) {
			await wallet
				.requestSignIn(contract.contractId, "NEAR Rock Paper Scissor")
				.then(console.log)
				.catch(console.log);
		}
	};

	return (
		<Flex style={{ minHeight: "100vh" }}>
			<RegularButton onClick={onButtonClick}>Log In</RegularButton>
		</Flex>
	);
};

export default Login;
