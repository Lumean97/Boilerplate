const api = '//localhost:8000/api/tasks';

let tasks = {};

function update() {
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
		console.log(item);
		let $tr = $('<tr>').append(
			$('<td>').text(item.id),
			$('<td>').text(item.type),
			$('<td>').text(item.data.input),
			$('<td>').text(item.data.output),
			$('<td>').html('<a class="btn btn-sm btn-default disabled">Delete</a>')
		);
		$('#table').append($tr);
	});
}

$('#create-task').submit((e) => {
	e.preventDefault();

	let input = $('#task-input').val();
	let type = $('#task-type').val();

	let payload = JSON.stringify({
		type: type,
		data: {
			input: input
		}
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
});

update();

window.setInterval(update, 10000);
