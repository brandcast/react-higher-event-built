"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProxyContextTypes = exports.ContextTypes = undefined;

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContextTypes = exports.ContextTypes = {
  higherEvent: _propTypes2.default.shape({
    subscribe: _propTypes2.default.func.isRequired
  }).isRequired
};
var ProxyContextTypes = exports.ProxyContextTypes = {
  higherEventProxy: _propTypes2.default.shape({
    subscribe: _propTypes2.default.func.isRequired
  }).isRequired
};