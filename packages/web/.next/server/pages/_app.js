module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/global */ \"./styles/global.ts\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _styles_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../styles/theme */ \"./styles/theme.ts\");\nvar _jsxFileName = \"/Users/mel/Desktop/brother.bet/packages/web/src/pages/_app.tsx\";\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\n\nconst MyApp = ({\n  Component,\n  pageProps\n}) => {\n  return __jsx(styled_components__WEBPACK_IMPORTED_MODULE_2__[\"ThemeProvider\"], {\n    theme: _styles_theme__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 9,\n      columnNumber: 5\n    }\n  }, __jsx(Component, _extends({}, pageProps, {\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 10,\n      columnNumber: 7\n    }\n  })), __jsx(_styles_global__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 11,\n      columnNumber: 7\n    }\n  }));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MyApp);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvX2FwcC50c3g/ODU0OCJdLCJuYW1lcyI6WyJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInRoZW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQTtBQUNBOztBQUVBLE1BQU1BLEtBQXlCLEdBQUcsQ0FBQztBQUFFQyxXQUFGO0FBQWFDO0FBQWIsQ0FBRCxLQUE4QjtBQUM5RCxTQUNFLE1BQUMsK0RBQUQ7QUFBZSxTQUFLLEVBQUVDLHFEQUF0QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxTQUFELGVBQWVELFNBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQURGLEVBRUUsTUFBQyxzREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBRkYsQ0FERjtBQU1ELENBUEQ7O0FBU2VGLG9FQUFmIiwiZmlsZSI6Ii4vc3JjL3BhZ2VzL19hcHAudHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUHJvcHMgfSBmcm9tICduZXh0L2FwcCc7XG5cbmltcG9ydCBHbG9iYWxTdHlsZSBmcm9tICcuLi8uLi9zdHlsZXMvZ2xvYmFsJztcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vc3R5bGVzL3RoZW1lJztcblxuY29uc3QgTXlBcHA6IFJlYWN0LkZDPEFwcFByb3BzPiA9ICh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8VGhlbWVQcm92aWRlciB0aGVtZT17dGhlbWV9PlxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgPEdsb2JhbFN0eWxlIC8+XG4gICAgPC9UaGVtZVByb3ZpZGVyPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./styles/global.ts":
/*!**************************!*\
  !*** ./styles/global.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (styled_components__WEBPACK_IMPORTED_MODULE_0__[\"createGlobalStyle\"]`\n*{\n  margin:0;\n  padding:0;\n  box-sizing:border-box;\n}\n\nbody{\n  background: white;\n  color:${props => props.theme.colors.primary.one};\n}\n\n`);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdHlsZXMvZ2xvYmFsLnRzPzE1N2UiXSwibmFtZXMiOlsiY3JlYXRlR2xvYmFsU3R5bGUiLCJwcm9wcyIsInRoZW1lIiwiY29sb3JzIiwicHJpbWFyeSIsIm9uZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFFZUEsa0lBQWtCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFXQyxLQUFELElBQVdBLEtBQUssQ0FBQ0MsS0FBTixDQUFZQyxNQUFaLENBQW1CQyxPQUFuQixDQUEyQkMsR0FBSTtBQUNwRDtBQUNBO0FBQ0EsQ0FaQSIsImZpbGUiOiIuL3N0eWxlcy9nbG9iYWwudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVHbG9iYWxTdHlsZSB9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVHbG9iYWxTdHlsZWBcbip7XG4gIG1hcmdpbjowO1xuICBwYWRkaW5nOjA7XG4gIGJveC1zaXppbmc6Ym9yZGVyLWJveDtcbn1cblxuYm9keXtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGNvbG9yOiR7KHByb3BzKSA9PiBwcm9wcy50aGVtZS5jb2xvcnMucHJpbWFyeS5vbmV9O1xufVxuXG5gXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./styles/global.ts\n");

/***/ }),

/***/ "./styles/theme.ts":
/*!*************************!*\
  !*** ./styles/theme.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst theme = {\n  colors: {\n    one: '#00D58F',\n    primary: {\n      one: '#00D58F',\n      two: '#50FA7B',\n      three: '#1BF852',\n      four: '#00FF0A'\n    },\n    secondary: {\n      one: '#BDB1F7',\n      two: '#9783FC',\n      three: '#6547FF',\n      four: '#502EFC'\n    },\n    tertiary: {\n      one: '#EEFA2D',\n      two: '#FFF500',\n      three: '#FFE14B',\n      four: '#FFD60A'\n    },\n    quaternary: {\n      one: '#F8C1DC',\n      two: '#FF80BF',\n      three: '#EC5D8D',\n      four: '#F5447F'\n    },\n    quinary: {\n      one: '#64D2FF',\n      two: '#0AB5FF',\n      three: '#0A84FF',\n      four: '#006AD6'\n    },\n    background: {\n      primary: {\n        one: '#48484A',\n        two: '#3A3A3C',\n        three: '#2C2C2E',\n        four: '#1C1C1E'\n      },\n      secondary: {\n        one: '#D4D4D7',\n        two: '#ADADAD',\n        three: '#8E8E93',\n        four: '#636366'\n      }\n    }\n  },\n  navigation: {\n    height: '4rem'\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (theme);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdHlsZXMvdGhlbWUudHM/ODlhNiJdLCJuYW1lcyI6WyJ0aGVtZSIsImNvbG9ycyIsIm9uZSIsInByaW1hcnkiLCJ0d28iLCJ0aHJlZSIsImZvdXIiLCJzZWNvbmRhcnkiLCJ0ZXJ0aWFyeSIsInF1YXRlcm5hcnkiLCJxdWluYXJ5IiwiYmFja2dyb3VuZCIsIm5hdmlnYXRpb24iLCJoZWlnaHQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBTUEsS0FBSyxHQUFHO0FBQ1pDLFFBQU0sRUFBRTtBQUNOQyxPQUFHLEVBQUUsU0FEQztBQUVOQyxXQUFPLEVBQUU7QUFBRUQsU0FBRyxFQUFFLFNBQVA7QUFBa0JFLFNBQUcsRUFBRSxTQUF2QjtBQUFrQ0MsV0FBSyxFQUFFLFNBQXpDO0FBQW9EQyxVQUFJLEVBQUU7QUFBMUQsS0FGSDtBQUlOQyxhQUFTLEVBQUU7QUFBRUwsU0FBRyxFQUFFLFNBQVA7QUFBa0JFLFNBQUcsRUFBRSxTQUF2QjtBQUFrQ0MsV0FBSyxFQUFFLFNBQXpDO0FBQW9EQyxVQUFJLEVBQUU7QUFBMUQsS0FKTDtBQU1ORSxZQUFRLEVBQUU7QUFBRU4sU0FBRyxFQUFFLFNBQVA7QUFBa0JFLFNBQUcsRUFBRSxTQUF2QjtBQUFrQ0MsV0FBSyxFQUFFLFNBQXpDO0FBQW9EQyxVQUFJLEVBQUU7QUFBMUQsS0FOSjtBQVFORyxjQUFVLEVBQUU7QUFBRVAsU0FBRyxFQUFFLFNBQVA7QUFBa0JFLFNBQUcsRUFBRSxTQUF2QjtBQUFrQ0MsV0FBSyxFQUFFLFNBQXpDO0FBQW9EQyxVQUFJLEVBQUU7QUFBMUQsS0FSTjtBQVVOSSxXQUFPLEVBQUU7QUFBRVIsU0FBRyxFQUFFLFNBQVA7QUFBa0JFLFNBQUcsRUFBRSxTQUF2QjtBQUFrQ0MsV0FBSyxFQUFFLFNBQXpDO0FBQW9EQyxVQUFJLEVBQUU7QUFBMUQsS0FWSDtBQVlOSyxjQUFVLEVBQUU7QUFDVlIsYUFBTyxFQUFFO0FBQ1BELFdBQUcsRUFBRSxTQURFO0FBRVBFLFdBQUcsRUFBRSxTQUZFO0FBR1BDLGFBQUssRUFBRSxTQUhBO0FBSVBDLFlBQUksRUFBRTtBQUpDLE9BREM7QUFPVkMsZUFBUyxFQUFFO0FBQ1RMLFdBQUcsRUFBRSxTQURJO0FBRVRFLFdBQUcsRUFBRSxTQUZJO0FBR1RDLGFBQUssRUFBRSxTQUhFO0FBSVRDLFlBQUksRUFBRTtBQUpHO0FBUEQ7QUFaTixHQURJO0FBNEJaTSxZQUFVLEVBQUU7QUFDVkMsVUFBTSxFQUFFO0FBREU7QUE1QkEsQ0FBZDtBQWlDZWIsb0VBQWYiLCJmaWxlIjoiLi9zdHlsZXMvdGhlbWUudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0aGVtZSA9IHtcbiAgY29sb3JzOiB7XG4gICAgb25lOiAnIzAwRDU4RicsXG4gICAgcHJpbWFyeTogeyBvbmU6ICcjMDBENThGJywgdHdvOiAnIzUwRkE3QicsIHRocmVlOiAnIzFCRjg1MicsIGZvdXI6ICcjMDBGRjBBJyB9LFxuXG4gICAgc2Vjb25kYXJ5OiB7IG9uZTogJyNCREIxRjcnLCB0d286ICcjOTc4M0ZDJywgdGhyZWU6ICcjNjU0N0ZGJywgZm91cjogJyM1MDJFRkMnIH0sXG5cbiAgICB0ZXJ0aWFyeTogeyBvbmU6ICcjRUVGQTJEJywgdHdvOiAnI0ZGRjUwMCcsIHRocmVlOiAnI0ZGRTE0QicsIGZvdXI6ICcjRkZENjBBJyB9LFxuXG4gICAgcXVhdGVybmFyeTogeyBvbmU6ICcjRjhDMURDJywgdHdvOiAnI0ZGODBCRicsIHRocmVlOiAnI0VDNUQ4RCcsIGZvdXI6ICcjRjU0NDdGJyB9LFxuXG4gICAgcXVpbmFyeTogeyBvbmU6ICcjNjREMkZGJywgdHdvOiAnIzBBQjVGRicsIHRocmVlOiAnIzBBODRGRicsIGZvdXI6ICcjMDA2QUQ2JyB9LFxuXG4gICAgYmFja2dyb3VuZDoge1xuICAgICAgcHJpbWFyeToge1xuICAgICAgICBvbmU6ICcjNDg0ODRBJyxcbiAgICAgICAgdHdvOiAnIzNBM0EzQycsXG4gICAgICAgIHRocmVlOiAnIzJDMkMyRScsXG4gICAgICAgIGZvdXI6ICcjMUMxQzFFJyxcbiAgICAgIH0sXG4gICAgICBzZWNvbmRhcnk6IHtcbiAgICAgICAgb25lOiAnI0Q0RDRENycsXG4gICAgICAgIHR3bzogJyNBREFEQUQnLFxuICAgICAgICB0aHJlZTogJyM4RThFOTMnLFxuICAgICAgICBmb3VyOiAnIzYzNjM2NicsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIG5hdmlnYXRpb246IHtcbiAgICBoZWlnaHQ6ICc0cmVtJyxcbiAgfSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGhlbWVcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./styles/theme.ts\n");

/***/ }),

/***/ 0:
/*!*****************************************!*\
  !*** multi private-next-pages/_app.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! private-next-pages/_app.tsx */"./src/pages/_app.tsx");


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"styled-components\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdHlsZWQtY29tcG9uZW50c1wiP2Y1YWQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoic3R5bGVkLWNvbXBvbmVudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHlsZWQtY29tcG9uZW50c1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///styled-components\n");

/***/ })

/******/ });