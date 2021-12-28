export interface Game {
	id: string;
	numOfPlayers: number;
	players: Player[];
	stakers: {
		id: string;
		betOn: string;
		name: number;
		stake: number;
	}[];
	createdBy: string;
	createdAt: string;
	status: number;
	winners: {
		gameId: string;
		accountId: string;
	}[];
	pool: number;
	roomId?: string;
}

export interface Player {
	id: string;
	name: string;
	choice: 0 | 1 | 2;
	txFee: string;
	timePlayed: string;
}
