import { get, post } from "./helpers/request";

export class ResourceController {

	constructor(route) {
		this.route = route;
	}

	index() {
		if (this.route.methods.includes('index')) {
			return get(this.route.uri);
		}
	}

	store(resource) {

	}

	update(resource) {

	}

	delete(resource) {

	}

}
