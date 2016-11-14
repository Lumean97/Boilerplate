import { app } from "../main";

export function findStatusById(id) {
	for (let status of app.status) {
		if (status.id == id) return status;
	}
}
