"use strict";

var _ProjectList = require("./app/ProjectList.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// The GlobalThis object = window object in modules
globalThis.DEFAULT_VALUE = "MAX";

var App =
/*#__PURE__*/
function () {
  function App() {
    _classCallCheck(this, App);
  }

  _createClass(App, null, [{
    key: "init",
    value: function init() {
      var activeProjectList = new _ProjectList.ProjectList("active");
      var finishedProjectList = new _ProjectList.ProjectList("finished");
      activeProjectList.setSwitchHandlerFunction(finishedProjectList.addProject.bind(finishedProjectList));
      finishedProjectList.setSwitchHandlerFunction(activeProjectList.addProject.bind(activeProjectList));
      var timerId = setTimeout(this.startAnalytics, 3000);
      document.getElementById("stop-analytics-btn").addEventListener("click", function () {
        clearTimeout(timerId);
      });
    }
  }, {
    key: "startAnalytics",
    value: function startAnalytics() {
      var analyticsScript = document.createElement("script");
      analyticsScript.src = "src/Utility/Analytics.js";
      analyticsScript.defer = true;
      document.head.append(analyticsScript);
    }
  }]);

  return App;
}();

App.init();