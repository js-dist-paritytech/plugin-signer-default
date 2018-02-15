'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _class, _class2, _temp2; // Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _Button = require('semantic-ui-react/dist/commonjs/elements/Button');var _Button2 = _interopRequireDefault(_Button);
var _Form = require('semantic-ui-react/dist/commonjs/collections/Form');var _Form2 = _interopRequireDefault(_Form);
var _reactIntl = require('react-intl');
var _IdentityIcon = require('@parity/ui/lib/IdentityIcon');var _IdentityIcon2 = _interopRequireDefault(_IdentityIcon);
var _input = require('@parity/api/lib/format/input');
var _Input = require('@parity/ui/lib/Form/Input');var _Input2 = _interopRequireDefault(_Input);
var _mobxReact = require('mobx-react');
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _signer = require('@parity/shared/lib/util/signer');

var _ConfirmViaKey = require('./ConfirmViaKey.css');var _ConfirmViaKey2 = _interopRequireDefault(_ConfirmViaKey);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var


ConfirmViaKey = (0, _mobxReact.observer)(_class = (_temp2 = _class2 = function (_Component) {_inherits(ConfirmViaKey, _Component);function ConfirmViaKey() {var _ref;var _temp, _this, _ret;_classCallCheck(this, ConfirmViaKey);for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ConfirmViaKey.__proto__ || Object.getPrototypeOf(ConfirmViaKey)).call.apply(_ref, [this].concat(args))), _this), _this.












    state = {
      isSending: false,
      password: '',
      wallet: null,
      error: null }, _this.


    handleChange = function (_ref2) {var value = _ref2.target.value;return (
        _this.setState({
          password: value,
          error: null }));}, _this.


    handleConfirm = function () {var
      api = _this.context.api;var _this$props =
      _this.props,request = _this$props.request,transaction = _this$props.transaction;var _this$state =
      _this.state,wallet = _this$state.wallet,password = _this$state.password;

      _this.setState({ isSending: true });

      // Only support transaction for now
      // TODO should support eth_sign and parity_decryptMessage
      if (!transaction) {
        _this.setState({ error: 'Signing and Decrypting with JSON file is not supported for now.' });
        console.error('Signing and Decrypting with JSON file is not supported for now.');
        return;
      }

      // Create two promises:
      // - one to get signer from wallet+password
      // - one to get nonce
      var signerPromise = _signer.Signer.fromJson(wallet, password);
      var noncePromise =
      !transaction.nonce || transaction.nonce.isZero() ?
      api.parity.nextNonce(transaction.from) :
      Promise.resolve(transaction.nonce);

      return Promise.all([signerPromise, noncePromise]).
      then(function (_ref3) {var _ref4 = _slicedToArray(_ref3, 2),signer = _ref4[0],nonce = _ref4[1];
        var txData = {
          to: (0, _input.inHex)(transaction.to),
          nonce: (0, _input.inHex)(transaction.nonce.isZero() ? nonce : transaction.nonce),
          gasPrice: (0, _input.inHex)(transaction.gasPrice),
          gasLimit: (0, _input.inHex)(transaction.gas),
          value: (0, _input.inHex)(transaction.value),
          data: (0, _input.inHex)(transaction.data) };


        return signer.signTransaction(txData);
      }).
      then(function (rawData) {return api.signer.confirmRequestRaw(request.id, rawData);}).
      then(function () {return _this.setState({ isSending: false });}).
      catch(function (error) {
        _this.setState({ isSending: false, error: error });
      });
    }, _this.

    handleKeySelect = function (event) {
      // Check that file have been selected
      if (event.target.files.length === 0) {
        return _this.setState({
          wallet: null,
          error: null });

      }

      var fileReader = new FileReader();

      fileReader.onload = function (e) {
        try {
          var wallet = JSON.parse(e.target.result);

          try {
            if (wallet && typeof wallet.meta === 'string') {
              wallet.meta = JSON.parse(wallet.meta);
            }
          } catch (e) {}

          _this.setState({
            wallet: wallet,
            error: null });

        } catch (error) {
          _this.setState({
            wallet: null,
            error:
            _react2.default.createElement(_reactIntl.FormattedMessage, {
              id: 'signer.txPendingConfirm.errors.invalidWallet',
              defaultMessage: 'Given wallet file is invalid.' }) });



        }
      };

      fileReader.readAsText(event.target.files[0]);
    }, _temp), _possibleConstructorReturn(_this, _ret);}_createClass(ConfirmViaKey, [{ key: 'render', value: function render()

    {var _props =
      this.props,address = _props.address,isDisabled = _props.isDisabled;var _state =

      this.state,isSending = _state.isSending,wallet = _state.wallet,error = _state.error;
      var isWalletOk = error === null && wallet !== null;

      return (
        _react2.default.createElement('div', { className: _ConfirmViaKey2.default.confirmForm },
          _react2.default.createElement(_Form2.default, null,
            this.renderKeyInput(),
            this.renderPassword(),
            this.renderHint(),
            this.renderError(),
            _react2.default.createElement(_Button2.default, {
              className: _ConfirmViaKey2.default.confirmButton,
              content:
              isSending ?
              _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'signer.txPendingConfirm.buttons.confirmBusy', defaultMessage: 'Confirming...' }) :

              _react2.default.createElement(_reactIntl.FormattedMessage, {
                id: 'signer.txPendingConfirm.buttons.confirmRequest',
                defaultMessage: 'Confirm Request' }),



              disabled: isDisabled || isSending || !isWalletOk,
              fluid: true,
              icon: _react2.default.createElement(_IdentityIcon2.default, { address: address, button: true, className: _ConfirmViaKey2.default.signerIcon }),
              onClick: this.handleConfirm }))));




    } }, { key: 'renderPassword', value: function renderPassword()

    {var _state2 =
      this.state,password = _state2.password,error = _state2.error,wallet = _state2.wallet;

      if (!wallet) {
        return null;
      }

      return (
        _react2.default.createElement(_Input2.default, {
          error: !!error,
          hint: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'signer.txPendingConfirm.password.decrypt.hint', defaultMessage: 'decrypt the key' }),
          label: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'signer.txPendingConfirm.password.decrypt.label', defaultMessage: 'Key Password' }),
          onChange: this.handleChange,
          type: 'password',
          value: password }));


    } }, { key: 'renderError', value: function renderError()

    {var
      error = this.state.error;

      return _react2.default.createElement('div', { className: _ConfirmViaKey2.default.error }, error);
    } }, { key: 'renderHint', value: function renderHint()

    {var
      wallet = this.state.wallet;

      var passwordHint = wallet && wallet.meta && wallet.meta.passwordHint || null;

      if (!passwordHint) {
        return null;
      }

      return (
        _react2.default.createElement('div', { className: _ConfirmViaKey2.default.passwordHint },
          _react2.default.createElement(_reactIntl.FormattedMessage, {
            id: 'signer.txPendingConfirm.passwordHint',
            defaultMessage: '(hint) {passwordHint}',
            values: {
              passwordHint: passwordHint } })));




    } }, { key: 'renderKeyInput', value: function renderKeyInput()

    {var
      isFocused = this.props.isFocused;var
      error = this.state.error;

      return (
        _react2.default.createElement(_Input2.default, {
          className: _ConfirmViaKey2.default.fileInput,
          error: !!error,
          focused: isFocused,
          hint:
          _react2.default.createElement(_reactIntl.FormattedMessage, {
            id: 'signer.txPendingConfirm.selectKey.hint',
            defaultMessage: 'The keyfile to use for this account' }),


          label: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'signer.txPendingConfirm.selectKey.label', defaultMessage: 'Select Local Key' }),
          onChange: this.handleKeySelect,
          type: 'file' }));


    } }]);return ConfirmViaKey;}(_react.Component), _class2.contextTypes = { api: _propTypes2.default.object.isRequired }, _class2.propTypes = { address: _propTypes2.default.string.isRequired, isDisabled: _propTypes2.default.bool, isFocused: _propTypes2.default.bool, request: _propTypes2.default.object.isRequired, transaction: _propTypes2.default.object }, _temp2)) || _class;exports.default =


ConfirmViaKey;