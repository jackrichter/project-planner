export class Component {
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
