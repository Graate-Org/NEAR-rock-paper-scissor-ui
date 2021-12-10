export interface Game {
	id: string;
	numOfPlayers: number;
	players: {
		id: string;
		name: string;
		choice: "ROCK" | "PAPER" | "SCISSOR";
		txFee: number;
	}[];
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
