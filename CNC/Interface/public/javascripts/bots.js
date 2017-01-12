const api 			= '//localhost:8000/api/tasks';
const reportApi = '//localhost:8000/api/reports';
const md5Api		= '//localhost:3000/api/md5';
const sha256Api	= '//localhost:3000/api/sha-256';

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
			$('<td>').html(item.sync)
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
			let api = (item.type !== 'hash-sha256' ? md5Api : sha256Api); // use md5 for crack-md5 and hash-md5

			let payload = JSON.stringify({
				input: item.data.input
			});

			let request = new Request(md5Api, {
				method: 'POST',
				body: payload,
				headers: new Headers({
					'Content-Type': 'application/json',
					'Token': 'Idgz1PE3zO9iNc0E3oeH3CHDPX9MzZe3'
				})
			});

			let jobsRunning = 0;

			fetch(request).then((response) => response.text()).then((hash) => {
				jobsRunning++;

				let reportPayload = JSON.stringify({
					id: item.id,
					data: {
						input: item.data.input,
						output: hash
					}
				});

				let reportRequest = new Request(reportApi, {
					method: 'POST',
					mode: 'CORS',
					body: reportPayload,
					headers: new Headers({
						'Content-Type': 'application/json',
						'Token': 'Idgz1PE3zO9iNc0E3oeH3CHDPX9MzZe3'
					})
				});

				fetch(reportRequest).then((response) => response.json()).then((data) => {
					jobsRunning--;

					if (data.message == 'OK') {
						item.sync = '<span style="color:green;">OK</span>';
						item.data.output = hash;
					} else {
						item.sync = '<span style="color:red;">NOT OK</span>';
					}

					render();

					// At least it works ¯\_(ツ)_/¯
					if (jobsRunning <= 0) {
						$('.controls').html('<button class="btn btn-success" onclick="toggle()"><i class="fa fa-play" aria-hidden /> Resume</button>');
					}
				});
			});
		});
	} else {
		$('.controls').html('<button class="btn btn-success" onclick="toggle()"><i class="fa fa-play" aria-hidden /> Resume</button>');
		let newHtml = $('td:last-child').html() == '<i class="fa fa-spinner fa-spin"></i>' ? '' : $('td:last-child').html();
		$('td:last-child').html(newHtml);
	}
}

update();
