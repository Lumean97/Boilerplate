import { app, updateTasks } from "../main";

import { post, del } from "./request";
import { route } from "./http";
import { findStatusById, findTaskIndexById } from "./model";

export function renderTasksTable() {
	let table = document.getElementById("tasks-overview-body");
	table.innerHTML = "";

	for (let row of app.tasks) {
		let tr = document.createElement("tr");

		for (let [key, value] of Object.entries(row)) {
			if (key !== "data") { // (ಥ﹏ಥ)
				let td = document.createElement("td");
				td.textContent = value;
				tr.append(td);
			}
		}

		let input = document.createElement("td");
		input.textContent = row.data.input;
		tr.append(input);

		let output = document.createElement("td");
		output.textContent = row.data.output;
		tr.append(output);

		let id = tr.children[0].textContent;
		let actions = document.createElement("td");
		actions.innerHTML = "<button class='btn btn-danger' onclick='deleteTask(" + id + ")'>Delete</button>";
		tr.append(actions);

		table.append(tr);
	}
}

export function renderStatusTable() {
	let table = document.getElementById("status-overview-body");
	table.innerHTML = "";

	for (let row of app.status) {
		let tr = document.createElement("tr");

		for (let [key, value] of Object.entries(row)) {
			let td = document.createElement("td");
			td.textContent = value;
			tr.append(td);
		}

		let id = tr.children[0].textContent;
		let workload = tr.children[tr.childElementCount - 1].textContent;
		let status = (workload == 0 ? false : true);

		let actions = document.createElement("td");

		actions.innerHTML = buildToggleButton(id, status);

		tr.append(actions);

		table.append(tr);
	}
}

function buildToggleButton(id, status) {
	if (! status)
		return "<button class='btn btn-primary' onclick='toggle(" + id + "," + status + ")'>Start</button>";
	return "<button class='btn btn-danger' onclick='toggle(" + id + "," + status + ")'>Stop</button>";
}

window.toggle = function (id, status) {
	status = !status;

	let payload = JSON.stringify({
		id: id,
		status: status
	});

	post(route("status").uri, payload).then(function (response) {
		if (response.status == 200) {
			let status = findStatusById(id);
			status.workload = (status.workload == 1 ? 0 : 1);
			renderStatusTable();
		}
	});
}

window.deleteTask = function (id) {
	let uri = route("tasks").uri + id;

	del(uri).then(function (response) {
		// is actually 405 but meh

		if (response.status == 200) {
			let index = findTaskIndexById(id);
			app.tasks.splice(index, 1);
			renderTasksTable();
		}
	});
}

window.createTask = function() {
	console.log("lol");
	let input = document.getElementById("input").value;
	let type = document.getElementById("type").value;

	let payload = JSON.stringify({
		type: type,
		data: {
			input: input
		}
	});

	post(route("tasks").uri, payload).then(function (response) {
		if (response.status == 200) {
			updateTasks();
			document.getElementById("input").value = "(╯°□°）╯︵ ┻━┻";
		}
	});
}
