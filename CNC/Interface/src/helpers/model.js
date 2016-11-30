import { app } from "../main";

export function findStatusById(id) {
	for (let status of app.status) {
		if (status.id == id) return status;
	}
}

export function findTaskById(id) {
	for (let task of app.tasks) {
		if (task.id == id) return task;
	}
}

export function findTaskIndexById(id) {
	for (let i = 0; i < app.tasks.length; i++) {
		if (app.tasks[i].id == id) return i;
	}
}
