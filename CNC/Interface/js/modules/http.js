(function(exports) {

	let _fetch = function(method, uri) {
		let request = new Request(uri, {
			method: method,
			mode: 'cors',
			redirect: 'follow',
			headers: new Headers({
				'Content-Type': 'text/plain'
			})
		});

		return fetch(request);
	}

	exports.get = function(uri) {
		return _fetch('GET', uri);
	}

	exports.post = function(uri, payload) {

	}

})(this.魚.http = {});
