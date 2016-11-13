export function buildTasksTable(data) {
	let table = document.getElementById("tasks-overview-body");
	table.innerHTML = "";

	for (let row of data) {
		let tr = document.createElement("tr");

		for (let [key, value] of Object.entries(row)) {
			let td = document.createElement("td");
			td.textContent = value;
			tr.append(td);
		}

		table.append(tr);
	}
}

export function buildStatusTable(data) {
	let table = document.getElementById("status-overview-body");
	table.innerHTML = "";

	for (let row of data) {
		let tr = document.createElement("tr");

		for (let [key, value] of Object.entries(row)) {
			let td = document.createElement("td");
			td.textContent = value;
			tr.append(td);
		}

		let id = tr.children[0].textContent;
		let workload = tr.children[tr.childElementCount - 1].textContent;
		let status = (workload === 0 ? false : true);

		let actions = document.createElement("td");

		actions.innerHTML = buildToggleButton(id, status);

		tr.append(actions);

		table.append(tr);
	}
}

function buildToggleButton(id, status) {
	if (status)
		return "<button class='btn btn-primary' onclick='toggle(" + id + "," + status + ")'>Start</button>";
	return "<button class='btn btn-danger' onclick='toggle(" + id + "," + status + ")'>Stop</button>";
}
