/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Countdown = __webpack_require__(1);

	document.addEventListener('DOMContentLoaded', function () {
	  new Countdown({
	    id: "ds-Countdown",
	    targetTime: '2017-01-01 00:00:00',
	    separator: ':',
	    afterEnd: function afterEnd() {
	      alert("Time over !");
	    }
	  });
	}, false);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Countdown = function () {
	  function Countdown() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, Countdown);

	    this.options = options;
	    this.targetTime = new Date(this.options.targetTime).getTime();
	    this.afterEnd = this.options.afterEnd;
	    this.hideDayAtZero = this.options.hideDayAtZero || false;
	    this.noDay = this.options.noDay || false;

	    this.checkExceptions();
	    this.defineSeparatorTpl();
	    this.run();
	  }

	  _createClass(Countdown, [{
	    key: 'checkExceptions',
	    value: function checkExceptions() {
	      this.optionsAreCorrectlyDefined();
	      this.checkDateIsOutOfTargetDate();
	    }
	  }, {
	    key: 'optionsAreCorrectlyDefined',
	    value: function optionsAreCorrectlyDefined() {
	      var targetTimeOptionExist = this.options.hasOwnProperty('targetTime');
	      var idOptionExist = this.options.hasOwnProperty('id');

	      if (!targetTimeOptionExist || !idOptionExist) {
	        throw new Error("Countdown : Date is not defined");
	      }
	    }
	  }, {
	    key: 'checkDateIsOutOfTargetDate',
	    value: function checkDateIsOutOfTargetDate() {
	      if (this.now > this.targetTime) {
	        throw new Error("Countdown : Date defined > Date now");
	      }
	    }
	  }, {
	    key: 'defineSeparatorTpl',
	    value: function defineSeparatorTpl() {
	      var separatorOptionSetToFalse = this.options.separator === false;
	      if (separatorOptionSetToFalse) {
	        this.separator = "";
	      } else {
	        this.separator = this.options.separator || ':';
	      }
	    }
	  }, {
	    key: 'run',
	    value: function run() {
	      var _this = this;

	      this.refresh();
	      this.intervalRender = setInterval(function () {
	        _this.refresh();
	      }, 1000);
	    }
	  }, {
	    key: 'refresh',
	    value: function refresh() {
	      this.now = new Date().getTime();
	      this.checkTimeOutOrNot();
	    }
	  }, {
	    key: 'checkTimeOutOrNot',
	    value: function checkTimeOutOrNot() {
	      if (this.now > this.targetTime) {
	        this.clearAndRunCallback();
	      } else {
	        this.defineTimer();
	        this.render();
	      }
	    }
	  }, {
	    key: 'clearAndRunCallback',
	    value: function clearAndRunCallback() {
	      clearInterval(this.intervalRender);
	      if (this.afterEnd) this.afterEnd();
	    }
	  }, {
	    key: 'hideDay',
	    value: function hideDay() {
	      return !!(this.hideDayAtZero && (this.timer.day === 0 || this.timer.day === '00'));
	    }
	  }, {
	    key: 'defineTimer',
	    value: function defineTimer() {
	      this.timer = {};
	      var diffTime = this.targetTime - this.now;

	      diffTime = Math.floor(diffTime / 1000);
	      this.setTimerToSec(diffTime);

	      diffTime = Math.floor((diffTime - this.timer.sec) / 60);
	      this.setTimerToMin(diffTime);

	      diffTime = Math.floor((diffTime - this.timer.min) / 60);
	      this.setTimeToHours(diffTime);

	      if (this.noDay) return;
	      var remainingDay = Math.floor((diffTime - this.timer.hour) / 24);
	      this.timer.day = remainingDay;
	      this.addPadStartZero(remainingDay, "day");
	    }
	  }, {
	    key: 'addPadStartZero',
	    value: function addPadStartZero(time, timer) {
	      if (time < 10) {
	        this.timer[timer] = time.toString().padStart(2, '0');
	      }
	    }
	  }, {
	    key: 'setTimeToHours',
	    value: function setTimeToHours(tmp) {
	      var remainingHours = this.noDay ? tmp : tmp % 24;
	      this.timer.hour = remainingHours;
	      this.addPadStartZero(remainingHours, "hour");
	    }
	  }, {
	    key: 'setTimerToMin',
	    value: function setTimerToMin(tmp) {
	      var remainingMin = tmp % 60;
	      this.timer.min = remainingMin;
	      this.addPadStartZero(remainingMin, "min");
	    }
	  }, {
	    key: 'setTimerToSec',
	    value: function setTimerToSec(tmp) {
	      var remainingSec = tmp % 60;
	      this.timer.sec = remainingSec;
	      this.addPadStartZero(remainingSec, "sec");
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _createTemplate = this.createTemplate(),
	          tplDay = _createTemplate.tplDay,
	          tpl = _createTemplate.tpl;

	      this.el = document.getElementById(this.options.id);
	      this.el.innerHTML = this.hideDay() || this.noDay ? tpl : tplDay + tpl;
	    }
	  }, {
	    key: 'createItem',
	    value: function createItem(timer, modifier) {
	      return '<span class="ds-Countdown-item ds-Countdown-item--' + modifier + '">' + timer + '</span>';
	    }
	  }, {
	    key: 'createTemplate',
	    value: function createTemplate() {
	      var tplDay = this.createItem(this.timer.day, 'day') + this.separator;
	      var tpl = this.createItem(this.timer.hour, 'hour') + this.separator + this.createItem(this.timer.min, 'min') + this.separator + this.createItem(this.timer.sec, 'sec');
	      return { tplDay: tplDay, tpl: tpl };
	    }
	  }]);

	  return Countdown;
	}();

	module.exports = Countdown;

/***/ })
/******/ ]);