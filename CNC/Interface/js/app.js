const LIVE_RELOAD = false;

document.addEventListener("DOMContentLoaded", function() {
	updateStatusOverview();
	if (LIVE_RELOAD)
		window.setInterval(updateStatusOverview, 30000); // poll for new data every 30 seconds
});

function updateStatusOverview() {
	console.log("Updating....");
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://botnet.artificial.engineering/api/Status');
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');

	xhr.onload = function() {
		var data = xhr.response;
		if (data !== null && data !== undefined) {
			createStatusOverviewTable(data);
		}
	}

	xhr.send(null);
}

function createStatusOverviewTable(data) {
	var table = document.getElementById("status-overview-body");
	table.innerHTML = "";
	for (var i = 0; i < data.length; i++) {
		var row = document.createElement("tr");
		for (var k in data[i]) {
			var column = document.createElement("td");
			column.innerHTML = data[i][k];
			row.appendChild(column);
		}
		table.appendChild(row);
	}
}
