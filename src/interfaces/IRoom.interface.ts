type RequestStatus = "CREATED" | "ACCEPTED" | "REJECTED";

export interface Room {
	id: string;
	isVisible: 0 | 1;
	members: {
		roomId: string;
		accountId: string;
	}[];
	owner: string;
	requests: {
		roomId: string;
		accountId: string;
		state: RequestStatus;
	}[];
	createdAt: string;
}

export interface RoomRequest {
	accountId: string;
	roomId: string;
	state: 0 | 1 | 2;
}
