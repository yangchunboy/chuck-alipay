'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateSign = exports.generateParams = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _cryptoJs = require('crypto-js');

var _cryptoJs2 = _interopRequireDefault(_cryptoJs);

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
    var sign = _cryptoJs2.default.createSign('RSA-SHA256');
    sign.update(signString, 'utf8');
    var aliPrivateKey = _fs2.default.readFileSync(privatekeyPath).toString();
    var base64Sign = sign.sign(aliPrivateKey, 'base64');
    var signDataStr = paramStr + '&sign=' + base64Sign;
    return signDataStr;
};

// 将字符串编码
var encodeValue = function encodeValue(signStr) {
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