# chuck-alipay
目前实现了支付宝电脑网页支付和手机端网页支付

# 安装
npm的安装方式

    npm install chuck-alipay
# 支付宝支付使用方法
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

#支付宝退款
[支付宝退款参数参考链接](https://docs.open.alipay.com/api_1/alipay.trade.refund)

    import Alipay from 'chuck-alipay';

    const param = {
        app_id: 'xxx', // 支付宝分配给开发者的应用ID
    };

    const alipay = new Alipay(param);
    const biz_content = {
        out_trade_no: 'DD12345678',
        trade_no: 'xxxxxxx',
        refund_amount: 0.01,        
    };
    const refundResult = alipay.refund(biz_content);
    console.log(refundResult);

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

