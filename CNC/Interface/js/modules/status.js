(function(exports) {

	const URI = "http://botnet.artificial.engineering/api/Status";

	/**
	 * Get all status objects
	 * GET    /api/Status
	 */
	exports.index = function(callback) {
		魚.http.get(URI)
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				if (callback) {
					callback(data);
				}
			});
	}

	/**
	 * Update the specified status object
	 * PATCH    /api/Status/{id}
	 */
	exports.update = function(id, status) {
		魚.http.patch(URI, {
				id: id,
				status: status
			})
			.then(function(response) {
				console.log(response);
				//TODO: if response good reload window or sth idk
			})
			.then(function(data) {
				// does this even have data???? idk nice doc kappa
			});
	}

})(this.魚.status = {});
