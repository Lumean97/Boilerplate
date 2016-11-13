import "babel-polyfill";

import { ResourceController } from "./controller";

import { route } from "./helpers/http";
import { buildTasksTable, buildStatusTable } from "./helpers/html"

{
	let statusController = new ResourceController(route("status"));
	let tasksController = new ResourceController(route("tasks"));

	/*
	tasksController.index()
		.then(response => response.json())
		.then(data => buildTasksTable(data));*/

	statusController.index()
		.then(response => response.json())
		.then(data => buildStatusTable(data));

	window.toggle = function(id, status) {
		statusController.updateStatus(id, status);
	}

}
