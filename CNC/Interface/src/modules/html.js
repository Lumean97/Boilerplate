export function buildTable(tableId, data, actionBuilder = undefined) {
	let table = document.getElementById(tableId);
	table.innerHTML = "";

	for (let row of data) {
		console.log(row);
		let tr = document.createElement("tr");

		for (let [key, value] of Object.entries(row)) {
			let td = document.createElement("td");
			td.textContent = value;
			tr.append(td);
		}

		if (actionBuilder) {
			actionBuilder(tr);
		}

		table.append(tr);
	}
}
