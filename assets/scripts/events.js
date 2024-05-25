"use strict";

const btn = document.querySelector("button");

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
	event.preventDefault();
	console.log(event);
});

// Event Propagation; Bubbling phase
const div = document.querySelector("div");

// Switch this event listener to the Capturing phase with 'true'
// div.addEventListener(
// 	"click",
// 	(event) => {
// 		console.log("CLICKED DIV");
// 		console.log(event);
// 	},
// 	true
// );
div.addEventListener("click", (event) => {
	console.log("CLICKED DIV");
	console.log(event);
});

btn.addEventListener("click", (event) => {
	event.stopPropagation();
	console.log("CLICKED BUTTON");
	console.log(event);
});

// Without Event Delegation
// const listItems = document.querySelectorAll("li");
// listItems.forEach((listItem) => {
// 	listItem.addEventListener("click", (e) => {
// 		e.target.classList.toggle("highlight");
// 	});
// });

// With Event Delegation
const list = document.querySelector("ul"); // <= Obs. 'ul'
list.addEventListener("click", (event) => {
	// console.log(event.currentTarget);
	// event.currentTarget.classList.toggle("highlight"); // <= Obs. 'currentTarget'
	event.target.closest("li").classList.toggle("highlight"); // OBS !!!
});
