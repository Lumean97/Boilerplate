import { API_URI } from "../config";

/**
  * GET			/api/Object					index		Show all objects
	* GET   	/api/Object/{id}		edit		Show edit form for object
	* PATCH  	/api/Object/{id}		update	Update object
	* DELETE  /api/Object/{id}		delete	Delete object
	* PUT			/api/Object					store		Save new object
	*/
let routes = new Map([
	['status', ['index', 'update']],
	['tasks', ['index', 'store', 'delete']]
]);

export function route(route) {
	if (routes.has(route)) {
		return {
			'uri': API_URI + route + "/",
			'methods': routes.get(route)
		}
	}
}
