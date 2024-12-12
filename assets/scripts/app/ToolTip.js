// eslint-disable-next-line no-unused-vars
import Cmd, { doSomething } from "./Component.js";

export class Tooltip extends Cmd {
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
