/**
 * @author yangchunboy
 * @date 2018.07.05
 * 
 */

import fs from 'fs';
import crypto from 'crypto-js';

// 生成域名后面带的参数
export const generateParams = (params) => {
	let str = '';
	for (let key in params) {
		str = `${str}&${key}=${params[key]}`;
	}
	str = str.substr(1, str.length);
	return str;
};

// 生成签名
export const generateSign = ({ paramStr, privatekeyPath }) => {
    const signString = paramStr.split('&').sort().join('&');
    const sign =  crypto.createSign('RSA-SHA256');
    sign.update(signString, 'utf8');
    const aliPrivateKey = fs.readFileSync(privatekeyPath).toString();
    const base64Sign = sign.sign(aliPrivateKey, 'base64');
    const signDataStr = `${paramStr}&sign=${base64Sign}`;
    return signDataStr;
};

// 将字符串编码
const encodeValue = (signStr) => {
    let temSign = '';
    signStr.split('&').forEach((item, index) => {
        const arr = item.split('=');
        let symbol = '&';
        if (index === 0) symbol = '';
        temSign = `${temSign}${symbol}${arr[0]}=${encodeURIComponent(arr[1])}`;
        if (arr.length > 2) {
            arr.splice(0, 2);
            temSign = `${temSign}${encodeURIComponent('=')}${arr.join(encodeURIComponent('='))}`;
        }
    });
    return temSign;
};

