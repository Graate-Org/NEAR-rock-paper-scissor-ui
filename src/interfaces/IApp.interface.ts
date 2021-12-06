export interface AppProps {
	contract?: any;
	currentUser?: {
		accountId: string;
		balance: string;
	};
	nearConfig?: {
		networkId?: string;
		nodeUrl?: string;
		contractName?: string;
		walletUrl?: string;
		helperUrl?: string;
		keyPath?: string;
		masterAccount?: string;
	};
	wallet?: {
		account?: () => any;
		getAccountId?: () => any;
		isSignedIn?: () => boolean;
		requestSignTransactions?: (
			transactions: any[],
			callbackUrl?: string,
			meta?: string
		) => Promise<void>;
		signout?: () => void;
		requestSignIn?: (
			contractId?: string,
			title?: string,
			successUrl?: string,
			failureUrl?: string
		) => Promise<void>;
	};
}
