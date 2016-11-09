(function() {

	let createStatusTable = function(data) {
		let table = document.getElementById("status-overview-body");
		table.innerHTML = "";

		for (let row of data) {
			let tr = document.createElement("tr");

			for (let [key, value] of Object.entries(row)) {
				let td = document.createElement("td");
				td.textContent = value;
				tr.append(td);
			}

			let actions = document.createElement("td");
			let id = tr.children[0].textContent;
			actions.innerHTML = '<button class="btn-primary" onclick="toggle(' + id + ')">Toggle</button>';
			tr.append(actions);

			table.append(tr);
		}
	}

	魚.status.index(function(data) {
		createStatusTable(data);
	});

})();

function toggle(id) {
	魚.status.update(id, true);
}
