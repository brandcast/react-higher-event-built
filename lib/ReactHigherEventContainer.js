"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ReactHigherEventTypes = require("./ReactHigherEventTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactHigherEventContainer = function (_Component) {
  _inherits(ReactHigherEventContainer, _Component);

  function ReactHigherEventContainer(props) {
    _classCallCheck(this, ReactHigherEventContainer);

    var _this = _possibleConstructorReturn(this, (ReactHigherEventContainer.__proto__ || Object.getPrototypeOf(ReactHigherEventContainer)).call(this, props));

    _this.events = new Map();
    _this.proxySubscribers = new Set();
    _this.state = {};

    _this.subscribe = _this.subscribe.bind(_this);
    _this.handleEvent = _this.handleEvent.bind(_this);
    _this.proxySubscribe = _this.proxySubscribe.bind(_this);
    return _this;
  }

  _createClass(ReactHigherEventContainer, [{
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.state !== nextState) {
        this.proxySubscribers.forEach(function (subscriber) {
          return subscriber(nextState);
        });
      }
    }
  }, {
    key: "subscribe",
    value: function subscribe(eventType, handler) {
      var _this2 = this;

      var eventSubscribers = this.events.get(eventType);
      if (!eventSubscribers) {
        eventSubscribers = new Set();
        this.events.set(eventType, eventSubscribers);
        this.updateEventProp({ eventType: eventType, create: true });
      }
      eventSubscribers.add(handler);
      return function () {
        var eventSubscribers = _this2.events.get(eventType);
        if (eventSubscribers) {
          eventSubscribers.delete(handler);
          if (eventSubscribers.size === 0) {
            _this2.events.delete(eventType);
            _this2.updateEventProp({ eventType: eventType, create: false });
          }
        }
      };
    }
  }, {
    key: "proxySubscribe",
    value: function proxySubscribe(handler) {
      var _this3 = this;

      this.proxySubscribers.add(handler);
      handler(this.state);
      return function () {
        _this3.proxySubscribers.delete(handler);
      };
    }
  }, {
    key: "updateEventProp",
    value: function updateEventProp(_ref) {
      var _this4 = this;

      var eventType = _ref.eventType,
          create = _ref.create;

      this.setState(function (state) {
        if (!!state[eventType] === create) {
          return state;
        }
        return _extends({}, state, _defineProperty({}, eventType, create ? _this4.handleEvent.bind(null, eventType) : null));
      });
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(eventType, event) {
      if (!this.events.has(eventType)) {
        return;
      }
      var subscribers = this.events.get(eventType);
      if (subscribers) {
        subscribers.forEach(function (func) {
          return func(event);
        });
      }
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      return {
        higherEvent: {
          subscribe: this.subscribe
        },
        higherEventProxy: {
          subscribe: this.proxySubscribe
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          children = _props.children,
          component = _props.component,
          props = _objectWithoutProperties(_props, ["children", "component"]);

      var Component = component || "div";
      return _react2.default.createElement(
        Component,
        _extends({}, props, this.state),
        children
      );
    }
  }]);

  return ReactHigherEventContainer;
}(_react.Component);

ReactHigherEventContainer.childContextTypes = _extends({}, _ReactHigherEventTypes.ContextTypes, _ReactHigherEventTypes.ProxyContextTypes);

exports.default = ReactHigherEventContainer;