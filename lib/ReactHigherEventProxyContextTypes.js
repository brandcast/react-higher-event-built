"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var ReactHigherEventProxyContextTypes = {
  higherEventProxy: _react.PropTypes.shape({
    handleEvent: _react.PropTypes.func.isRequired,
    subscribe: _react.PropTypes.func.isRequired,
    events: _react.PropTypes.instanceOf(Map).isRequired
  }).isRequired
};

exports.default = ReactHigherEventProxyContextTypes;