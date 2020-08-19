/**
 * @author yangchunboy
 * @date 2018.07.05
 * 
 */

import { alipayUrl } from './config';
import moment from 'moment';
import request from 'request-promise-native';
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
	appPay(param) {
		const biz_content = JSON.stringify(Object.assign(param, { product_code: 'QUICK_MSECURITY_PAY' }));
		const data = {
			app_id: this.app_id,
			method: 'alipay.trade.app.pay',
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

	// 退款接口
	async refund(param) {
		const biz_content = JSON.stringify(Object.assign(param));
		const data = {
			app_id: this.app_id,
			method: 'alipay.trade.refund',
			format: 'JSON',
			charset: 'utf-8',
			sign_type: 'RSA2',
			timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
			version: '1.0',
			biz_content,
		};
		const paramStr = generateParams(data);
		const signStr = generateSign({ paramStr, privatekeyPath: this.privatekeyPath });
		const encodeStr = encodeValue(signStr);
		const refundResult = await request({
			method: 'get',
			uri: `${alipayUrl}${encodeStr}`,
		});
		return refundResult;
	}

	// 支付结果查询
	async tradeQuery(param) {
		const biz_content = JSON.stringify(Object.assign(param)); 
		const data = {
			app_id: this.app_id,
			method: 'alipay.trade.query',
			format: 'JSON',
			charset: 'utf-8',
			sign_type: 'RSA2',
			timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
			version: '1.0',
			biz_content,
		};
		const paramStr = generateParams(data);
		const signStr = generateSign({ paramStr, privatekeyPath: this.privatekeyPath });
		const encodeStr = encodeValue(signStr);
		const queryResult = await request({
			method: 'get',
			uri: `${alipayUrl}${encodeStr}`,
		});
		return queryResult;
	}

	// 退款结果查询
	async refundQuery(param) {
		const biz_content = JSON.stringify(Object.assign(param)); 
		const data = {
			app_id: this.app_id,
			method: 'alipay.trade.fastpay.refund.query',
			format: 'JSON',
			charset: 'utf-8',
			sign_type: 'RSA2',
			timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
			version: '1.0',
			biz_content,
		};
		const paramStr = generateParams(data);
		const signStr = generateSign({ paramStr, privatekeyPath: this.privatekeyPath });
		const encodeStr = encodeValue(signStr);
		const queryResult = await request({
			method: 'get',
			uri: `${alipayUrl}${encodeStr}`,
		});
		return queryResult;
  }
  
  // 单笔现金转账
  async singleTranser(param) {
    try{
      const biz_content = JSON.stringify(Object.assign(param));
      const data = {
        app_id: this.app_id,
        method: 'alipay.fund.trans.uni.transfer',
        format: 'JSON',
        charset: 'utf-8',
        sign_type: 'RSA2',
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        version: '1.0',
        biz_content,
      };
      const paramStr = generateParams(data);
      const signStr = generateSign({ paramStr, privatekeyPath: this.privatekeyPath });
      const encodeStr = encodeValue(signStr);
      const result = await request({
        method: 'get',
        uri: `${alipayUrl}${encodeStr}`,
      });
      return result;

    }catch(error) {
      return error;
    }
  }

};

export default Alipay;
