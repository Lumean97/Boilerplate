import { get, post } from "./helpers/request";

export class ResourceController {

	constructor(route) {
		this.route = route;
	}

	index(callback) {
		if (this.route.methods.includes('index')) {
			return get(this.route.uri);
		}
	}

	store(resource) {

	}

	update(resource) {

	}

	updateStatus(id, status) {
		post(this.route.uri + id)
			.then(response => response.json())
			.then(data => console.log(data));
	}

	delete(resource) {

	}

}
