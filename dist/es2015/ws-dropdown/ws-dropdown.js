var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { React, Component, PropTypes } from '../imports';
import { DropdownMenu } from './dropdown-menu';
import { DropdownInput } from './dropdown-input';

var ANIMATION_END_EVENTS = ['oAnimationEnd', 'MSAnimationEnd', 'animationend'];

export var WSDropdown = function (_Component) {
  _inherits(WSDropdown, _Component);

  function WSDropdown(props) {
    _classCallCheck(this, WSDropdown);

    var _this = _possibleConstructorReturn(this, (WSDropdown.__proto__ || Object.getPrototypeOf(WSDropdown)).call(this, props));

    Object.defineProperty(_this, 'onDocumentClick', {
      enumerable: true,
      writable: true,
      value: function value(event) {
        var element = event.target;
        while (element && _this.element !== element) {
          element = element.parentNode;
        }

        if (!element) {
          _this.close();
        }
      }
    });
    Object.defineProperty(_this, 'onTriggerClick', {
      enumerable: true,
      writable: true,
      value: function value(event) {
        event.stopPropagation();
        if (WSDropdown.openDropdown !== _this) {
          _this.open();
        } else {
          _this.close();
        }
      }
    });
    Object.defineProperty(_this, 'onAnyEvent', {
      enumerable: true,
      writable: true,
      value: function value(event) {
        event.stopPropagation();
      }
    });
    Object.defineProperty(_this, 'onGlobalKeyDown', {
      enumerable: true,
      writable: true,
      value: function value(event) {
        switch (event.key) {
          case 'Escape':
            _this.close();
            break;
          default:
            break;
        }
      }
    });
    Object.defineProperty(_this, 'handlePropagation', {
      enumerable: true,
      writable: true,
      value: function value(type, data) {
        if (type === 'change') {
          _this.close();
          _this.setValue(data);
        } else if (type === 'change-size') {
          _this.adjustSize(data);
        }
      }
    });

    _this.state = _this.createState(props);
    return _this;
  }

  _createClass(WSDropdown, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        multiple: this.props.multiple
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.element.addEventListener('click', this.onAnyEvent);
      this.trigger.addEventListener('click', this.onTriggerClick);
      window.addEventListener('click', this.onDocumentClick);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState(this.createState(props));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.element.removeEventListener('click', this.onAnyEvent);
      this.trigger.removeEventListener('click', this.onTriggerClick);
      window.removeEventListener('click', this.onDocumentClick);
    }
  }, {
    key: 'getTextFromValue',
    value: function getTextFromValue(value) {
      var propsText = (arguments.length <= 1 ? 0 : arguments.length - 1) > 0 ? arguments.length <= 1 ? undefined : arguments[1] : '';
      var text = propsText || (this.state && this.state.text ? this.state.text : '');

      if (this.props.type === 'select') {
        if (Array.isArray(value) && value.length) {
          text = value.map(function (item) {
            return item.label || item;
          }).join(', ');
        } else if (value) {
          text = value.label || value;
        }
      }
      return text;
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      var _this2 = this;

      this.setState({
        text: this.getTextFromValue(value),
        value: value
      });

      if (this.props.onChange) {
        this.props.onChange(value);
      }

      setTimeout(function () {
        _this2.element.dispatchEvent(new CustomEvent('change', { detail: value, bubbles: true }));
      }, 100);
    }
  }, {
    key: 'createState',
    value: function createState(props) {
      var items = this.enrichItems(props.items);
      var value = props.value;

      if (typeof value === 'string' && props.type !== 'input') {
        value = items.find(function (item) {
          return item.value === value;
        });
      }
      value = this.enrichItems(value);
      var text = this.getTextFromValue(props.value, props.text);
      var state = { text: text, value: value, items: items };

      state.items.forEach(function (item) {
        var isActive = !!state.value.find(function (val) {
          return val.value === item.value;
        });
        item.selected = isActive;
        item.stored = isActive;
      });
      return state;
    }
  }, {
    key: 'enrichItems',
    value: function enrichItems(items) {
      var _this3 = this;

      var itemsToWrap = items;

      if (!Array.isArray(items)) {
        if (this.props.inputOnly) {
          return items;
        }

        itemsToWrap = items ? [items] : [];
      }
      return itemsToWrap.map(function (item) {
        var enriched = (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' ? item : { label: item, value: item };
        if (enriched.children) {
          enriched.children = _this3.enrichItems(enriched.children);
        }
        return enriched;
      });
    }
  }, {
    key: 'open',
    value: function open() {
      if (WSDropdown.openDropdown === this || this.props.disabled) {
        return;
      } else if (WSDropdown.openDropdown) {
        WSDropdown.openDropdown.close();
      }

      WSDropdown.openDropdown = this;
      this.dropdownContainer.style.height = 0;
      this.dropdownContainer.classList.add('mod-open');
      this.adjustSize(this.dropdownMenu.getHeight());

      window.addEventListener('keydown', this.onGlobalKeyDown);

      if (typeof this.dropdownMenu.onOpen === 'function') {
        this.dropdownMenu.onOpen();
      }
    }
  }, {
    key: 'close',
    value: function close() {
      var _this4 = this;

      if (WSDropdown.openDropdown !== this) {
        return;
      }
      WSDropdown.openDropdown = null;
      this.animateElement(this.dropdownContainer, 'animate-close', function (container) {
        container.classList.remove('mod-open');

        if (_this4.props.multiple) {
          _this4.dropdownMenu.clearSelections();
        }
      });

      window.addEventListener('keydown', this.onGlobalKeyDown);

      if (typeof this.dropdownMenu.onClose === 'function') {
        this.dropdownMenu.onClose();
      }
    }
  }, {
    key: 'adjustSize',
    value: function adjustSize(newSize) {
      this.dropdownContainer.style.height = newSize + 'px';
    }
  }, {
    key: 'animateElement',
    value: function animateElement(item, animationClass, callback) {
      var getEventHandler = function getEventHandler(eventName) {
        var eventHandler = function eventHandler() {
          item.classList.remove(animationClass);
          item.removeEventListener(eventName, eventHandler);
          callback(item);
        };
        return eventHandler;
      };

      ANIMATION_END_EVENTS.forEach(function (eventName) {
        item.addEventListener(eventName, getEventHandler(eventName));
      });

      item.classList.add(animationClass);
    }
  }, {
    key: 'renderTrigger',
    value: function renderTrigger() {
      var _this5 = this;

      var icon = void 0;
      if (this.props.icon) {
        icon = React.createElement('span', { className: 'icon ' + this.props.icon });
      }
      var disabledStyle = this.props.disabled ? ' is-disabled' : '';
      switch (this.props.type) {
        case 'anchor':
          return React.createElement(
            'a',
            {
              className: 'dropdown-trigger ' + disabledStyle,
              ref: function ref(element) {
                _this5.trigger = element;
              }
            },
            icon,
            ' ',
            this.state.text
          );
        case 'button':
          return React.createElement(
            'button',
            {
              className: 'dropdown-trigger ' + disabledStyle,
              ref: function ref(element) {
                _this5.trigger = element;
              }
            },
            icon,
            ' ',
            this.state.text
          );
        case 'select':
          return React.createElement(
            'div',
            {
              className: 'dropdown-trigger select-box ' + disabledStyle,
              ref: function ref(element) {
                _this5.trigger = element;
              }
            },
            icon,
            ' ',
            this.state.text
          );
        case 'icon':
        default:
          return React.createElement(
            'a',
            {
              className: 'dropdown-trigger ' + disabledStyle,
              ref: function ref(element) {
                _this5.trigger = element;
              }
            },
            icon
          );
      }
    }
  }, {
    key: 'renderContent',
    value: function renderContent() {
      var _this6 = this;

      if (this.props.inputOnly) {
        return React.createElement(DropdownInput, {
          value: this.state.value,
          placeholder: this.props.placeholder,
          handle: this.handlePropagation,
          ref: function ref(element) {
            _this6.dropdownMenu = element;
          }
        });
      }
      return React.createElement(DropdownMenu, {
        items: this.state.items,
        value: this.state.value,
        limit: this.props.limit,
        filterable: this.props.filterable,
        filter: this.props.filter,
        placeholder: this.props.placeholder,
        selectAll: this.props.selectAll,
        handle: this.handlePropagation,
        ref: function ref(element) {
          _this6.dropdownMenu = element;
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var isWide = this.props.type === 'select';
      return React.createElement(
        'div',
        { className: 'dropdown', ref: function ref(element) {
            if (element) {
              _this7.element = element;
            }
          } },
        this.renderTrigger(),
        React.createElement(
          'div',
          {
            className: 'dropdown-container ' + this.props.orientation,
            style: { width: this.props.width || (isWide ? '100%' : '') },
            ref: function ref(element) {
              if (element) {
                _this7.dropdownContainer = element;
              }
            }
          },
          this.renderContent()
        ),
        React.createElement('div', { className: 'dropdown-arrow' })
      );
    }
  }]);

  return WSDropdown;
}(Component);
Object.defineProperty(WSDropdown, 'defaultProps', {
  enumerable: true,
  writable: true,
  value: {
    type: 'anchor',
    text: '',
    icon: '',
    items: [],
    multiple: false,
    inputOnly: false,
    filterable: false,
    filter: '',
    limit: 10,
    orientation: 'left',
    placeholder: '',
    width: '',
    value: null,
    onChange: function onChange() {},
    disabled: false,
    selectAll: false
  }
});
Object.defineProperty(WSDropdown, 'propTypes', {
  enumerable: true,
  writable: true,
  value: {
    type: PropTypes.oneOf(['anchor', 'button', 'select', 'icon']),
    text: PropTypes.string,
    icon: PropTypes.string,
    items: PropTypes.array,
    multiple: PropTypes.bool,
    filterable: PropTypes.bool,
    inputOnly: PropTypes.bool,
    filter: PropTypes.string,
    limit: PropTypes.number,
    orientation: PropTypes.oneOf(['left', 'right']),
    placeholder: PropTypes.string,
    width: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    selectAll: PropTypes.bool
  }
});
Object.defineProperty(WSDropdown, 'openDropdown', {
  enumerable: true,
  writable: true,
  value: null
});
Object.defineProperty(WSDropdown, 'childContextTypes', {
  enumerable: true,
  writable: true,
  value: {
    multiple: PropTypes.bool
  }
});