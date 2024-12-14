export class DOMHelper {
	constructor() {}

	static clearEventListeners(element) {
		const clonedElement = element.cloneNode(true);
		// The cloned element doesn't have it's previous event listeners
		element.replaceWith(clonedElement);
		return clonedElement;
	}

	static moveElement(elementId, newDestinationSelector) {
		const element = document.getElementById(elementId);
		const destinationElement = document.querySelector(newDestinationSelector);
		destinationElement.append(element);
		element.scrollIntoView({ behavior: "smooth" });
	}

	clearEventListeners(element) {
		const clonedElement = element.cloneNode(true);
		// The cloned element doesn't have it's previous event listeners
		element.replaceWith(clonedElement);
		return clonedElement;
	}

	moveElement(elementId, newDestinationSelector) {
		const element = document.getElementById(elementId);
		const destinationElement = document.querySelector(newDestinationSelector);
		destinationElement.append(element);
		element.scrollIntoView({ behavior: "smooth" });
	}
}

export const { clearEventListeners, moveElement } = DOMHelper;
