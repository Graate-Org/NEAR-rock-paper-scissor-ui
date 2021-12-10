import moment from "moment";

export const parseDate = (timestamp: string) => {
	const millisecs = Math.round(Number(timestamp) / 1000000);
	return moment(millisecs).format("Do MMMM YYYY");
};
