'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utility = require('./utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
		key: 'mobileWebPay',


		// 手机网站支付
		value: function mobileWebPay(param) {
			var subject = param.subject,
			    out_trade_no = param.out_trade_no,
			    total_amount = param.total_amount;

			var data = {
				app_id: this.app_id,
				method: 'alipay.trade.wap.pay',
				charset: 'utf-8',
				sign_type: 'RSA2',
				timestamp: (0, _moment2.default)().format('YYYY-MM-DD HH:mm:ss'),
				version: '1.0',
				notify_url: this.notify_url,
				return_url: this.return_url,
				biz_content: JSON.stringify({
					subject: subject,
					out_trade_no: out_trade_no,
					total_amount: total_amount,
					product_code: 'QUICK_WAP_WAY'
				})
			};
			var paramStr = (0, _utility.generateParams)(data);
			var signStr = (0, _utility.generateSign)({ paramStr: paramStr, privatekeyPath: this.privatekeyPath });
			var encodeStr = (0, _utility.encodeValue)(signStr);
			return '' + _config.alipayUrl + encodeStr;
		}
	}]);

	return Alipay;
}();

;

exports.default = Alipay;