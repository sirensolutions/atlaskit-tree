"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var _path = require("../../utils/path");

var _react2 = require("../../utils/react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var TreeItem = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(TreeItem, _Component);

  var _super = _createSuper(TreeItem);

  function TreeItem() {
    var _this;

    (0, _classCallCheck2.default)(this, TreeItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "patchDraggableProps", function (draggableProps, snapshot) {
      var _this$props = _this.props,
          path = _this$props.path,
          offsetPerLevel = _this$props.offsetPerLevel;
      var transitions = draggableProps.style && draggableProps.style.transition ? [draggableProps.style.transition] : [];

      if (snapshot.dropAnimation) {
        transitions.push( // @ts-ignore
        "padding-left ".concat(snapshot.dropAnimation.duration, "s ").concat(snapshot.dropAnimation.curve));
      }

      var transition = transitions.join(', ');
      return _objectSpread(_objectSpread({}, draggableProps), {}, {
        style: _objectSpread(_objectSpread({}, draggableProps.style), {}, {
          paddingLeft: (path.length - 1) * offsetPerLevel,
          // @ts-ignore
          transition: transition
        })
      });
    });
    return _this;
  }

  (0, _createClass2.default)(TreeItem, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return !(0, _react2.sameProps)(this.props, nextProps, ['item', 'provided', 'snapshot', 'onCollapse', 'onExpand']) || !(0, _path.isSamePath)(this.props.path, nextProps.path);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          item = _this$props2.item,
          path = _this$props2.path,
          _onExpand = _this$props2.onExpand,
          _onCollapse = _this$props2.onCollapse,
          renderItem = _this$props2.renderItem,
          provided = _this$props2.provided,
          snapshot = _this$props2.snapshot,
          itemRef = _this$props2.itemRef;

      var innerRef = function innerRef(el) {
        itemRef(item.id, el);
        provided.innerRef(el);
      };

      var finalProvided = {
        draggableProps: this.patchDraggableProps(provided.draggableProps, snapshot),
        dragHandleProps: provided.dragHandleProps,
        innerRef: innerRef
      };
      return renderItem({
        item: item,
        depth: path.length - 1,
        onExpand: function onExpand(itemId) {
          return _onExpand(itemId, path);
        },
        onCollapse: function onCollapse(itemId) {
          return _onCollapse(itemId, path);
        },
        provided: finalProvided,
        snapshot: snapshot
      });
    }
  }]);
  return TreeItem;
}(_react.Component);

exports.default = TreeItem;