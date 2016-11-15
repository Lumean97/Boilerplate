export function get(uri) {
	let request = new Request(uri, {
		method: 'GET',
		mode: 'CORS',
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	});

	return fetch(request);
}

export function post(uri, payload) {
	let request = new Request(uri, {
		method: 'POST',
		mode: 'CORS',
		body: payload,
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	});

	return fetch(request);
}

export function del(uri) {
	let request = new Request(uri, {
		method: 'DELETE',
		mode: 'CORS',
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	});

	return fetch(request);
}
