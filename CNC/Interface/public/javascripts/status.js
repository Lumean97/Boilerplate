const api = '//localhost:8000/api/status';

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
			$('<td>').html('TODO')
		);
		$('#table').append($tr);
	});
}

update();

window.setInterval(update, 10000);
