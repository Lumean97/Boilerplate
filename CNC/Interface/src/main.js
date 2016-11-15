import "babel-polyfill";

import { ResourceController } from "./controller";

import { renderTasksTable, renderStatusTable } from "./helpers/html"
import { route } from "./helpers/http";

export let app = app || {};
app.status = {};
app.tasks = {};

let statusController = new ResourceController(route("status"));
let tasksController = new ResourceController(route("tasks"));

updateStatus();
updateTasks();

export function updateStatus() {
	statusController.index()
		.then(response => response.json())
		.then(function(data) {
			app.status = data;
			renderStatusTable();
		});
}

export function updateTasks() {
	tasksController.index()
		.then(response => response.json())
		.then(function(data) {
			app.tasks = data;
			renderTasksTable();
		});
}

window.setInterval(updateStatus, 100000);
window.setInterval(updateTasks, 100000);

