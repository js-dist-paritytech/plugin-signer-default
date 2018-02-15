'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};exports.default =

















Request;var _react = require('react');var _react2 = _interopRequireDefault(_react);var _Request = require('@parity/ui/lib/Signer/Request');var _Request2 = _interopRequireDefault(_Request);var _ConfirmViaKey = require('./ConfirmViaKey');var _ConfirmViaKey2 = _interopRequireDefault(_ConfirmViaKey);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectWithoutProperties(obj, keys) {var target = {};for (var i in obj) {if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];}return target;} // Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.
// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
function Request(_ref) {var props = _objectWithoutProperties(_ref, []);return _react2.default.createElement(_Request2.default, _extends({ confirmElement: _ConfirmViaKey2.default }, props));}