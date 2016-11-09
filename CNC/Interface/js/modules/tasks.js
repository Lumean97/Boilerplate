(function(exports) {

	const URI = "http://botnet.artificial.engineering/api/Tasks";

	/**
	 * Get all task objects
	 * GET    /api/Tasks
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
	 * Create a new task object
	 * POST    /api/Tasks/{id}
	 */
	exports.store = function(task) {
		魚.http.post(URI, task)
			.then(function(response) {
				// idk do things i guess
			})
			.then(function(data) {
				// render overview or sth idk
			});
	}

	/**
	 * Delete the specified task object
	 * DELETE    /api/Tasks/{id}
	 */
	exports.destroy = function(task) {
		魚.http.delete(URI, task)
			.then(function(response) {
				// idk do things i guess
			})
			.then(function(data) {
				// render overview or sth idk
			});
	}

})(this.魚.tasks = {});
