import { ProjectItem } from "./ProjectItem.js";
import { DOMHelper } from "../utility/DOMHelper.js";

export class ProjectList {
	projects = [];

	constructor(type) {
		this.type = type;
		const prjItems = document.querySelectorAll(`#${type}-projects li`);
		for (const item of prjItems) {
			this.projects.push(new ProjectItem(item.id, this.switchProject.bind(this), this.type));
		}
		this.connectDroppable();
	}

	connectDroppable() {
		const list = document.querySelector(`#${this.type}-projects ul`);

		list.addEventListener("dragenter", event => {
			if (event.dataTransfer.types[0] === "text/plain") {
				list.parentElement.classList.add("droppable");
				event.preventDefault();
			}
		});

		list.addEventListener("dragover", event => {
			if (event.dataTransfer.types[0] === "text/plain") {
				event.preventDefault();
			}
		});

		list.addEventListener("dragleave", event => {
			if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
				list.parentElement.classList.remove("droppable");
			}
		});

		list.addEventListener("drop", event => {
			const projId = event.dataTransfer.getData("text/plain");
			if (this.projects.find(p => p.id === projId)) {
				return;
			}
			document.getElementById(projId).querySelector("button:last-of-type").click();
			list.parentElement.classList.remove("droppable");
			// event.preventDefault(); // Not required in this case
		});
	}

	setSwitchHandlerFunction(switchHandlerFunction) {
		this.switchHandler = switchHandlerFunction;
	}

	// Add to the other project's list
	addProject(project) {
		this.projects.push(project);
		DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
		project.update(this.switchProject.bind(this), this.type);
	}

	// Remove from one project's list
	switchProject(projectId) {
		// const prjIndex = this.projects.findIndex((p) => p.id === projectId);
		// this.projects.splice(prjIndex, 1);
		this.switchHandler(this.projects.find(p => p.id === projectId));
		this.projects = this.projects.filter(prj => prj.id !== projectId);
	}
}
