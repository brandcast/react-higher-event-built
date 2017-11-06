"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ReactHigherEventContextTypes = require("./ReactHigherEventContextTypes");

var _ReactHigherEventContextTypes2 = _interopRequireDefault(_ReactHigherEventContextTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactHigherEvent = function (_Component) {
  _inherits(ReactHigherEvent, _Component);

  function ReactHigherEvent() {
    _classCallCheck(this, ReactHigherEvent);

    return _possibleConstructorReturn(this, (ReactHigherEvent.__proto__ || Object.getPrototypeOf(ReactHigherEvent)).apply(this, arguments));
  }

  _createClass(ReactHigherEvent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var higherEvent = this.context.higherEvent;

      var _props = this.props,
          children = _props.children,
          props = _objectWithoutProperties(_props, ["children"]);

      this.unsubscribers = Object.keys(props).reduce(function (acc, eventType) {
        if (typeof props[eventType] === "function") {
          acc[eventType] = higherEvent.subscribe(eventType, props[eventType]);
        }
        return acc;
      }, {});
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this2 = this;

      Object.keys(this.unsubscribers).forEach(function (key) {
        _this2.unsubscribers[key]();
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      var higherEvent = this.context.higherEvent;

      var previousKeys = new Set(Object.keys(this.props));
      var nextKeys = new Set(Object.keys(nextProps));
      previousKeys.forEach(function (key) {
        if (key === "children") {
          return;
        }
        if (!nextKeys.has(key)) {
          if (typeof _this3.unsubscribers[key] === "function") {
            _this3.unsubscribers[key]();
          }
          delete _this3.unsubscribers[key];
        }
        if (nextProps[key] !== _this3.props[key]) {
          if (typeof _this3.unsubscribers[key] === "function") {
            _this3.unsubscribers[key]();
          }
          delete _this3.unsubscribers[key];
          if (typeof nextProps[key] === "function") {
            _this3.unsubscribers[key] = higherEvent.subscribe(key, nextProps[key]);
          }
        }
      });
      nextKeys.forEach(function (key) {
        if (key === "children") {
          return;
        }
        if (!previousKeys.has(key)) {
          if (typeof nextProps[key] === "function") {
            _this3.unsubscribers[key] = higherEvent.subscribe(key, nextProps[key]);
          }
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react.Children.only(this.props.children);
    }
  }]);

  return ReactHigherEvent;
}(_react.Component);

ReactHigherEvent.contextTypes = _ReactHigherEventContextTypes2.default;

exports.default = ReactHigherEvent;