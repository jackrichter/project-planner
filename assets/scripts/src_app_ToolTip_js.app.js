"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkpractice_oop_01_starting_setup"] = self["webpackChunkpractice_oop_01_starting_setup"] || []).push([["src_app_ToolTip_js"],{

/***/ "./src/app/Component.js":
/*!******************************!*\
  !*** ./src/app/Component.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Component),\n/* harmony export */   doSomething: () => (/* binding */ doSomething)\n/* harmony export */ });\nclass Component {\r\n\thostElement;\r\n\tinsertBefore;\r\n\r\n\tconstructor(hostElementId, insertBefore = false) {\r\n\t\tif (hostElementId) {\r\n\t\t\tthis.hostElement = document.getElementById(hostElementId);\r\n\t\t} else {\r\n\t\t\tthis.hostElement = document.body;\r\n\t\t}\r\n\t\tthis.insertBefore = insertBefore;\r\n\t}\r\n\r\n\tdetach() {\r\n\t\tif (this.element) {\r\n\t\t\tthis.element.remove();\r\n\r\n\t\t\t// For older Browsers\r\n\t\t\t// this.element.parentElement.removeChild(this.element);\r\n\t\t}\r\n\t}\r\n\r\n\tattach() {\r\n\t\t// document.body.append(this.element);\r\n\t\tthis.hostElement.insertAdjacentElement(\r\n\t\t\tthis.insertBefore ? \"afterbegin\" : \"beforeend\",\r\n\t\t\tthis.element\r\n\t\t);\r\n\t}\r\n}\r\n\r\nfunction doSomething() {}\r\n\n\n//# sourceURL=webpack://practice-oop-01-starting-setup/./src/app/Component.js?");

/***/ }),

/***/ "./src/app/ToolTip.js":
/*!****************************!*\
  !*** ./src/app/ToolTip.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Tooltip: () => (/* binding */ Tooltip)\n/* harmony export */ });\n/* harmony import */ var _Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component.js */ \"./src/app/Component.js\");\n// eslint-disable-next-line no-unused-vars\r\n\r\n\r\nclass Tooltip extends _Component_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n\telement;\r\n\r\n\tconstructor(closeNotifierFn, text, hostElementId) {\r\n\t\t// super(\"finished-projects\", true);\r\n\t\tsuper(hostElementId);\r\n\t\tthis.closeNotifier = closeNotifierFn;\r\n\t\tthis.text = text;\r\n\t\tthis.create();\r\n\t}\r\n\r\n\t// The 'this' will always refer to the class when using an arrow function (no need to bind 'this' to the class in the event listener)!\r\n\tcloseTooltip = () => {\r\n\t\tthis.detach();\r\n\t\tthis.closeNotifier();\r\n\t};\r\n\r\n\tcreate() {\r\n\t\tconst tooltipElement = document.createElement(\"div\");\r\n\t\ttooltipElement.className = \"card\";\r\n\t\t// tooltipElement.textContent = this.text;\r\n\t\tconst tooltipTemplate = document.getElementById(\"tooltip\");\r\n\t\tconst tooltipBody = document.importNode(tooltipTemplate.content, true);\r\n\t\ttooltipBody.querySelector(\"p\").textContent = this.text;\r\n\t\ttooltipElement.append(tooltipBody);\r\n\r\n\t\tconst hostElPosLeft = this.hostElement.offsetLeft;\r\n\t\tconst hostElPosTop = this.hostElement.offsetTop;\r\n\t\tconst hostElHight = this.hostElement.clientHeight;\r\n\t\tconst parentElementScrolling = this.hostElement.parentElement.scrollTop;\r\n\r\n\t\tconst x = hostElPosLeft + 20;\r\n\t\tconst y = hostElPosTop + hostElHight - parentElementScrolling - 10;\r\n\r\n\t\ttooltipElement.style.position = \"absolute\";\r\n\t\ttooltipElement.style.left = x + \"px\";\r\n\t\ttooltipElement.style.top = y + \"px\";\r\n\r\n\t\ttooltipElement.addEventListener(\"click\", this.closeTooltip);\r\n\t\tthis.element = tooltipElement;\r\n\t}\r\n}\r\n\n\n//# sourceURL=webpack://practice-oop-01-starting-setup/./src/app/ToolTip.js?");

/***/ })

}]);