'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _config = require('./config');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _requestPromiseNative = require('request-promise-native');

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

var _utility = require('./utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author yangchunboy
 * @date 2018.07.05
 * 
 */

var Alipay = function () {
	function Alipay(_ref) {
		var return_url = _ref.return_url,
		    notify_url = _ref.notify_url,
		    app_id = _ref.app_id,
		    privatekeyPath = _ref.privatekeyPath;
		(0, _classCallCheck3.default)(this, Alipay);

		this.return_url = return_url;
		this.notify_url = notify_url;
		this.app_id = app_id;
		this.privatekeyPath = privatekeyPath;
	}

	(0, _createClass3.default)(Alipay, [{
		key: 'pay',


		// 网站支付
		value: function pay(param, channel) {
			var _chooseChanel = (0, _utility.chooseChanel)(channel),
			    method = _chooseChanel.method,
			    product_code = _chooseChanel.product_code;

			var biz_content = (0, _stringify2.default)((0, _assign2.default)(param, { product_code: product_code }));
			var data = {
				app_id: this.app_id,
				method: method,
				charset: 'utf-8',
				sign_type: 'RSA2',
				timestamp: (0, _moment2.default)().format('YYYY-MM-DD HH:mm:ss'),
				version: '1.0',
				notify_url: this.notify_url,
				return_url: this.return_url,
				biz_content: biz_content
			};
			var paramStr = (0, _utility.generateParams)(data);
			var signStr = (0, _utility.generateSign)({ paramStr: paramStr, privatekeyPath: this.privatekeyPath });
			var encodeStr = (0, _utility.encodeValue)(signStr);
			return '' + _config.alipayUrl + encodeStr;
		}

		// app支付

	}, {
		key: 'appPay',
		value: function appPay(param) {
			var biz_content = (0, _stringify2.default)((0, _assign2.default)(param, { product_code: 'QUICK_MSECURITY_PAY' }));
			var data = {
				app_id: this.app_id,
				method: 'alipay.trade.app.pay',
				charset: 'utf-8',
				sign_type: 'RSA2',
				timestamp: (0, _moment2.default)().format('YYYY-MM-DD HH:mm:ss'),
				version: '1.0',
				notify_url: this.notify_url,
				biz_content: biz_content
			};
			var paramStr = (0, _utility.generateParams)(data);
			var signStr = (0, _utility.generateSign)({ paramStr: paramStr, privatekeyPath: this.privatekeyPath });
			var encodeStr = (0, _utility.encodeValue)(signStr);
			return encodeStr;
		}

		// 退款接口

	}, {
		key: 'refund',
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(param) {
				var biz_content, data, paramStr, signStr, encodeStr, refundResult;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								biz_content = (0, _stringify2.default)((0, _assign2.default)(param));
								data = {
									app_id: this.app_id,
									method: 'alipay.trade.refund',
									format: 'JSON',
									charset: 'utf-8',
									sign_type: 'RSA2',
									timestamp: (0, _moment2.default)().format('YYYY-MM-DD HH:mm:ss'),
									version: '1.0',
									biz_content: biz_content
								};
								paramStr = (0, _utility.generateParams)(data);
								signStr = (0, _utility.generateSign)({ paramStr: paramStr, privatekeyPath: this.privatekeyPath });
								encodeStr = (0, _utility.encodeValue)(signStr);
								_context.next = 7;
								return (0, _requestPromiseNative2.default)({
									method: 'get',
									uri: '' + _config.alipayUrl + encodeStr
								});

							case 7:
								refundResult = _context.sent;
								return _context.abrupt('return', refundResult);

							case 9:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function refund(_x) {
				return _ref2.apply(this, arguments);
			}

			return refund;
		}()

		// 支付结果查询

	}, {
		key: 'tradeQuery',
		value: function () {
			var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(param) {
				var biz_content, data, paramStr, signStr, encodeStr, queryResult;
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								biz_content = (0, _stringify2.default)((0, _assign2.default)(param));
								data = {
									app_id: this.app_id,
									method: 'alipay.trade.query',
									format: 'JSON',
									charset: 'utf-8',
									sign_type: 'RSA2',
									timestamp: (0, _moment2.default)().format('YYYY-MM-DD HH:mm:ss'),
									version: '1.0',
									biz_content: biz_content
								};
								paramStr = (0, _utility.generateParams)(data);
								signStr = (0, _utility.generateSign)({ paramStr: paramStr, privatekeyPath: this.privatekeyPath });
								encodeStr = (0, _utility.encodeValue)(signStr);
								_context2.next = 7;
								return (0, _requestPromiseNative2.default)({
									method: 'get',
									uri: '' + _config.alipayUrl + encodeStr
								});

							case 7:
								queryResult = _context2.sent;
								return _context2.abrupt('return', queryResult);

							case 9:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function tradeQuery(_x2) {
				return _ref3.apply(this, arguments);
			}

			return tradeQuery;
		}()

		// 退款结果查询

	}, {
		key: 'refundQuery',
		value: function () {
			var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(param) {
				var biz_content, data, paramStr, signStr, encodeStr, queryResult;
				return _regenerator2.default.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								biz_content = (0, _stringify2.default)((0, _assign2.default)(param));
								data = {
									app_id: this.app_id,
									method: 'alipay.trade.fastpay.refund.query',
									format: 'JSON',
									charset: 'utf-8',
									sign_type: 'RSA2',
									timestamp: (0, _moment2.default)().format('YYYY-MM-DD HH:mm:ss'),
									version: '1.0',
									biz_content: biz_content
								};
								paramStr = (0, _utility.generateParams)(data);
								signStr = (0, _utility.generateSign)({ paramStr: paramStr, privatekeyPath: this.privatekeyPath });
								encodeStr = (0, _utility.encodeValue)(signStr);
								_context3.next = 7;
								return (0, _requestPromiseNative2.default)({
									method: 'get',
									uri: '' + _config.alipayUrl + encodeStr
								});

							case 7:
								queryResult = _context3.sent;
								return _context3.abrupt('return', queryResult);

							case 9:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function refundQuery(_x3) {
				return _ref4.apply(this, arguments);
			}

			return refundQuery;
		}()
	}]);
	return Alipay;
}();

;

exports.default = Alipay;