"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactHigherEventProxyContextTypes = {
  higherEventProxy: _propTypes2.default.shape({
    handleEvent: _propTypes2.default.func.isRequired,
    subscribe: _propTypes2.default.func.isRequired,
    events: _propTypes2.default.instanceOf(Map).isRequired
  }).isRequired
};

exports.default = ReactHigherEventProxyContextTypes;