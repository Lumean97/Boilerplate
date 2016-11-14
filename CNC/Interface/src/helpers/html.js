import { app } from "../main";

import { post } from "./request";
import { route } from "./http";
import { findStatusById } from "./model";

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
	if (! window.toggle) {
		window.toggle = toggle;
	}

	if (! status)
		return "<button class='btn btn-primary' onclick='toggle(" + id + "," + status + ")'>Start</button>";
	return "<button class='btn btn-danger' onclick='toggle(" + id + "," + status + ")'>Stop</button>";
}

function toggle(id, status) {
	console.log("Passed status (=current status): " + status);
	status = !status;
	console.log("Post-toggle (= should be sent in request): " + status);

	let payload = JSON.stringify({
		id: id,
		status: status
	});

	console.log(payload);

	post(route("status").uri, payload).then(function (response) {
		if (response.status == 200) {
			let status = findStatusById(id);
			status.workload = (status.workload == 1 ? 0 : 1);
			renderStatusTable();
		}
	});
}
