export function get(uri) {
	let request = new Request(uri, {
		method: 'GET',
		mode: 'cors',
		redirect: 'follow',
		headers: new Headers({
			'Content-Type': 'text/plain'
		})
	});

	return fetch(request);
}
