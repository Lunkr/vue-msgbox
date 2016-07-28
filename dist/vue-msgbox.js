(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MessageBox = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _msgbox = __webpack_require__(2);
	
	var _msgbox2 = _interopRequireDefault(_msgbox);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var CONFIRM_TEXT = '确定';
	var CANCEL_TEXT = '取消';
	
	var defaults = {
	  title: '',
	  message: '',
	  type: '',
	  showInput: false,
	  inputValue: null,
	  inputPlaceholder: '',
	  inputPattern: null,
	  inputValidator: null,
	  inputErrorMessage: '',
	  showConfirmButton: true,
	  showCancelButton: false,
	  confirmButtonPosition: 'right',
	  confirmButtonHighlight: false,
	  cancelButtonHighlight: false,
	  confirmButtonText: CONFIRM_TEXT,
	  cancelButtonText: CANCEL_TEXT,
	  confirmButtonClass: '',
	  cancelButtonClass: ''
	};
	
	var merge = function merge(target) {
	  for (var i = 1, j = arguments.length; i < j; i++) {
	    var source = arguments[i];
	    for (var prop in source) {
	      if (source.hasOwnProperty(prop)) {
	        var value = source[prop];
	        if (value !== undefined) {
	          target[prop] = value;
	        }
	      }
	    }
	  }
	
	  return target;
	};
	
	var MessageBoxConstructor = _vue2.default.extend(_msgbox2.default);
	
	var currentMsg, instance;
	var msgQueue = [];
	
	var initInstance = function initInstance() {
	  instance = new MessageBoxConstructor({
	    el: document.createElement('div')
	  });
	
	  instance.callback = function (action) {
	    if (currentMsg) {
	      var callback = currentMsg.callback;
	      if (typeof callback === 'function') {
	        if (instance.showInput) {
	          callback(instance.inputValue, action);
	        } else {
	          callback(action);
	        }
	      }
	      if (currentMsg.resolve) {
	        var $type = currentMsg.options.$type;
	        if ($type === 'confirm' || $type === 'prompt') {
	          if (action === 'confirm') {
	            if (instance.showInput) {
	              currentMsg.resolve({ value: instance.inputValue, action: action });
	            } else {
	              currentMsg.resolve(action);
	            }
	          } else if (action === 'cancel' && currentMsg.reject) {
	            currentMsg.reject(action);
	          }
	        } else {
	          currentMsg.resolve(action);
	        }
	      }
	    }
	  };
	};
	
	var showNextMsg = function showNextMsg() {
	  if (!instance) {
	    initInstance();
	  }
	
	  if (!instance.visible || instance.closeTimer) {
	    if (msgQueue.length > 0) {
	      currentMsg = msgQueue.shift();
	
	      var options = currentMsg.options;
	      for (var prop in options) {
	        if (options.hasOwnProperty(prop)) {
	          instance[prop] = options[prop];
	        }
	      }
	      instance.$appendTo(document.body);
	
	      _vue2.default.nextTick(function () {
	        instance.visible = true;
	      });
	    }
	  }
	};
	
	var MessageBox = function MessageBox(options, callback) {
	  if (typeof options === 'string') {
	    options = {
	      title: options
	    };
	    if (arguments[1]) {
	      options.message = arguments[1];
	    }
	    if (arguments[2]) {
	      options.type = arguments[2];
	    }
	  } else if (options.callback && !callback) {
	    callback = options.callback;
	  }
	
	  if (typeof Promise !== 'undefined') {
	    return new Promise(function (resolve, reject) {
	      msgQueue.push({
	        options: merge({}, defaults, MessageBox.defaults || {}, options),
	        callback: callback,
	        resolve: resolve,
	        reject: reject
	      });
	
	      showNextMsg();
	    });
	  } else {
	    msgQueue.push({
	      options: merge({}, defaults, MessageBox.defaults || {}, options),
	      callback: callback
	    });
	
	    showNextMsg();
	  }
	};
	
	MessageBox.setDefaults = function (defaults) {
	  MessageBox.defaults = defaults;
	};
	
	MessageBox.alert = function (message, title, options) {
	  if ((typeof title === 'undefined' ? 'undefined' : _typeof(title)) === 'object') {
	    options = title;
	    title = '';
	  }
	  return MessageBox(merge({
	    title: title,
	    message: message,
	    $type: 'alert'
	  }, options));
	};
	
	MessageBox.confirm = function (message, title, options) {
	  if ((typeof title === 'undefined' ? 'undefined' : _typeof(title)) === 'object') {
	    options = title;
	    title = '';
	  }
	  return MessageBox(merge({
	    title: title,
	    message: message,
	    $type: 'confirm',
	    showCancelButton: true
	  }, options));
	};
	
	MessageBox.prompt = function (message, title, options) {
	  if ((typeof title === 'undefined' ? 'undefined' : _typeof(title)) === 'object') {
	    options = title;
	    title = '';
	  }
	  return MessageBox(merge({
	    title: title,
	    message: message,
	    showCancelButton: true,
	    showInput: true,
	    $type: 'prompt'
	  }, options));
	};
	
	MessageBox.close = function () {
	  instance.visible = false;
	  msgQueue = [];
	  currentMsg = null;
	};
	
	exports.default = MessageBox;
	exports.MessageBox = MessageBox;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("vue");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(3)
	__webpack_require__(7)
	__vue_script__ = __webpack_require__(9)
	__vue_template__ = __webpack_require__(80)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/belin/GitHub/vue-msgbox/src/msgbox.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../css-loader/index.js?sourceMap!./../../vue-loader/lib/style-rewriter.js?id=_v-10f95120&file=msgbox.vue!./popup.css", function() {
				var newContent = require("!!./../../css-loader/index.js?sourceMap!./../../vue-loader/lib/style-rewriter.js?id=_v-10f95120&file=msgbox.vue!./popup.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports
	
	
	// module
	exports.push([module.id, ".v-modal-enter{-webkit-animation:v-modal-in .2s ease;animation:v-modal-in .2s ease}.v-modal-leave{-webkit-animation:v-modal-out .2s ease forwards;animation:v-modal-out .2s ease forwards}@-webkit-keyframes v-modal-in{0%{opacity:0}}@keyframes v-modal-in{0%{opacity:0}}@-webkit-keyframes v-modal-out{to{opacity:0}}@keyframes v-modal-out{to{opacity:0}}.v-modal{position:fixed;left:0;top:0;width:100%;height:100%;opacity:.5;background:#000}\n/*# sourceMappingURL=popup.css.map*/", "", {"version":3,"sources":["/./node_modules/vue-popup/lib/msgbox.vue.style"],"names":[],"mappings":"AAAA,eAAe,sCAAA,6BAA6B,CAAC,eAAe,gDAAA,uCAAuC,CAAC,8BAAsB,GAAG,SAAS,CAAC,CAAnC,sBAAsB,GAAG,SAAS,CAAC,CAAC,+BAAuB,GAAG,SAAS,CAAC,CAApC,uBAAuB,GAAG,SAAS,CAAC,CAAC,SAAS,eAAe,OAAO,MAAM,WAAW,YAAY,WAAW,eAAe,CAAC;AACpQ,oCAAoC","file":"popup.css","sourcesContent":[null],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-10f95120&file=msgbox.vue&scoped=true!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./msgbox.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-10f95120&file=msgbox.vue&scoped=true!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./msgbox.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports
	
	
	// module
	exports.push([module.id, "\n  .msgbox-wrapper[_v-10f95120] {\n    -moz-box-sizing: border-box;\n         box-sizing: border-box;\n  }\n  .msgbox[_v-10f95120] {\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate3d(-50%, -50%, 0);\n            transform: translate3d(-50%, -50%, 0);\n    background-color: #fff;\n    width: 300px;\n    border-radius: 5px;\n    font-size: 14px;\n    -webkit-user-select: none;\n    overflow: hidden;\n    opacity: 1;\n    -webkit-backface-visibility: hidden;\n            backface-visibility: hidden;\n    box-shadow: 0 5px 15px rgba(0, 0, 0, .5);\n  }\n\n  .msgbox-header[_v-10f95120]{\n    background-color: #424242;\n    padding: 0 15px;\n    overflow: hidden;\n    position: relative;\n    color: #fff;\n    height: 40px;\n    line-height: 40px;\n    border: none;\n  }\n  .msgbox-close-container[_v-10f95120]{\n    height: 20px;\n  }\n  .msgbox-close-container .msgbox-close[_v-10f95120] {\n    top: 10px;\n    opacity: .5;\n  }\n\n  .msgbox-content[_v-10f95120] {\n    padding: 10px 20px;\n    min-height: 36px;\n    position: relative;\n  }\n\n  .msgbox-close[_v-10f95120] {\n    display: inline-block;\n    position: absolute;\n    top: 10px;\n    right: 10px;\n    width: 20px;\n    height: 20px;\n    cursor: pointer;\n    line-height: 20px;\n    text-align: center;\n    z-index: 1; \n    font-weight: bold;    \n  }\n\n  .msgbox-input > input[_v-10f95120] {\n    border: 1px solid #dedede;\n    border-radius: 5px;\n    padding: 4px 5px;\n    width: 100%;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    outline: none;\n  }\n\n  .msgbox-errormsg[_v-10f95120] {\n    color: red;\n    font-size: 12px;\n    min-height: 16px;\n  }\n\n  .msgbox-status[_v-10f95120] {\n    float: left;\n    width: 36px;\n    height: 36px;\n    font-size: 36px !important;\n  }\n\n  .msgbox-status.icon-success[_v-10f95120] {\n    color: #94c852;\n  }\n\n  .msgbox-status.icon-warning[_v-10f95120] {\n    color: #ff9c00;\n  }\n\n  .msgbox-status.icon-error[_v-10f95120] {\n    color: #ff4248;\n  }\n\n  .msgbox-message[_v-10f95120] {\n    color: #333;\n    text-overflow: ellipsis;\n    margin: 20px 0 30px 0;\n    text-align: center;\n    line-height: 20px;\n  }\n\n  .msgbox-btns[_v-10f95120] {\n    display: -webkit-box;\n    display: -moz-box;\n    display: -ms-flexbox;\n    display: flex;\n    padding: 20px 0;\n    -webkit-box-pack: center;\n       -moz-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n  }\n\n  .msgbox-btn[_v-10f95120] {\n    border-radius: 4px;\n    min-width: 50px;\n    height: 26px;\n    padding: 0 10px;\n    font-size: 14px;\n    text-align: center;\n    cursor: pointer;\n    margin: 0 5px;\n    border: 1px solid #e0e0e0;    \n  }\n  .msgbox-btn[_v-10f95120]:focus,\n  .msgbox-btn[_v-10f95120]:hover,\n  .msgbox-btn[_v-10f95120]:active {\n    outline: none !important;\n  }\n  .msgbox-btn[_v-10f95120]:hover {\n    box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.1);\n  }\n  .msgbox-btn[_v-10f95120]:active {\n    box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.1);\n  }\n  .msgbox-confirm[_v-10f95120] {\n    background-color: #ffee38;\n    color: #7c6506;\n    border: 1px solid #cdbc06;\n  }\n  .msgbox-confirm[_v-10f95120]:hover,\n  .msgbox-confirm[_v-10f95120]:active,\n  .msgbox-confirm[_v-10f95120]:active:hover,\n  .msgbox-confirm[_v-10f95120]:active:focus,\n  .msgbox-confirm[_v-10f95120]:focus {\n    background-color: #ffee38;\n    color: #7c6506;\n    border: 1px solid #cdbc06;\n  }\n  .msgbox-confirm.disabled[_v-10f95120],\n  .msgbox-confirm[disabled][_v-10f95120] {\n    background-color: #f5f5f5;\n    color: #c1c1c1;\n  }\n  .msgbox-confirm.disabled[_v-10f95120]:hover,\n  .msgbox-confirm[disabled][_v-10f95120]:hover,\n  .msgbox-confirm.disabled[_v-10f95120]:active,\n  .msgbox-confirm[disabled][_v-10f95120]:active {\n    box-shadow: none;\n    background-color: #f5f5f5;\n    color: #c1c1c1;\n  }\n  .msgbox-cancel[_v-10f95120] {\n    background-color: #f5f5f5;\n    color: #606060;\n  }\n  .msgbox-cancel[_v-10f95120]:hover,\n  .msgbox-cancel[_v-10f95120]:active,\n  .msgbox-cancel[_v-10f95120]:focus {\n    background-color: #f5f5f5;\n    color: #606060;\n  }\n\n  .msgbox-confirm-highlight[_v-10f95120],\n  .msgbox-cancel-highlight[_v-10f95120] {\n    font-weight: 800;\n  }\n\n  .msgbox-btns-reverse[_v-10f95120] {\n    -webkit-box-direction: reverse;\n  }\n\n  .pop-bounce-transition[_v-10f95120] {\n    -webkit-transition: .2s .1s;\n    transition: .2s .1s;\n  }\n\n  .pop-bounce-enter[_v-10f95120] {\n    opacity: 0;\n    -webkit-transform: translate3d(-50%, -50%, 0) scale(0.7);\n            transform: translate3d(-50%, -50%, 0) scale(0.7);\n  }\n\n  .pop-bounce-leave[_v-10f95120] {\n    opacity: 0;\n    -webkit-transform: translate3d(-50%, -50%, 0) scale(0.9);\n            transform: translate3d(-50%, -50%, 0) scale(0.9);\n  }\n", "", {"version":3,"sources":["/./src/msgbox.vue.style"],"names":[],"mappings":";EA0BA;IACA,4BAAA;SAAA,uBAAA;GACA;EACA;IACA,gBAAA;IACA,SAAA;IACA,UAAA;IACA,8CAAA;YAAA,sCAAA;IACA,uBAAA;IACA,aAAA;IACA,mBAAA;IACA,gBAAA;IACA,0BAAA;IACA,iBAAA;IACA,WAAA;IACA,oCAAA;YAAA,4BAAA;IACA,yCAAA;GACA;;EAEA;IACA,0BAAA;IACA,gBAAA;IACA,iBAAA;IACA,mBAAA;IACA,YAAA;IACA,aAAA;IACA,kBAAA;IACA,aAAA;GACA;EACA;IACA,aAAA;GACA;EACA;IACA,UAAA;IACA,YAAA;GACA;;EAEA;IACA,mBAAA;IACA,iBAAA;IACA,mBAAA;GACA;;EAEA;IACA,sBAAA;IACA,mBAAA;IACA,UAAA;IACA,YAAA;IACA,YAAA;IACA,aAAA;IACA,gBAAA;IACA,kBAAA;IACA,mBAAA;IACA,WAAA;IACA,kBAAA;GACA;;EAEA;IACA,0BAAA;IACA,mBAAA;IACA,iBAAA;IACA,YAAA;IACA,yBAAA;IACA,sBAAA;IACA,iBAAA;IACA,cAAA;GACA;;EAEA;IACA,WAAA;IACA,gBAAA;IACA,iBAAA;GACA;;EAEA;IACA,YAAA;IACA,YAAA;IACA,aAAA;IACA,2BAAA;GACA;;EAEA;IACA,eAAA;GACA;;EAEA;IACA,eAAA;GACA;;EAEA;IACA,eAAA;GACA;;EAEA;IACA,YAAA;IACA,wBAAA;IACA,sBAAA;IACA,mBAAA;IACA,kBAAA;GACA;;EAEA;IACA,qBAAA;IAAA,kBAAA;IAAA,qBAAA;IAAA,cAAA;IACA,gBAAA;IACA,yBAAA;OAAA,sBAAA;QAAA,sBAAA;YAAA,wBAAA;GACA;;EAEA;IACA,mBAAA;IACA,gBAAA;IACA,aAAA;IACA,gBAAA;IACA,gBAAA;IACA,mBAAA;IACA,gBAAA;IACA,cAAA;IACA,0BAAA;GACA;EACA;;;IAGA,yBAAA;GACA;EACA;IACA,8CAAA;GACA;EACA;IACA,+CAAA;GACA;EACA;IACA,0BAAA;IACA,eAAA;IACA,0BAAA;GACA;EACA;;;;;IAKA,0BAAA;IACA,eAAA;IACA,0BAAA;GACA;EACA;;IAEA,0BAAA;IACA,eAAA;GACA;EACA;;;;IAIA,iBAAA;IACA,0BAAA;IACA,eAAA;GACA;EACA;IACA,0BAAA;IACA,eAAA;GACA;EACA;;;IAGA,0BAAA;IACA,eAAA;GACA;;EAEA;;IAEA,iBAAA;GACA;;EAEA;IACA,+BAAA;GACA;;EAEA;IACA,4BAAA;IAAA,oBAAA;GACA;;EAEA;IACA,WAAA;IACA,yDAAA;YAAA,iDAAA;GACA;;EAEA;IACA,WAAA;IACA,yDAAA;YAAA,iDAAA;GACA","file":"msgbox.vue","sourcesContent":["<template>\n  <div class=\"msgbox-wrapper\">\n    <div class=\"msgbox\" v-if=\"rendered\" v-show=\"visible\" transition=\"pop-bounce\">\n      <div class=\"msgbox-header\" v-if=\"title\">\n        <span class=\"msgbox-title\">{{ title }}</span>\n        <span class=\"msgbox-close\" @click=\"handleAction('close')\">×</span>\n      </div>\n      <div class=\"msgbox-close-container\" v-else>\n        <span class=\"msgbox-close\" @click=\"handleAction('close')\">×</span>\n      </div>\n      <div class=\"msgbox-content\" v-if=\"message\">\n        <div class=\"msgbox-message\">{{ message }}</div>\n        <div class=\"msgbox-input\" v-show=\"showInput\">\n          <input type=\"text\" v-model=\"inputValue\" :placeholder=\"inputPlaceholder\" v-el:input />\n          <div class=\"msgbox-errormsg\" :style=\"{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }\">{{editorErrorMessage}}</div>\n        </div>\n      </div>\n      <div class=\"msgbox-btns\" :class=\"{ 'msgbox-btns-reverse': confirmButtonPosition === 'left' }\">\n        <button class=\"{{ confirmButtonClasses }}\" v-show=\"showConfirmButton\" @click=\"handleAction('confirm')\">{{ confirmButtonText }}</button>\n        <button class=\"{{ cancelButtonClasses }}\" v-show=\"showCancelButton\" @click=\"handleAction('cancel')\">{{ cancelButtonText }}</button>        \n      </div>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .msgbox-wrapper {\n    box-sizing: border-box;\n  }\n  .msgbox {\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    transform: translate3d(-50%, -50%, 0);\n    background-color: #fff;\n    width: 300px;\n    border-radius: 5px;\n    font-size: 14px;\n    -webkit-user-select: none;\n    overflow: hidden;\n    opacity: 1;\n    backface-visibility: hidden;\n    box-shadow: 0 5px 15px rgba(0, 0, 0, .5);\n  }\n\n  .msgbox-header{\n    background-color: #424242;\n    padding: 0 15px;\n    overflow: hidden;\n    position: relative;\n    color: #fff;\n    height: 40px;\n    line-height: 40px;\n    border: none;\n  }\n  .msgbox-close-container{\n    height: 20px;\n  }\n  .msgbox-close-container .msgbox-close {\n    top: 10px;\n    opacity: .5;\n  }\n\n  .msgbox-content {\n    padding: 10px 20px;\n    min-height: 36px;\n    position: relative;\n  }\n\n  .msgbox-close {\n    display: inline-block;\n    position: absolute;\n    top: 10px;\n    right: 10px;\n    width: 20px;\n    height: 20px;\n    cursor: pointer;\n    line-height: 20px;\n    text-align: center;\n    z-index: 1; \n    font-weight: bold;    \n  }\n\n  .msgbox-input > input {\n    border: 1px solid #dedede;\n    border-radius: 5px;\n    padding: 4px 5px;\n    width: 100%;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    outline: none;\n  }\n\n  .msgbox-errormsg {\n    color: red;\n    font-size: 12px;\n    min-height: 16px;\n  }\n\n  .msgbox-status {\n    float: left;\n    width: 36px;\n    height: 36px;\n    font-size: 36px !important;\n  }\n\n  .msgbox-status.icon-success {\n    color: #94c852;\n  }\n\n  .msgbox-status.icon-warning {\n    color: #ff9c00;\n  }\n\n  .msgbox-status.icon-error {\n    color: #ff4248;\n  }\n\n  .msgbox-message {\n    color: #333;\n    text-overflow: ellipsis;\n    margin: 20px 0 30px 0;\n    text-align: center;\n    line-height: 20px;\n  }\n\n  .msgbox-btns {\n    display: flex;\n    padding: 20px 0;\n    justify-content: center;\n  }\n\n  .msgbox-btn {\n    border-radius: 4px;\n    min-width: 50px;\n    height: 26px;\n    padding: 0 10px;\n    font-size: 14px;\n    text-align: center;\n    cursor: pointer;\n    margin: 0 5px;\n    border: 1px solid #e0e0e0;    \n  }\n  .msgbox-btn:focus,\n  .msgbox-btn:hover,\n  .msgbox-btn:active {\n    outline: none !important;\n  }\n  .msgbox-btn:hover {\n    box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.1);\n  }\n  .msgbox-btn:active {\n    box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.1);\n  }\n  .msgbox-confirm {\n    background-color: #ffee38;\n    color: #7c6506;\n    border: 1px solid #cdbc06;\n  }\n  .msgbox-confirm:hover,\n  .msgbox-confirm:active,\n  .msgbox-confirm:active:hover,\n  .msgbox-confirm:active:focus,\n  .msgbox-confirm:focus {\n    background-color: #ffee38;\n    color: #7c6506;\n    border: 1px solid #cdbc06;\n  }\n  .msgbox-confirm.disabled,\n  .msgbox-confirm[disabled] {\n    background-color: #f5f5f5;\n    color: #c1c1c1;\n  }\n  .msgbox-confirm.disabled:hover,\n  .msgbox-confirm[disabled]:hover,\n  .msgbox-confirm.disabled:active,\n  .msgbox-confirm[disabled]:active {\n    box-shadow: none;\n    background-color: #f5f5f5;\n    color: #c1c1c1;\n  }\n  .msgbox-cancel {\n    background-color: #f5f5f5;\n    color: #606060;\n  }\n  .msgbox-cancel:hover,\n  .msgbox-cancel:active,\n  .msgbox-cancel:focus {\n    background-color: #f5f5f5;\n    color: #606060;\n  }\n\n  .msgbox-confirm-highlight,\n  .msgbox-cancel-highlight {\n    font-weight: 800;\n  }\n\n  .msgbox-btns-reverse {\n    -webkit-box-direction: reverse;\n  }\n\n  .pop-bounce-transition {\n    transition: .2s .1s;\n  }\n\n  .pop-bounce-enter {\n    opacity: 0;\n    transform: translate3d(-50%, -50%, 0) scale(0.7);\n  }\n\n  .pop-bounce-leave {\n    opacity: 0;\n    transform: translate3d(-50%, -50%, 0) scale(0.9);\n  }\n</style>\n<style src=\"vue-popup/lib/popup.css\"></style>\n\n<script lang=\"babel\">\n  var CONFIRM_TEXT = '确定';\n  var CANCEL_TEXT = '取消';\n\n  import Popup from 'vue-popup';\n\n  export default {\n    mixins: [ Popup ],\n\n    props: {\n      modal: {\n        default: true\n      },\n      closeOnPressEscape: {\n        default: true\n      }\n    },\n\n    computed: {\n      confirmButtonClasses() {\n        var classes = 'msgbox-btn msgbox-confirm ' + this.confirmButtonClass;\n        if (this.confirmButtonHighlight) {\n          classes += ' msgbox-confirm-highlight';\n        }\n        return classes;\n      },\n      cancelButtonClasses() {\n        var classes = 'msgbox-btn msgbox-cancel ' + this.cancelButtonClass;\n        if (this.cancelButtonHighlight) {\n          classes += ' msgbox-cancel-highlight';\n        }\n        return classes;\n      }\n    },\n\n    methods: {\n      handleAction(action) {\n        if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {\n          return;\n        }\n        var callback = this.callback;\n        this.visible = false;\n        callback(action);\n      },\n\n      validate() {\n        if (this.$type === 'prompt') {\n          var inputPattern = this.inputPattern;\n          if (inputPattern && !inputPattern.test(this.inputValue || '')) {\n            this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';\n            return false;\n          }\n          var inputValidator = this.inputValidator;\n          if (typeof inputValidator === 'function') {\n            var validateResult = inputValidator(this.inputValue);\n            if (validateResult === false) {\n              this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';\n              return false;\n            }\n            if (typeof validateResult === 'string') {\n              this.editorErrorMessage = validateResult;\n              return false;\n            }\n          }\n        }\n        this.editorErrorMessage = '';\n        return true;\n      }\n    },\n\n    watch: {\n      inputValue() {\n        if (this.$type === 'prompt') {\n          this.validate();\n        }\n      },\n\n      visible(val) {\n        if (val && this.$type === 'prompt') {\n          setTimeout(() => {\n            if (this.$els.input) {\n              this.$els.input.focus();\n            }\n          }, 500);\n        }\n      }\n    },\n\n    data() {\n      return {\n        title: '',\n        message: '',\n        type: '',\n        showInput: false,\n        inputValue: null,\n        inputPlaceholder: '',\n        inputPattern: null,\n        inputValidator: null,\n        inputErrorMessage: '',\n        showConfirmButton: true,\n        showCancelButton: false,\n        confirmButtonText: CONFIRM_TEXT,\n        cancelButtonText: CANCEL_TEXT,\n        confirmButtonPosition: 'right',\n        confirmButtonHighlight: false,\n        confirmButtonClass: '',\n        confirmButtonDisabled: false,\n        cancelButtonClass: '',\n        cancelButtonHighlight: false,\n\n        editorErrorMessage: null,\n        callback: null\n      };\n    }\n  }\n</script>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _vuePopup = __webpack_require__(10);
	
	var _vuePopup2 = _interopRequireDefault(_vuePopup);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	//   <div class="msgbox-wrapper">
	//     <div class="msgbox" v-if="rendered" v-show="visible" transition="pop-bounce">
	//       <div class="msgbox-header" v-if="title">
	//         <span class="msgbox-title">{{ title }}</span>
	//         <span class="msgbox-close" @click="handleAction('close')">×</span>
	//       </div>
	//       <div class="msgbox-close-container" v-else>
	//         <span class="msgbox-close" @click="handleAction('close')">×</span>
	//       </div>
	//       <div class="msgbox-content" v-if="message">
	//         <div class="msgbox-message">{{ message }}</div>
	//         <div class="msgbox-input" v-show="showInput">
	//           <input type="text" v-model="inputValue" :placeholder="inputPlaceholder" v-el:input />
	//           <div class="msgbox-errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{editorErrorMessage}}</div>
	//         </div>
	//       </div>
	//       <div class="msgbox-btns" :class="{ 'msgbox-btns-reverse': confirmButtonPosition === 'left' }">
	//         <button class="{{ confirmButtonClasses }}" v-show="showConfirmButton" @click="handleAction('confirm')">{{ confirmButtonText }}</button>
	//         <button class="{{ cancelButtonClasses }}" v-show="showCancelButton" @click="handleAction('cancel')">{{ cancelButtonText }}</button>        
	//       </div>
	//     </div>
	//   </div>
	// </template>
	//
	// <style scoped>
	//   .msgbox-wrapper {
	//     box-sizing: border-box;
	//   }
	//   .msgbox {
	//     position: fixed;
	//     top: 50%;
	//     left: 50%;
	//     transform: translate3d(-50%, -50%, 0);
	//     background-color: #fff;
	//     width: 300px;
	//     border-radius: 5px;
	//     font-size: 14px;
	//     -webkit-user-select: none;
	//     overflow: hidden;
	//     opacity: 1;
	//     backface-visibility: hidden;
	//     box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
	//   }
	//
	//   .msgbox-header{
	//     background-color: #424242;
	//     padding: 0 15px;
	//     overflow: hidden;
	//     position: relative;
	//     color: #fff;
	//     height: 40px;
	//     line-height: 40px;
	//     border: none;
	//   }
	//   .msgbox-close-container{
	//     height: 20px;
	//   }
	//   .msgbox-close-container .msgbox-close {
	//     top: 10px;
	//     opacity: .5;
	//   }
	//
	//   .msgbox-content {
	//     padding: 10px 20px;
	//     min-height: 36px;
	//     position: relative;
	//   }
	//
	//   .msgbox-close {
	//     display: inline-block;
	//     position: absolute;
	//     top: 10px;
	//     right: 10px;
	//     width: 20px;
	//     height: 20px;
	//     cursor: pointer;
	//     line-height: 20px;
	//     text-align: center;
	//     z-index: 1; 
	//     font-weight: bold;    
	//   }
	//
	//   .msgbox-input > input {
	//     border: 1px solid #dedede;
	//     border-radius: 5px;
	//     padding: 4px 5px;
	//     width: 100%;
	//     -webkit-appearance: none;
	//     -moz-appearance: none;
	//     appearance: none;
	//     outline: none;
	//   }
	//
	//   .msgbox-errormsg {
	//     color: red;
	//     font-size: 12px;
	//     min-height: 16px;
	//   }
	//
	//   .msgbox-status {
	//     float: left;
	//     width: 36px;
	//     height: 36px;
	//     font-size: 36px !important;
	//   }
	//
	//   .msgbox-status.icon-success {
	//     color: #94c852;
	//   }
	//
	//   .msgbox-status.icon-warning {
	//     color: #ff9c00;
	//   }
	//
	//   .msgbox-status.icon-error {
	//     color: #ff4248;
	//   }
	//
	//   .msgbox-message {
	//     color: #333;
	//     text-overflow: ellipsis;
	//     margin: 20px 0 30px 0;
	//     text-align: center;
	//     line-height: 20px;
	//   }
	//
	//   .msgbox-btns {
	//     display: flex;
	//     padding: 20px 0;
	//     justify-content: center;
	//   }
	//
	//   .msgbox-btn {
	//     border-radius: 4px;
	//     min-width: 50px;
	//     height: 26px;
	//     padding: 0 10px;
	//     font-size: 14px;
	//     text-align: center;
	//     cursor: pointer;
	//     margin: 0 5px;
	//     border: 1px solid #e0e0e0;    
	//   }
	//   .msgbox-btn:focus,
	//   .msgbox-btn:hover,
	//   .msgbox-btn:active {
	//     outline: none !important;
	//   }
	//   .msgbox-btn:hover {
	//     box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.1);
	//   }
	//   .msgbox-btn:active {
	//     box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.1);
	//   }
	//   .msgbox-confirm {
	//     background-color: #ffee38;
	//     color: #7c6506;
	//     border: 1px solid #cdbc06;
	//   }
	//   .msgbox-confirm:hover,
	//   .msgbox-confirm:active,
	//   .msgbox-confirm:active:hover,
	//   .msgbox-confirm:active:focus,
	//   .msgbox-confirm:focus {
	//     background-color: #ffee38;
	//     color: #7c6506;
	//     border: 1px solid #cdbc06;
	//   }
	//   .msgbox-confirm.disabled,
	//   .msgbox-confirm[disabled] {
	//     background-color: #f5f5f5;
	//     color: #c1c1c1;
	//   }
	//   .msgbox-confirm.disabled:hover,
	//   .msgbox-confirm[disabled]:hover,
	//   .msgbox-confirm.disabled:active,
	//   .msgbox-confirm[disabled]:active {
	//     box-shadow: none;
	//     background-color: #f5f5f5;
	//     color: #c1c1c1;
	//   }
	//   .msgbox-cancel {
	//     background-color: #f5f5f5;
	//     color: #606060;
	//   }
	//   .msgbox-cancel:hover,
	//   .msgbox-cancel:active,
	//   .msgbox-cancel:focus {
	//     background-color: #f5f5f5;
	//     color: #606060;
	//   }
	//
	//   .msgbox-confirm-highlight,
	//   .msgbox-cancel-highlight {
	//     font-weight: 800;
	//   }
	//
	//   .msgbox-btns-reverse {
	//     -webkit-box-direction: reverse;
	//   }
	//
	//   .pop-bounce-transition {
	//     transition: .2s .1s;
	//   }
	//
	//   .pop-bounce-enter {
	//     opacity: 0;
	//     transform: translate3d(-50%, -50%, 0) scale(0.7);
	//   }
	//
	//   .pop-bounce-leave {
	//     opacity: 0;
	//     transform: translate3d(-50%, -50%, 0) scale(0.9);
	//   }
	// </style>
	// <style src="vue-popup/lib/popup.css"></style>
	//
	// <script lang="babel">
	var CONFIRM_TEXT = '确定';
	var CANCEL_TEXT = '取消';
	
	exports.default = {
	  mixins: [_vuePopup2.default],
	
	  props: {
	    modal: {
	      default: true
	    },
	    closeOnPressEscape: {
	      default: true
	    }
	  },
	
	  computed: {
	    confirmButtonClasses: function confirmButtonClasses() {
	      var classes = 'msgbox-btn msgbox-confirm ' + this.confirmButtonClass;
	      if (this.confirmButtonHighlight) {
	        classes += ' msgbox-confirm-highlight';
	      }
	      return classes;
	    },
	    cancelButtonClasses: function cancelButtonClasses() {
	      var classes = 'msgbox-btn msgbox-cancel ' + this.cancelButtonClass;
	      if (this.cancelButtonHighlight) {
	        classes += ' msgbox-cancel-highlight';
	      }
	      return classes;
	    }
	  },
	
	  methods: {
	    handleAction: function handleAction(action) {
	      if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
	        return;
	      }
	      var callback = this.callback;
	      this.visible = false;
	      callback(action);
	    },
	    validate: function validate() {
	      if (this.$type === 'prompt') {
	        var inputPattern = this.inputPattern;
	        if (inputPattern && !inputPattern.test(this.inputValue || '')) {
	          this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
	          return false;
	        }
	        var inputValidator = this.inputValidator;
	        if (typeof inputValidator === 'function') {
	          var validateResult = inputValidator(this.inputValue);
	          if (validateResult === false) {
	            this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
	            return false;
	          }
	          if (typeof validateResult === 'string') {
	            this.editorErrorMessage = validateResult;
	            return false;
	          }
	        }
	      }
	      this.editorErrorMessage = '';
	      return true;
	    }
	  },
	
	  watch: {
	    inputValue: function inputValue() {
	      if (this.$type === 'prompt') {
	        this.validate();
	      }
	    },
	    visible: function visible(val) {
	      var _this = this;
	
	      if (val && this.$type === 'prompt') {
	        setTimeout(function () {
	          if (_this.$els.input) {
	            _this.$els.input.focus();
	          }
	        }, 500);
	      }
	    }
	  },
	
	  data: function data() {
	    return {
	      title: '',
	      message: '',
	      type: '',
	      showInput: false,
	      inputValue: null,
	      inputPlaceholder: '',
	      inputPattern: null,
	      inputValidator: null,
	      inputErrorMessage: '',
	      showConfirmButton: true,
	      showCancelButton: false,
	      confirmButtonText: CONFIRM_TEXT,
	      cancelButtonText: CANCEL_TEXT,
	      confirmButtonPosition: 'right',
	      confirmButtonHighlight: false,
	      confirmButtonClass: '',
	      confirmButtonDisabled: false,
	      cancelButtonClass: '',
	      cancelButtonHighlight: false,
	
	      editorErrorMessage: null,
	      callback: null
	    };
	  }
	};
	// </script>
	//

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {"use strict";
	
	var _typeof2 = __webpack_require__(12);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	!function (e, t) {
	  "object" == ( false ? "undefined" : (0, _typeof3.default)(exports)) && "object" == ( false ? "undefined" : (0, _typeof3.default)(module)) ? module.exports = t(__webpack_require__(1)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (t), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : (0, _typeof3.default)(exports)) ? exports.VuePopup = t(require("vue")) : e.VuePopup = t(e.vue);
	}(undefined, function (e) {
	  return function (e) {
	    function t(n) {
	      if (o[n]) return o[n].exports;var i = o[n] = { exports: {}, id: n, loaded: !1 };return e[n].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports;
	    }var o = {};return t.m = e, t.c = o, t.p = "", t(0);
	  }([function (e, t, o) {
	    "use strict";
	    function n(e) {
	      return e && e.__esModule ? e : { "default": e };
	    }Object.defineProperty(t, "__esModule", { value: !0 });var i = o(4),
	        s = n(i),
	        l = o(2),
	        r = o(1),
	        d = n(r);o(3);var a = 1,
	        u = [],
	        c = function c(e) {
	      if (-1 === u.indexOf(e)) {
	        var t = function t(e) {
	          var t = e.__vue__;if (!t) {
	            var o = e.previousSibling;o.__vue__ && (t = o.__vue__);
	          }return t;
	        };s["default"].transition(e, { afterEnter: function afterEnter(e) {
	            var o = t(e);o && o.doAfterOpen && o.doAfterOpen();
	          }, afterLeave: function afterLeave(e) {
	            var o = t(e);o && o.doAfterClose && o.doAfterClose();
	          } });
	      }
	    },
	        f = function f(e) {
	      return 3 === e.nodeType ? e.nextElementSibling : e;
	    };t["default"] = { props: { visible: { type: Boolean, twoWay: !0, "default": !1 }, transition: { type: String, "default": "" }, openDelay: {}, closeDelay: {}, zIndex: {}, modal: { type: Boolean, "default": !1 }, modalClass: {}, closeOnPressEscape: { type: Boolean, "default": !1 }, closeOnClickModal: { type: Boolean, "default": !1 } }, created: function created() {
	        this.transition && c(this.transition);
	      }, compiled: function compiled() {
	        this._popupId = "popup-" + a++, d["default"].register(this._popupId, this);
	      }, beforeDestroy: function beforeDestroy() {
	        d["default"].deregister(this._popupId), d["default"].closeModal(this._popupId);
	      }, data: function data() {
	        return { bodyOverflow: null, rendered: !1 };
	      }, watch: { visible: function visible(e) {
	          var t = this;if (e) {
	            if (this._opening) return;this.rendered ? this.open() : (this.rendered = !0, s["default"].nextTick(function () {
	              t.open();
	            }));
	          } else this.close();
	        } }, methods: { open: function open(e) {
	          var t = this;if (!this.rendered) return this.rendered = !0, void (this.visible = !0);var o = (0, l.merge)({}, this, e);this._closeTimer && (clearTimeout(this._closeTimer), this._closeTimer = null), clearTimeout(this._openTimer);var n = Number(o.openDelay);n > 0 ? this._openTimer = setTimeout(function () {
	            t._openTimer = null, t.doOpen(o);
	          }, n) : this.doOpen(o);
	        }, doOpen: function doOpen(e) {
	          if (!this.willOpen || this.willOpen()) {
	            this._opening = !0, this.visible = !0;var t = f(this.$el),
	                o = e.modal;o && (this._closing && (d["default"].closeModal(this._popupId), this._closing = !1), d["default"].openModal(this._popupId, d["default"].nextZIndex(), t, e.modalClass), this.bodyOverflow || (this.bodyOverflow = document.body.style.overflow), document.body.style.overflow = "hidden"), "static" === getComputedStyle(t).position && (t.style.position = "absolute");var n = e.zIndex;o ? t.style.zIndex = d["default"].nextZIndex() : n && (t.style.zIndex = n), this.onOpen && this.onOpen(), this.transition || this.doAfterOpen();
	          }
	        }, doAfterOpen: function doAfterOpen() {
	          this._opening = !1;
	        }, close: function close() {
	          var e = this;if (!this.willClose || this.willClose()) {
	            null !== this._openTimer && (clearTimeout(this._openTimer), this._openTimer = null), clearTimeout(this._closeTimer);var t = Number(this.closeDelay);t > 0 ? this._closeTimer = setTimeout(function () {
	              e._closeTimer = null, e.doClose();
	            }, t) : this.doClose();
	          }
	        }, doClose: function doClose() {
	          this.visible = !1, this._closing = !0, this.onClose && this.onClose(), this.modal && (document.body.style.overflow = this.bodyOverflow), this.transition || this.doAfterClose();
	        }, doAfterClose: function doAfterClose() {
	          d["default"].closeModal(this._popupId), this._closing = !1;
	        } } };
	  }, function (e, t) {
	    "use strict";
	    Object.defineProperty(t, "__esModule", { value: !0 });var o = function o() {
	      var e = i.modalDom;return e || (e = document.createElement("div"), i.modalDom = e, e.addEventListener("touchmove", function (e) {
	        e.preventDefault(), e.stopPropagation();
	      }), e.addEventListener("click", function () {
	        i.doOnModalClick && i.doOnModalClick();
	      })), e;
	    },
	        n = {},
	        i = { zIndex: 1e3, getInstance: function getInstance(e) {
	        return n[e];
	      }, register: function register(e, t) {
	        e && t && (n[e] = t);
	      }, deregister: function deregister(e) {
	        e && (n[e] = null, delete n[e]);
	      }, nextZIndex: function nextZIndex() {
	        return i.zIndex++;
	      }, modalStack: [], doOnModalClick: function doOnModalClick() {
	        var e = i.modalStack[i.modalStack.length - 1];if (e) {
	          var t = i.getInstance(e.id);t && t.closeOnClickModal && t.close();
	        }
	      }, openModal: function openModal(e, t, n, i) {
	        if (e && void 0 !== t) {
	          for (var s = this.modalStack, l = 0, r = s.length; r > l; l++) {
	            var d = s[l];if (d.id === e) return;
	          }var a = o();if (a.classList.add("v-modal"), a.classList.add("v-modal-enter"), i) {
	            var u = i.trim().split(/\s+/);u.forEach(function (e) {
	              return a.classList.add(e);
	            });
	          }setTimeout(function () {
	            a.classList.remove("v-modal-enter");
	          }, 200), n && n.parentNode && 11 !== n.parentNode.nodeType ? n.parentNode.appendChild(a) : document.body.appendChild(a), t && (a.style.zIndex = t), a.style.display = "", this.modalStack.push({ id: e, zIndex: t, modalClass: i });
	        }
	      }, closeModal: function closeModal(e) {
	        var t = this.modalStack,
	            n = o();if (t.length > 0) {
	          var i = t[t.length - 1];if (i.id === e) {
	            if (i.modalClass) {
	              var s = i.modalClass.trim().split(/\s+/);s.forEach(function (e) {
	                return n.classList.remove(e);
	              });
	            }t.pop(), t.length > 0 && (n.style.zIndex = t[t.length - 1].zIndex);
	          } else for (var l = t.length - 1; l >= 0; l--) {
	            if (t[l].id === e) {
	              t.splice(l, 1);break;
	            }
	          }
	        }0 === t.length && (n.classList.add("v-modal-leave"), setTimeout(function () {
	          0 === t.length && (n.parentNode && n.parentNode.removeChild(n), n.style.display = "none"), n.classList.remove("v-modal-leave");
	        }, 200));
	      } };window.addEventListener("keydown", function (e) {
	      if (27 === e.keyCode && i.modalStack.length > 0) {
	        var t = i.modalStack[i.modalStack.length - 1];if (!t) return;var o = i.getInstance(t.id);o.closeOnPressEscape && o.close();
	      }
	    }), t["default"] = i;
	  }, function (e, t) {
	    "use strict";
	    function o(e) {
	      for (var t = 1, o = arguments.length; o > t; t++) {
	        var n = arguments[t];for (var i in n) {
	          if (n.hasOwnProperty(i)) {
	            var s = n[i];void 0 !== s && (e[i] = s);
	          }
	        }
	      }return e;
	    }Object.defineProperty(t, "__esModule", { value: !0 }), t.merge = o;
	  }, function (e, t) {}, function (t, o) {
	    t.exports = e;
	  }]);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)(module)))

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(13);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(64);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && _typeof2(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	};
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = { "default": __webpack_require__(14), __esModule: true };

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(15);
	__webpack_require__(59);
	module.exports = __webpack_require__(63).f('iterator');

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $at = __webpack_require__(16)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(19)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0; // next index
	  // 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t,
	      index = this._i,
	      point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toInteger = __webpack_require__(17),
	    defined = __webpack_require__(18);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that)),
	        i = toInteger(pos),
	        l = s.length,
	        a,
	        b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	// 7.1.4 ToInteger
	var ceil = Math.ceil,
	    floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	
	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var LIBRARY = __webpack_require__(20),
	    $export = __webpack_require__(21),
	    redefine = __webpack_require__(36),
	    hide = __webpack_require__(26),
	    has = __webpack_require__(37),
	    Iterators = __webpack_require__(38),
	    $iterCreate = __webpack_require__(39),
	    setToStringTag = __webpack_require__(55),
	    getPrototypeOf = __webpack_require__(57),
	    ITERATOR = __webpack_require__(56)('iterator'),
	    BUGGY = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	,
	    FF_ITERATOR = '@@iterator',
	    KEYS = 'keys',
	    VALUES = 'values';
	
	var returnThis = function returnThis() {
	  return this;
	};
	
	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function getMethod(kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS:
	        return function keys() {
	          return new Constructor(this, kind);
	        };
	      case VALUES:
	        return function values() {
	          return new Constructor(this, kind);
	        };
	    }return function entries() {
	      return new Constructor(this, kind);
	    };
	  };
	  var TAG = NAME + ' Iterator',
	      DEF_VALUES = DEFAULT == VALUES,
	      VALUES_BUG = false,
	      proto = Base.prototype,
	      $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
	      $default = $native || getMethod(DEFAULT),
	      $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined,
	      $anyNative = NAME == 'Array' ? proto.entries || $native : $native,
	      methods,
	      key,
	      IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() {
	      return $native.call(this);
	    };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = true;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(22),
	    core = __webpack_require__(23),
	    ctx = __webpack_require__(24),
	    hide = __webpack_require__(26),
	    PROTOTYPE = 'prototype';
	
	var $export = function $export(type, name, source) {
	  var IS_FORCED = type & $export.F,
	      IS_GLOBAL = type & $export.G,
	      IS_STATIC = type & $export.S,
	      IS_PROTO = type & $export.P,
	      IS_BIND = type & $export.B,
	      IS_WRAP = type & $export.W,
	      exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
	      expProto = exports[PROTOTYPE],
	      target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
	      key,
	      own,
	      out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? function (C) {
	      var F = function F(a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0:
	              return new C();
	            case 1:
	              return new C(a);
	            case 2:
	              return new C(a, b);
	          }return new C(a, b, c);
	        }return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	      // make static versions for prototype methods
	    }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1; // forced
	$export.G = 2; // global
	$export.S = 4; // static
	$export.P = 8; // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	$export.U = 64; // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	var core = module.exports = { version: '2.4.0' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// optional / simple context binding
	var aFunction = __webpack_require__(25);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };
	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };
	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }
	  return function () /* ...args */{
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var dP = __webpack_require__(27),
	    createDesc = __webpack_require__(35);
	module.exports = __webpack_require__(31) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var anObject = __webpack_require__(28),
	    IE8_DOM_DEFINE = __webpack_require__(30),
	    toPrimitive = __webpack_require__(34),
	    dP = Object.defineProperty;
	
	exports.f = __webpack_require__(31) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) {/* empty */}
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isObject = __webpack_require__(29);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	module.exports = function (it) {
	  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = !__webpack_require__(31) && !__webpack_require__(32)(function () {
	  return Object.defineProperty(__webpack_require__(33)('div'), 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(32)(function () {
	  return Object.defineProperty({}, 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isObject = __webpack_require__(29),
	    document = __webpack_require__(22).document
	// in old IE typeof document.createElement is 'object'
	,
	    is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(29);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(26);

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";
	
	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var create = __webpack_require__(40),
	    descriptor = __webpack_require__(35),
	    setToStringTag = __webpack_require__(55),
	    IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(26)(IteratorPrototype, __webpack_require__(56)('iterator'), function () {
	  return this;
	});
	
	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(28),
	    dPs = __webpack_require__(41),
	    enumBugKeys = __webpack_require__(53),
	    IE_PROTO = __webpack_require__(50)('IE_PROTO'),
	    Empty = function Empty() {/* empty */},
	    PROTOTYPE = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var _createDict = function createDict() {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(33)('iframe'),
	      i = enumBugKeys.length,
	      lt = '<',
	      gt = '>',
	      iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(54).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  _createDict = iframeDocument.F;
	  while (i--) {
	    delete _createDict[PROTOTYPE][enumBugKeys[i]];
	  }return _createDict();
	};
	
	module.exports = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = _createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var dP = __webpack_require__(27),
	    anObject = __webpack_require__(28),
	    getKeys = __webpack_require__(42);
	
	module.exports = __webpack_require__(31) ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties),
	      length = keys.length,
	      i = 0,
	      P;
	  while (length > i) {
	    dP.f(O, P = keys[i++], Properties[P]);
	  }return O;
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(43),
	    enumBugKeys = __webpack_require__(53);
	
	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var has = __webpack_require__(37),
	    toIObject = __webpack_require__(44),
	    arrayIndexOf = __webpack_require__(47)(false),
	    IE_PROTO = __webpack_require__(50)('IE_PROTO');
	
	module.exports = function (object, names) {
	  var O = toIObject(object),
	      i = 0,
	      result = [],
	      key;
	  for (key in O) {
	    if (key != IE_PROTO) has(O, key) && result.push(key);
	  } // Don't enum bug & hidden keys
	  while (names.length > i) {
	    if (has(O, key = names[i++])) {
	      ~arrayIndexOf(result, key) || result.push(key);
	    }
	  }return result;
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(45),
	    defined = __webpack_require__(18);
	module.exports = function (it) {
	  return IObject(defined(it));
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(46);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	"use strict";
	
	var toString = {}.toString;
	
	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(44),
	    toLength = __webpack_require__(48),
	    toIndex = __webpack_require__(49);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this),
	        length = toLength(O.length),
	        index = toIndex(fromIndex, length),
	        value;
	    // Array#includes uses SameValueZero equality algorithm
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      if (value != value) return true;
	      // Array#toIndex ignores holes, Array#includes - not
	    } else for (; length > index; index++) {
	      if (IS_INCLUDES || index in O) {
	        if (O[index] === el) return IS_INCLUDES || index || 0;
	      }
	    }return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.1.15 ToLength
	var toInteger = __webpack_require__(17),
	    min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toInteger = __webpack_require__(17),
	    max = Math.max,
	    min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var shared = __webpack_require__(51)('keys'),
	    uid = __webpack_require__(52);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(22),
	    SHARED = '__core-js_shared__',
	    store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';
	
	var id = 0,
	    px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	'use strict';
	
	// IE 8- don't enum bug keys
	module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(22).document && document.documentElement;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var def = __webpack_require__(27).f,
	    has = __webpack_require__(37),
	    TAG = __webpack_require__(56)('toStringTag');
	
	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var store = __webpack_require__(51)('wks'),
	    uid = __webpack_require__(52),
	    _Symbol = __webpack_require__(22).Symbol,
	    USE_SYMBOL = typeof _Symbol == 'function';
	
	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(37),
	    toObject = __webpack_require__(58),
	    IE_PROTO = __webpack_require__(50)('IE_PROTO'),
	    ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  }return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(18);
	module.exports = function (it) {
	  return Object(defined(it));
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(60);
	var global = __webpack_require__(22),
	    hide = __webpack_require__(26),
	    Iterators = __webpack_require__(38),
	    TO_STRING_TAG = __webpack_require__(56)('toStringTag');
	
	for (var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++) {
	  var NAME = collections[i],
	      Collection = global[NAME],
	      proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addToUnscopables = __webpack_require__(61),
	    step = __webpack_require__(62),
	    Iterators = __webpack_require__(38),
	    toIObject = __webpack_require__(44);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(19)(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0; // next index
	  this._k = kind; // kind
	  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t,
	      kind = this._k,
	      index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 61 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function () {/* empty */};

/***/ },
/* 62 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.f = __webpack_require__(56);

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(66);
	__webpack_require__(77);
	__webpack_require__(78);
	__webpack_require__(79);
	module.exports = __webpack_require__(23).Symbol;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var global = __webpack_require__(22),
	    has = __webpack_require__(37),
	    DESCRIPTORS = __webpack_require__(31),
	    $export = __webpack_require__(21),
	    redefine = __webpack_require__(36),
	    META = __webpack_require__(67).KEY,
	    $fails = __webpack_require__(32),
	    shared = __webpack_require__(51),
	    setToStringTag = __webpack_require__(55),
	    uid = __webpack_require__(52),
	    wks = __webpack_require__(56),
	    wksExt = __webpack_require__(63),
	    wksDefine = __webpack_require__(68),
	    keyOf = __webpack_require__(69),
	    enumKeys = __webpack_require__(70),
	    isArray = __webpack_require__(73),
	    anObject = __webpack_require__(28),
	    toIObject = __webpack_require__(44),
	    toPrimitive = __webpack_require__(34),
	    createDesc = __webpack_require__(35),
	    _create = __webpack_require__(40),
	    gOPNExt = __webpack_require__(74),
	    $GOPD = __webpack_require__(76),
	    $DP = __webpack_require__(27),
	    $keys = __webpack_require__(42),
	    gOPD = $GOPD.f,
	    dP = $DP.f,
	    gOPN = gOPNExt.f,
	    $Symbol = global.Symbol,
	    $JSON = global.JSON,
	    _stringify = $JSON && $JSON.stringify,
	    PROTOTYPE = 'prototype',
	    HIDDEN = wks('_hidden'),
	    TO_PRIMITIVE = wks('toPrimitive'),
	    isEnum = {}.propertyIsEnumerable,
	    SymbolRegistry = shared('symbol-registry'),
	    AllSymbols = shared('symbols'),
	    OPSymbols = shared('op-symbols'),
	    ObjectProto = Object[PROTOTYPE],
	    USE_NATIVE = typeof $Symbol == 'function',
	    QObject = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function () {
	  return _create(dP({}, 'a', {
	    get: function get() {
	      return dP(this, 'a', { value: 7 }).a;
	    }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function wrap(tag) {
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && _typeof($Symbol.iterator) == 'symbol' ? function (it) {
	  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if (has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, { enumerable: createDesc(0, false) });
	    }return setSymbolDesc(it, key, D);
	  }return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P)),
	      i = 0,
	      l = keys.length,
	      key;
	  while (l > i) {
	    $defineProperty(it, key = keys[i++], P[key]);
	  }return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	  var D = gOPD(it, key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN(toIObject(it)),
	      result = [],
	      i = 0,
	      key;
	  while (names.length > i) {
	    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  }return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto,
	      names = gOPN(IS_OP ? OPSymbols : toIObject(it)),
	      result = [],
	      i = 0,
	      key;
	  while (names.length > i) {
	    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  }return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function _Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function $set(value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f = $defineProperty;
	  __webpack_require__(75).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(72).f = $propertyIsEnumerable;
	  __webpack_require__(71).f = $getOwnPropertySymbols;
	
	  if (DESCRIPTORS && !__webpack_require__(20)) {
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function (name) {
	    return wrap(wks(name));
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });
	
	for (var symbols =
	// 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), i = 0; symbols.length > i;) {
	  wks(symbols[i++]);
	}for (var symbols = $keys(wks.store), i = 0; symbols.length > i;) {
	  wksDefine(symbols[i++]);
	}$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function _for(key) {
	    return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key) {
	    if (isSymbol(key)) return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function useSetter() {
	    setter = true;
	  },
	  useSimple: function useSimple() {
	    setter = false;
	  }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    var args = [it],
	        i = 1,
	        replacer,
	        $replacer;
	    while (arguments.length > i) {
	      args.push(arguments[i++]);
	    }replacer = args[1];
	    if (typeof replacer == 'function') $replacer = replacer;
	    if ($replacer || !isArray(replacer)) replacer = function replacer(key, value) {
	      if ($replacer) value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(26)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var META = __webpack_require__(52)('meta'),
	    isObject = __webpack_require__(29),
	    has = __webpack_require__(37),
	    setDesc = __webpack_require__(27).f,
	    id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !__webpack_require__(32)(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function setMeta(it) {
	  setDesc(it, META, { value: {
	      i: 'O' + ++id, // object ID
	      w: {} // weak collections IDs
	    } });
	};
	var fastKey = function fastKey(it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	    // return object ID
	  }return it[META].i;
	};
	var getWeak = function getWeak(it, create) {
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	    // return hash weak collections IDs
	  }return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function onFreeze(it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(22),
	    core = __webpack_require__(23),
	    LIBRARY = __webpack_require__(20),
	    wksExt = __webpack_require__(63),
	    defineProperty = __webpack_require__(27).f;
	module.exports = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getKeys = __webpack_require__(42),
	    toIObject = __webpack_require__(44);
	module.exports = function (object, el) {
	  var O = toIObject(object),
	      keys = getKeys(O),
	      length = keys.length,
	      index = 0,
	      key;
	  while (length > index) {
	    if (O[key = keys[index++]] === el) return key;
	  }
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(42),
	    gOPS = __webpack_require__(71),
	    pIE = __webpack_require__(72);
	module.exports = function (it) {
	  var result = getKeys(it),
	      getSymbols = gOPS.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it),
	        isEnum = pIE.f,
	        i = 0,
	        key;
	    while (symbols.length > i) {
	      if (isEnum.call(it, key = symbols[i++])) result.push(key);
	    }
	  }return result;
	};

/***/ },
/* 71 */
/***/ function(module, exports) {

	"use strict";
	
	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 72 */
/***/ function(module, exports) {

	"use strict";
	
	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(46);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(44),
	    gOPN = __webpack_require__(75).f,
	    toString = {}.toString;
	
	var windowNames = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function getWindowNames(it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys = __webpack_require__(43),
	    hiddenKeys = __webpack_require__(53).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var pIE = __webpack_require__(72),
	    createDesc = __webpack_require__(35),
	    toIObject = __webpack_require__(44),
	    toPrimitive = __webpack_require__(34),
	    has = __webpack_require__(37),
	    IE8_DOM_DEFINE = __webpack_require__(30),
	    gOPD = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(31) ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) {/* empty */}
	  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 77 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(68)('asyncIterator');

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(68)('observable');

/***/ },
/* 80 */
/***/ function(module, exports) {

	module.exports = "\n  <div class=\"msgbox-wrapper\" _v-10f95120=\"\">\n    <div class=\"msgbox\" v-if=\"rendered\" v-show=\"visible\" transition=\"pop-bounce\" _v-10f95120=\"\">\n      <div class=\"msgbox-header\" v-if=\"title\" _v-10f95120=\"\">\n        <span class=\"msgbox-title\" _v-10f95120=\"\">{{ title }}</span>\n        <span class=\"msgbox-close\" @click=\"handleAction('close')\" _v-10f95120=\"\">×</span>\n      </div>\n      <div class=\"msgbox-close-container\" v-else=\"\" _v-10f95120=\"\">\n        <span class=\"msgbox-close\" @click=\"handleAction('close')\" _v-10f95120=\"\">×</span>\n      </div>\n      <div class=\"msgbox-content\" v-if=\"message\" _v-10f95120=\"\">\n        <div class=\"msgbox-message\" _v-10f95120=\"\">{{ message }}</div>\n        <div class=\"msgbox-input\" v-show=\"showInput\" _v-10f95120=\"\">\n          <input type=\"text\" v-model=\"inputValue\" :placeholder=\"inputPlaceholder\" v-el:input=\"\" _v-10f95120=\"\">\n          <div class=\"msgbox-errormsg\" :style=\"{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }\" _v-10f95120=\"\">{{editorErrorMessage}}</div>\n        </div>\n      </div>\n      <div class=\"msgbox-btns\" :class=\"{ 'msgbox-btns-reverse': confirmButtonPosition === 'left' }\" _v-10f95120=\"\">\n        <button class=\"{{ confirmButtonClasses }}\" v-show=\"showConfirmButton\" @click=\"handleAction('confirm')\" _v-10f95120=\"\">{{ confirmButtonText }}</button>\n        <button class=\"{{ cancelButtonClasses }}\" v-show=\"showCancelButton\" @click=\"handleAction('cancel')\" _v-10f95120=\"\">{{ cancelButtonText }}</button>        \n      </div>\n    </div>\n  </div>\n";

/***/ }
/******/ ])));
//# sourceMappingURL=vue-msgbox.js.map