'use strict';

Object.defineProperty(exports, '__esModule', {value: true});

var React = require('react');
var useApp = require('../../dist/useApp-3fea9f08.cjs.dev.js');

function _interopDefault(e) {
  return e && e.__esModule ? e : {default: e};
}

var React__default = /*#__PURE__*/ _interopDefault(React);

function AppProvider(_ref) {
  var app = _ref.app,
    children = _ref.children;
  return /*#__PURE__*/ React__default['default'].createElement(
    useApp.AppContext.Provider,
    {
      value: app,
    },
    children,
  );
}

exports.useApp = useApp.useApp;
exports.AppProvider = AppProvider;
