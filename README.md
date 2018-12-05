# chuck-alipay
目前实现了支付宝电脑网页支付和手机端网页支付

## 安装
npm的安装方式

    npm install chuck-alipay
## 支付宝支付使用方法
 [手机网站支付参数参考链接](https://docs.open.alipay.com/203/107090/)
 
 [电脑网站支付参数参考链接](https://docs.open.alipay.com/270/alipay.trade.page.pay)

 [调用支付宝APP支付参数参考链接](https://docs.open.alipay.com/204/105465/)

    import Alipay from 'chuck-alipay';

    const param = {
        app_id: 'xxx', // 支付宝分配给开发者的应用ID
        return_url: , // 同步返回地址(app支付不需要该参数)
        notify_url,  // 支付宝服务器主动通知商户服务器里指定的页面http/https路径
        privatekeyPath, // 支付宝privatekey.txt文件在服务器上的路径
    };

    const alipay = new Alipay(param);
    const biz_content = {
        subject: '测试',
        out_trade_no: 'DD12345678',
        total_amount: 0.01,        
    };
    const url = alipay.pay(biz_content, 'mobile') // 手机网站支付第二个参数传mobile
    const url = alipay.pay(biz_content, 'pc') // 电脑网站支付第二个参数传pc
    const signString = alipay.appPay(biz_content); // 一个签名的字符串用于调用APP支付
网站支付将拿到的这个url返回给浏览器执行location.assign(url)，APP支付拿到了签名的string后调用[cordova的支付宝支付](https://www.npmjs.com/package/cordova-plugin-alipay-v2)

## 支付宝退款
[支付宝退款参数参考链接](https://docs.open.alipay.com/api_1/alipay.trade.refund)

    import Alipay from 'chuck-alipay';

    const param = {
        app_id: 'xxx', // 支付宝分配给开发者的应用ID
        privatekeyPath: 'xxx', // 支付宝privatekey.txt文件在服务器上的路径
    };

    const alipay = new Alipay(param);
    const biz_content = {
        out_trade_no: 'DD12345678',
        trade_no: 'xxxxxxx',
        refund_amount: 0.01,        
    };
    const refundResult = alipay.refund(biz_content);
    refundResult.then((ressult) => {
        console.log(ressult);
    });

执行成功返回的结果是：

    {
        "alipay_trade_refund_response": {
            "code": "10000",
            "msg": "Success",
            "trade_no": "支付宝交易号",
            "out_trade_no": "6823789339978248",
            "buyer_logon_id": "159****5620",
            "fund_change": "Y",
            "refund_fee": 0.01,
            "refund_currency": "USD",
            "gmt_refund_pay": "2014-11-27 15:45:57",
            "refund_detail_item_list": [
                {
                    "fund_channel": "ALIPAYACCOUNT",
                    "bank_code": "CEB",
                    "amount": 10,
                    "real_amount": 11.21,
                    "fund_type": "DEBIT_CARD"
                }
            ],
            "store_name": "望湘园联洋店",
            "buyer_user_id": "2088101117955611",
            "present_refund_buyer_amount": "88.88",
            "present_refund_discount_amount": "88.88",
            "present_refund_mdiscount_amount": "88.88"
        },
        "sign": "ERITJKEIJKJHKKKKKKKHJEREEEEEEEEEEE"
    }

## 支付宝交易查询
[支付宝交易查询参数参考链接](https://docs.open.alipay.com/api_1/alipay.trade.query)

    import Alipay from 'chuck-alipay';

    const param = {
        app_id: 'xxx', // 支付宝分配给开发者的应用ID
        privatekeyPath: 'xxx', // 支付宝privatekey.txt文件在服务器上的路径
    };

    const alipay = new Alipay(param);
    const biz_content = {
        out_trade_no: 'DD12345678', // 订单支付时传入的商户订单号,和支付宝交易号不能同时为空。trade_no,out_trade_no如果同时存在优先取trade_no
        trade_no: 'xxxxxxx', 
    };
    const refundResult = alipay.tradeQuery(biz_content);
    refundResult.then((ressult) => {
        console.log(ressult);
    });

执行成功返回的结果是：

    {
        "alipay_trade_query_response": {
            "code": "10000",
            "msg": "Success",
            "trade_no": "2013112011001004330000121536",
            "out_trade_no": "6823789339978248",
            "buyer_logon_id": "159****5620",
            "trade_status": "TRADE_CLOSED",
            "total_amount": 88.88,
            "trans_currency": "TWD",
            "settle_currency": "USD",
            "settle_amount": 2.96,
            "pay_currency": 1,
            "pay_amount": "8.88",
            "settle_trans_rate": "30.025",
            "trans_pay_rate": "0.264",
            "buyer_pay_amount": 8.88,
            "point_amount": 10,
            "invoice_amount": 12.11,
            "send_pay_date": "2014-11-27 15:45:57",
            "receipt_amount": "15.25",
            "store_id": "NJ_S_001",
            "terminal_id": "NJ_T_001",
            "fund_bill_list": [
                {
                    "fund_channel": "ALIPAYACCOUNT",
                    "amount": 10,
                    "real_amount": 11.21
                }
            ],
            "store_name": "证大五道口店",
            "buyer_user_id": "2088101117955611",
            "charge_amount": "8.88",
            "charge_flags": "bluesea_1",
            "settlement_id": "2018101610032004620239146945",
            "auth_trade_pay_mode": "CREDIT_PREAUTH_PAY",
            "buyer_user_type": "PRIVATE",
            "mdiscount_amount": "88.88",
            "discount_amount": "88.88",
            "buyer_user_name": "菜鸟网络有限公司"
        },
        "sign": "ERITJKEIJKJHKKKKKKKHJEREEEEEEEEEEE"
    }

## 支付宝退款查询
[支付宝退款查询参数参考链接](https://docs.open.alipay.com/api_1/alipay.trade.fastpay.refund.query)

    import Alipay from 'chuck-alipay';

    const param = {
        app_id: 'xxx', // 支付宝分配给开发者的应用ID
        privatekeyPath: 'xxx', // 支付宝privatekey.txt文件在服务器上的路径
    };

    const alipay = new Alipay(param);
    const biz_content = {
        out_trade_no: 'DD12345678', // 支付宝交易号
        trade_no: 'xxxxxxx', //订单支付时传入的商户订单号,和支付宝交易号不能同时为空。 trade_no,out_trade_no如果同时存在优先取trade_no
        out_request_no: 'xxxxxx', // 请求退款接口时，传入的退款请求号，如果在退款请求时未传入，则该值为创建交易时的外部交易号
    };
    const refundResult = alipay.refundQuery(biz_content);
    refundResult.then((ressult) => {
        console.log(ressult);
    });

执行成功返回的结果是：

    {
        "alipay_trade_fastpay_refund_query_response": {
            "code": "10000",
            "msg": "Success",
            "trade_no": "2014112611001004680073956707",
            "out_trade_no": "20150320010101001",
            "out_request_no": "20150320010101001",
            "refund_reason": "用户退款请求",
            "total_amount": 100.2,
            "refund_amount": 12.33,
            "refund_royaltys": [
                {
                    "refund_amount": 10,
                    "royalty_type": "transfer",
                    "result_code": "SUCCESS",
                    "trans_out": "2088102210397302",
                    "trans_out_email": "alipay-test03@alipay.com",
                    "trans_in": "2088102210397302",
                    "trans_in_email": "zen_gwen@hotmail.com"
                }
            ],
            "gmt_refund_pay": "2014-11-27 15:45:57",
            "refund_detail_item_list": [
                {
                    "fund_channel": "ALIPAYACCOUNT",
                    "amount": 10,
                    "real_amount": 11.21,
                    "fund_type": "DEBIT_CARD"
                }
            ],
            "send_back_fee": "88",
            "refund_charge_amount": "8.88",
            "refund_settlement_id": "2018101610032004620239146945",
            "present_refund_buyer_amount": "88.88",
            "present_refund_discount_amount": "88.88",
            "present_refund_mdiscount_amount": "88.88"
        },
        "sign": "ERITJKEIJKJHKKKKKKKHJEREEEEEEEEEEE"
    }
