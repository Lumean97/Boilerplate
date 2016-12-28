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
			$('<td>').text(item.data.output)
		);
		$('#table').append($tr);
	});
}

update();

window.setInterval(update, 10000);
