(function(exports) {

	exports.get = function(uri) {
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

	exports.post = function(uri, payload) {

	}

	exports.patch = function(uri, payload) {

	}

	exports.delete = function(uri, id) {

	}

})(this.魚.http = {});
