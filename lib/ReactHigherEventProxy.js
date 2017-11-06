"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ReactHigherEventProxyContextTypes = require("./ReactHigherEventProxyContextTypes");

var _ReactHigherEventProxyContextTypes2 = _interopRequireDefault(_ReactHigherEventProxyContextTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactHigherEventProxy = function (_Component) {
  _inherits(ReactHigherEventProxy, _Component);

  function ReactHigherEventProxy() {
    _classCallCheck(this, ReactHigherEventProxy);

    return _possibleConstructorReturn(this, (ReactHigherEventProxy.__proto__ || Object.getPrototypeOf(ReactHigherEventProxy)).apply(this, arguments));
  }

  _createClass(ReactHigherEventProxy, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var higherEventProxy = this.context.higherEventProxy;

      this.unsubscribe = higherEventProxy.subscribe(this.forceUpdate.bind(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: "getEventProps",
    value: function getEventProps() {
      var higherEventProxy = this.context.higherEventProxy;

      return Array.from(higherEventProxy.events.keys()).reduce(function (acc, key) {
        return _extends({}, acc, _defineProperty({}, key, higherEventProxy.handleEvent.bind(null, key)));
      }, {});
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          children = _props.children,
          props = _objectWithoutProperties(_props, ["children"]);

      return _react2.default.createElement(
        "div",
        _extends({}, props, this.getEventProps()),
        children
      );
    }
  }]);

  return ReactHigherEventProxy;
}(_react.Component);

ReactHigherEventProxy.contextTypes = _ReactHigherEventProxyContextTypes2.default;

exports.default = ReactHigherEventProxy;