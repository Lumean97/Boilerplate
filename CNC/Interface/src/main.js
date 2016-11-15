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
			$("#status-overview").dataTable();
		});
}

export function updateTasks() {
	tasksController.index()
		.then(response => response.json())
		.then(function(data) {
			app.tasks = data;
			renderTasksTable();

			/* Dieser Moment, wenn nichts geht und nichts Sinn macht.. wait, gulp is not even running */
			console.log("Hello"); // I'm keeping this as pet
			$("#tasks-overview").dataTable();
		});
}

window.setInterval(updateStatus, 100000);
window.setInterval(updateTasks, 100000);

window.updateTasks = updateTasks();
window.updateStatus = updateStatus();
