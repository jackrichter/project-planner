class DOMHelper {
	static moveElement(elementId, newDestinationSelector) {
		const element = document.getElementById(elementId);
		const destinationElement = document.querySelector(newDestinationSelector);
		destinationElement.append(element);
		element.scrollIntoView({ behavior: "smooth" });
	}

	static clearEventListeners(element) {
		const clonedElement = element.cloneNode(true);
		// The cloned element doesn't have it's previous event listeners
		element.replaceWith(clonedElement);
		return clonedElement;
	}
}

class Component {
	hostElement;
	insertBefore;

	constructor(hostElementId, insertBefore = false) {
		if (hostElementId) {
			this.hostElement = document.getElementById(hostElementId);
		} else {
			this.hostElement = document.body;
		}
		this.insertBefore = insertBefore;
	}

	detach() {
		if (this.element) {
			this.element.remove();

			// For older Browsers
			// this.element.parentElement.removeChild(this.element);
		}
	}

	attach() {
		// document.body.append(this.element);
		this.hostElement.insertAdjacentElement(
			this.insertBefore ? "afterbegin" : "beforeend",
			this.element
		);
	}
}

class Tooltip extends Component {
	element;

	constructor(closeNotifierFn, text, hostElementId) {
		// super("finished-projects", true);
		super(hostElementId);
		this.closeNotifier = closeNotifierFn;
		this.text = text;
		this.create();
	}

	// The 'this' will always refer to the class when using an arrow function (no need to bind 'this' to the class in the event listener)!
	closeTooltip = () => {
		this.detach();
		this.closeNotifier();
	};

	create() {
		const tooltipElement = document.createElement("div");
		tooltipElement.className = "card";
		// tooltipElement.textContent = this.text;
		const tooltipTemplate = document.getElementById("tooltip");
		const tooltipBody = document.importNode(tooltipTemplate.content, true);
		tooltipBody.querySelector("p").textContent = this.text;
		tooltipElement.append(tooltipBody);

		const hostElPosLeft = this.hostElement.offsetLeft;
		const hostElPosTop = this.hostElement.offsetTop;
		const hostElHight = this.hostElement.clientHeight;
		const parentElementScrolling = this.hostElement.parentElement.scrollTop;

		const x = hostElPosLeft + 20;
		const y = hostElPosTop + hostElHight - parentElementScrolling - 10;

		tooltipElement.style.position = "absolute";
		tooltipElement.style.left = x + "px";
		tooltipElement.style.top = y + "px";

		tooltipElement.addEventListener("click", this.closeTooltip);
		this.element = tooltipElement;
	}
}

class ProjectItem {
	hasActiveTooltip = false;

	constructor(id, updateProjectListsFunction, type) {
		this.id = id;
		this.updateProjectListsHandler = updateProjectListsFunction;
		this.connectInfoButton();
		this.connectSwitchButton(type);
		this.connectDrag();
	}

	showMoreInfoHandler() {
		if (this.hasActiveTooltip) {
			return;
		}
		const projectElement = document.getElementById(this.id);
		const tooltipText = projectElement.dataset.extraInfo;
		// projectElement.dataset.someInfo = "Test";
		// console.log(projectElement.dataset);
		const tooltip = new Tooltip(
			() => {
				this.hasActiveTooltip = false;
			},
			tooltipText,
			this.id
		);
		tooltip.attach();
		this.hasActiveTooltip = true;
	}

	connectDrag() {
		const item = document.getElementById(this.id);

		item.addEventListener("dragstart", (event) => {
			event.dataTransfer.setData("text/plain", this.id);
			event.dataTransfer.effectAllowed = "move";
		});

		item.addEventListener("dragend", (event) => {
			console.log(event);
		});
	}

	connectInfoButton() {
		const projectItemElement = document.getElementById(this.id);
		const moreInfoBtn = projectItemElement.querySelector("button:first-of-type");
		moreInfoBtn.addEventListener("click", this.showMoreInfoHandler.bind(this));
	}

	// Switch refers to the finish button
	connectSwitchButton(type) {
		const projectItemElement = document.getElementById(this.id);
		let switchBtn = projectItemElement.querySelector("button:last-of-type");
		// Do not accumulate event listeners. Always, use a fresh one
		switchBtn = DOMHelper.clearEventListeners(switchBtn);
		switchBtn.textContent = type === "active" ? "Finish" : "Activate";
		switchBtn.addEventListener("click", this.updateProjectListsHandler.bind(null, this.id));
	}

	update(updateProjectListsFn, type) {
		this.updateProjectListsHandler = updateProjectListsFn;
		this.connectSwitchButton(type);
	}
}

class ProjectList {
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

		list.addEventListener("dragenter", (event) => {
			if (event.dataTransfer.types[0] === "text/plain") {
				list.parentElement.classList.add("droppable");
				event.preventDefault();
			}
		});

		list.addEventListener("dragover", (event) => {
			if (event.dataTransfer.types[0] === "text/plain") {
				event.preventDefault();
			}
		});

		list.addEventListener("dragleave", (event) => {
			if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
				list.parentElement.classList.remove("droppable");
			}
		});

		list.addEventListener("drop", (event) => {
			const projId = event.dataTransfer.getData("text/plain");
			if (this.projects.find((p) => p.id === projId)) {
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
		this.switchHandler(this.projects.find((p) => p.id === projectId));
		this.projects = this.projects.filter((prj) => prj.id !== projectId);
	}
}

class App {
	static init() {
		const activeProjectList = new ProjectList("active");
		const finishedProjectList = new ProjectList("finished");

		activeProjectList.setSwitchHandlerFunction(
			finishedProjectList.addProject.bind(finishedProjectList)
		);
		finishedProjectList.setSwitchHandlerFunction(
			activeProjectList.addProject.bind(activeProjectList)
		);

		const timerId = setTimeout(this.startAnalytics, 3000);
		document.getElementById("stop-analytics-btn").addEventListener("click", () => {
			clearTimeout(timerId);
		});
	}

	static startAnalytics() {
		const analyticsScript = document.createElement("script");
		analyticsScript.src = "assets/scripts/analytics.js";
		analyticsScript.defer = true;
		document.head.append(analyticsScript);
	}
}

App.init();
