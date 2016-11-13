export function get(uri) {
	let request = new Request(uri, {
		method: 'GET',
		mode: 'CORS',
		headers: new Headers({
			'Content-Type': 'text/json'
		})
	});

	return fetch(request);
}
