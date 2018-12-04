'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.chooseChanel = exports.encodeValue = exports.generateSign = exports.generateParams = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 生成域名后面带的参数
/**
 * @author yangchunboy
 * @date 2018.07.05
 * 
 */

var generateParams = exports.generateParams = function generateParams(params) {
    var str = '';
    for (var key in params) {
        str = str + '&' + key + '=' + params[key];
    }
    str = str.substr(1, str.length);
    return str;
};

// 生成签名
var generateSign = exports.generateSign = function generateSign(_ref) {
    var paramStr = _ref.paramStr,
        privatekeyPath = _ref.privatekeyPath;

    var signString = paramStr.split('&').sort().join('&');
    var sign = _crypto2.default.createSign('RSA-SHA256');
    sign.update(signString, 'utf8');
    var aliPrivateKey = _fs2.default.readFileSync(privatekeyPath).toString();
    var base64Sign = sign.sign(aliPrivateKey, 'base64');
    var signDataStr = paramStr + '&sign=' + base64Sign;
    return signDataStr;
};

// 将字符串编码
var encodeValue = exports.encodeValue = function encodeValue(signStr) {
    var temSign = '';
    signStr.split('&').forEach(function (item, index) {
        var arr = item.split('=');
        var symbol = '&';
        if (index === 0) symbol = '';
        temSign = '' + temSign + symbol + arr[0] + '=' + encodeURIComponent(arr[1]);
        if (arr.length > 2) {
            arr.splice(0, 2);
            temSign = '' + temSign + encodeURIComponent('=') + arr.join(encodeURIComponent('='));
        }
    });
    return temSign;
};

// 用去区分判断手机网站支付和电脑网站支付
var chooseChanel = exports.chooseChanel = function chooseChanel(channel) {
    var params = {
        method: 'alipay.trade.page.pay',
        product_code: 'FAST_INSTANT_TRADE_PAY'
    };

    switch (channel) {
        case 'pc':
            return params;
        case 'mobile':
            return (0, _assign2.default)({
                method: 'alipay.trade.wap.pay',
                product_code: 'QUICK_WAP_WAY'
            });
        default:
            return params;
    };
};