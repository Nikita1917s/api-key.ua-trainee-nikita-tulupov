(self["webpackChunk"] = self["webpackChunk"] || []).push([["analytics"],{

/***/ "./analytics.js":
/*!**********************!*\
  !*** ./analytics.js ***!
  \**********************/
/***/ (() => {

function createAnalytics() {
  var counter = 0;
  var isDestroyed = false;

  var listener = function listener() {
    return counter++;
  };

  document.addEventListener('click', listener);
  return {
    destroy: function destroy() {
      document.removeEventListener('click', listener);
      isDestroyed = true;
    },
    getClicks: function getClicks() {
      if (isDestroyed) {
        return "Analytics is destroyed. Total clicks = ".concat(counter);
      }

      return counter;
    }
  };
}

window.analytics = createAnalytics();

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./analytics.js"));
/******/ }
]);
//# sourceMappingURL=analytics.fe6bad94ac65ebf0ab0a.js.map