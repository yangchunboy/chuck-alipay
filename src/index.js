/**
 * @author yangchunboy
 * @date 2018.07.05
 * 
 */

import { alipayUrl } from './config';
import moment from 'moment';
import { generateParams, generateSign, encodeValue } from './utility';

class Alipay {
	constructor({ return_url, notify_url, app_id, privatekeyPath }) {
		this.return_url = return_url;
		this.notify_url = notify_url;
		this.app_id = app_id;
		this.privatekeyPath = privatekeyPath;
	};

	// 手机网站支付
	mobileWebPay(param) {
		const { subject, out_trade_no, total_amount } = param;
		const data = {
			app_id: this.app_id,
			method: 'alipay.trade.wap.pay',
			charset: 'utf-8',
			sign_type: 'RSA2',
			timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
			version: '1.0',
			notify_url: this.notify_url,
			return_url: this.return_url,
			biz_content: JSON.stringify({
				subject,
				out_trade_no,
				total_amount,
				product_code: 'QUICK_WAP_WAY',
			}),
		};
		const paramStr = generateParams(data);
		const signStr = generateSign({ paramStr, privatekeyPath: this.privatekeyPath });
		const encodeStr = encodeValue(signStr);
		return `${alipayUrl}${encodeStr}`;
	}

};

export default Alipay;
