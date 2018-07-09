'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author yangchunboy
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @date 2018.07.05
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _config = require('./config');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _requestPromiseNative = require('request-promise-native');

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

var _utility = require('./utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Alipay = function () {
	function Alipay(_ref) {
		var return_url = _ref.return_url,
		    notify_url = _ref.notify_url,
		    app_id = _ref.app_id,
		    privatekeyPath = _ref.privatekeyPath;

		_classCallCheck(this, Alipay);

		this.return_url = return_url;
		this.notify_url = notify_url;
		this.app_id = app_id;
		this.privatekeyPath = privatekeyPath;
	}

	_createClass(Alipay, [{
		key: 'pay',


		// 网站支付
		value: function pay(param, channel) {
			var _chooseChanel = (0, _utility.chooseChanel)(channel),
			    method = _chooseChanel.method,
			    product_code = _chooseChanel.product_code;

			var biz_content = JSON.stringify(Object.assign(param, { product_code: product_code }));
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
			var biz_content = JSON.stringify(Object.assign(param, { product_code: 'QUICK_MSECURITY_PAY' }));
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
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(param) {
				var biz_content, data, paramStr, signStr, encodeStr, refundResult;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								biz_content = JSON.stringify(Object.assign(param));
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
	}]);

	return Alipay;
}();

;

exports.default = Alipay;