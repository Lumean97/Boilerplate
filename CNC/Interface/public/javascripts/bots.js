const api = '//localhost:8000/api/tasks';

let dataTable = false;
let running = false;

let tasks = {};

function update() {
	if (running) toggle();

	let request = new Request(api, {
		method: 'GET',
		mode: 'CORS',
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	});

	fetch(request).then(response => response.json()).then((data) => {
		tasks = data;
		render();
	});
}

function render() {
	$('tr:has(td)').remove();
	$.each(tasks, (index, item) => {
		let $tr = $('<tr>').append(
			$('<td>').text(item.id),
			$('<td>').text(item.type),
			$('<td>').text(item.data.input),
			$('<td>').text(item.data.output),
			$('<td>').html('')
		);
		$('#table').append($tr);
	});

	if (! dataTable) {
		$('#table').DataTable({
			"paging": false,
			"info": false,
			"searching": false
		});
		dataTable = true;
	}
}

function toggle() {
	running = !running;

	if (running) {
		$('.controls').html('<button class="btn btn-danger" onclick="toggle()"><i class="fa fa-pause" aria-hidden /> Pause</button>');
		$('td:last-child').html('<i class="fa fa-spinner fa-spin"></i>');

		$.each(tasks, (index, item) => {
			// calculate hash
			// send POST to /api/Reports (id, data.output)
			// update last column with response
		});
	} else {
		$('.controls').html('<button class="btn btn-success" onclick="toggle()"><i class="fa fa-play" aria-hidden /> Resume</button>');
		$('td:last-child').html('');
	}
}

update();
