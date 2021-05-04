"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateFinalDropPositions = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _tree = require("../../utils/tree");

var _flatTree = require("../../utils/flat-tree");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/*
    Translates a drag&drop movement from an index based position to a relative (parent, index) position
*/
var calculateFinalDropPositions = function calculateFinalDropPositions(tree, flattenedTree, dragState) {
  var source = dragState.source,
      destination = dragState.destination,
      combine = dragState.combine,
      horizontalLevel = dragState.horizontalLevel;
  var sourcePath = (0, _flatTree.getSourcePath)(flattenedTree, source.index);
  var sourcePosition = (0, _tree.getTreePosition)(tree, sourcePath);

  if (combine) {
    return {
      sourcePosition: sourcePosition,
      destinationPosition: {
        parentId: combine.draggableId
      }
    };
  }

  if (!destination) {
    return {
      sourcePosition: sourcePosition,
      destinationPosition: undefined
    };
  }

  var destinationPath = (0, _flatTree.getDestinationPath)(flattenedTree, source.index, destination.index, horizontalLevel);

  var destinationPosition = _objectSpread({}, (0, _tree.getTreePosition)(tree, destinationPath));

  return {
    sourcePosition: sourcePosition,
    destinationPosition: destinationPosition
  };
};

exports.calculateFinalDropPositions = calculateFinalDropPositions;