import { status } from "./modules/status";
import { tasks } from "./modules/tasks";
import { buildTable } from "./modules/html";

(function() {
	status((data) => {
		buildTable("status-overview-body", data, function(tr) {
			let actions = document.createElement("td");
			let id = tr.children[0].textContent;
			actions.innerHTML = '<button class="btn-primary" onclick="toggle(' + id + ')">Toggle</button>';
			tr.append(actions);
		});
	});
})();
