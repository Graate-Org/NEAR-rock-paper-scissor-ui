import { ReactElement } from "react";
import { useHistory } from "react-router";
import RegularButton from "../components/Button";
import Flex from "../components/Flex";

export default function Login(): ReactElement {
	const history = useHistory();

	return (
		<Flex style={{ minHeight: "100vh" }}>
			<RegularButton onClick={() => history.push("/")}>Log In</RegularButton>
		</Flex>
	);
}
