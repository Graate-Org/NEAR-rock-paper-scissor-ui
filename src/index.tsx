import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import getConfig from "./config";
import * as nearAPI from "near-api-js";
import "./index.css";

interface IWindow extends Window {
	nearInitPromise: any;
}

// Initializing contract
const initContract = async () => {
	const nearConfig = getConfig(process.env.NODE_ENV || "testnet");

	// Initializing connection to the NEAR TestNet
	const near = await nearAPI.connect({
		deps: {
			keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
		},
		...nearConfig,
	});

	// Needed to access wallet
	const wallet = new nearAPI.WalletConnection(near, "NEAR Rock Paper Scissor");

	// Load in account data
	let currentUser;
	if (wallet.getAccountId()) {
		currentUser = {
			accountId: wallet.getAccountId(),
			balance: (await wallet.account().state()).amount,
		};
	}

	// Initializing our contract APIs with contract name and configuration
	const contract = new nearAPI.Contract(
		wallet.account(),
		nearConfig.contractName as string,
		{
			viewMethods: [
				"getRooms",
				"getRoomMembers",
				"getRoomRequests",
				"getRoomGames",
				"getRoom",
				"getProfile",
				"getGamePlayers",
				"getGameStakers",
				"getWinner",
				"getGame"
			],
			changeMethods: [
				"createRoom",
				"joinPublicRoom",
				"requestToJoinPrivateRoom",
				"approveMember",
				"createGame",
				"play",
				"stake",
				"payout",
			],
		}
	);

	return { contract, currentUser, nearConfig, wallet };
};

(window as unknown as IWindow).nearInitPromise = initContract().then(
	({ contract, currentUser, nearConfig, wallet }) => {
		ReactDOM.render(
			<App
				contract={contract}
				currentUser={currentUser}
				nearConfig={nearConfig}
				wallet={wallet}
			/>,
			document.getElementById("root")
		);
	}
);
