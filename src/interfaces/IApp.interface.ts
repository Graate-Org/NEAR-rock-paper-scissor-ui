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
		_walletBaseUrl: string;
		_authDataKey: string;
		_keyStore: any;
		_authData: any;
		_networkId: string;
		_near: any;
		_connectedAccount: any;
	};
}
