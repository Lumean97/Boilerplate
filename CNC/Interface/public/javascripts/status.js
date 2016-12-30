const api = '//localhost:8000/api/status';

let dataTable = false;

let statuses = {};

function update() {
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
}

function render() {
	$('tr:has(td)').remove();
	$.each(statuses, (index, item) => {
		let $tr = $('<tr>').append(
			$('<td>').text(item.id),
			$('<td>').text(item.ip),
			$('<td>').text(item.task),
			$('<td>').text(item.workload),
			$('<td>').html('<a class="btn btn-sm btn-default" onclick="toggle(' + item.id + ',' + item.workload + ')">Toggle</a>')
		);
		$('#table').append($tr);
	});

	if (! dataTable) {
		$('#table').DataTable({
			"paging": false,
			"info": false
		});
		dataTable = true;
	}
}

function toggle(id, workload) {
	let status = (workload == 1 ? false : true); // new status

	let payload = JSON.stringify({
		id: id,
		status: status
	});

	let request = new Request(api, {
		method: 'POST',
		mode: 'CORS',
		body: payload,
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	});

	fetch(request).then((response) => {
		if (response.status == 200) {
			update();
			render();
		}
	});
}

update();

window.setInterval(update, 10000);
