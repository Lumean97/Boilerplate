const api = '//localhost:8000/api/status';

let dataTable = false;

let statuses = {};

let update = function() {
	let request = new Request(api, {
		method: 'GET',
		mode: 'CORS',
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	});

	fetch(request).then(response => response.json()).then((data) => {
		statuses = data;
		render();
	});
};

let render = function() {
	$('tr:has(td)').remove();
	$.each(statuses, (index, item) => {
		let $tr = $('<tr>').append(
			$('<td>').text(item.id),
			$('<td>').text(item.ip),
			$('<td>').text(item.task),
			$('<td>').text(item.workload),
			(item.workload === 1 ? $('<td>').html('<a class="btn btn-sm btn-danger" ' +
				'onclick="toggle(' + item.id + ',' + item.workload + ')"><i class="fa fa-pause" aria-hidden></i>Stop</a>') : $('<td>').html('<a class="btn btn-sm btn-success" ' +
				'onclick="toggle(' + item.id + ',' + item.workload + ')"><i class="fa fa-play" aria-hidden></i>Start</a>')
			)
		);
		$('#table').append($tr);
	});

	if (!dataTable) {
		$('#table').DataTable({
			"paging": false,
			"info": false
		});
		dataTable = true;
	}
};

window.toggle = function(id, workload) {
	let status = (workload === 1 ? false : true); // new status

	let payload = JSON.stringify({
		id: id,
		status: status
	});

	let request = new Request(api, {
		method: 'POST',
		mode: 'CORS',
		body: payload,
		headers: new Headers({
			'Content-Type': 'application/json',
			'Token': 'Idgz1PE3zO9iNc0E3oeH3CHDPX9MzZe3'
		})
	});

	fetch(request).then((response) => {
		if (response.status === 200) {
			update();
			render();
		}
	});
};

update();

window.setInterval(update, 10000);
