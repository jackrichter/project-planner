export class DOMHelper {
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
