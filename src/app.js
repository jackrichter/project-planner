import { ProjectList } from "./app/ProjectList.js";

// The GlobalThis object = window object in modules
globalThis.DEFAULT_VALUE = "MAX";

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
		analyticsScript.src = "src/Utility/Analytics.js";
		analyticsScript.defer = true;
		document.head.append(analyticsScript);
	}
}

App.init();
