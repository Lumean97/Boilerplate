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

			table.append(tr);
		}
	}

	魚.http.get("http://botnet.artificial.engineering/api/Status").then(function(response) {
		return response.json();
	})
	.then(function(json) {
		createStatusTable(json);
	});

})();
