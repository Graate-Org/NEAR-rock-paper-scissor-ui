import { useHistory } from "react-router";
import RegularButton from "../components/Button";
import Flex from "../components/Flex";
import { AppProps } from "../interfaces/IApp.interface";

const Login: React.FC<AppProps> = () => {
	const history = useHistory();

	return (
		<Flex style={{ minHeight: "100vh" }}>
			<RegularButton onClick={() => history.push("/")}>Log In</RegularButton>
		</Flex>
	);
};

export default Login;
