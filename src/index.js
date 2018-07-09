/**
 * @author yangchunboy
 * @date 2018.07.05
 * 
 */

import { alipayUrl } from './config';
import moment from 'moment';
import { generateParams, generateSign, encodeValue, chooseChanel } from './utility';

class Alipay {
	constructor({ return_url, notify_url, app_id, privatekeyPath }) {
		this.return_url = return_url;
		this.notify_url = notify_url;
		this.app_id = app_id;
		this.privatekeyPath = privatekeyPath;
	};

	// 网站支付
	pay(param, channel) {
		const { method, product_code } = chooseChanel(channel);
		const biz_content = JSON.stringify(Object.assign(param, { product_code }));
		const data = {
			app_id: this.app_id,
			method,
			charset: 'utf-8',
			sign_type: 'RSA2',
			timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
			version: '1.0',
			notify_url: this.notify_url,
			return_url: this.return_url,
			biz_content,
		};
		const paramStr = generateParams(data);
		const signStr = generateSign({ paramStr, privatekeyPath: this.privatekeyPath });
		const encodeStr = encodeValue(signStr);
		return `${alipayUrl}${encodeStr}`;
	}

	// app支付
	appPay() {
		const biz_content = JSON.stringify(Object.assign(param, { product_code: 'QUICK_MSECURITY_PAY' }));
		const data = {
			app_id: this.app_id,
			method,
			charset: 'utf-8',
			sign_type: 'RSA2',
			timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
			version: '1.0',
			notify_url: this.notify_url,
			biz_content,
		};
		const paramStr = generateParams(data);
		const signStr = generateSign({ paramStr, privatekeyPath: this.privatekeyPath });
		const encodeStr = encodeValue(signStr);
		return encodeStr;
	}
};

export default Alipay;
