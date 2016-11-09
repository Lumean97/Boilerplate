import {get} from "./http";

const URI = "http://botnet.artificial.engineering/api/Tasks";

export function tasks(callback) {
	fetch(URI)
		.then(function (response) {
			return response.json();
		}).then(function (data) {
		callback(data);
	});
}
