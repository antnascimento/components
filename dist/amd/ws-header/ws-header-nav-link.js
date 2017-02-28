define(["exports", "../imports"], function (exports, _imports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var WSHeaderNavLink = function (_Component) {
    _inherits(WSHeaderNavLink, _Component);

    function WSHeaderNavLink() {
      _classCallCheck(this, WSHeaderNavLink);

      return _possibleConstructorReturn(this, (WSHeaderNavLink.__proto__ || Object.getPrototypeOf(WSHeaderNavLink)).apply(this, arguments));
    }

    _createClass(WSHeaderNavLink, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        return _imports.React.createElement(
          "li",
          { className: "nav-link", key: this.props.key, onClick: function onClick() {
              return _this2.props.link.onclick && _this2.props.link.onclick(_this2.props.link.value);
            } },
          _imports.React.createElement(
            "a",
            null,
            this.props.link.label
          )
        );
      }
    }]);

    return WSHeaderNavLink;
  }(_imports.Component);

  exports.default = WSHeaderNavLink;
});