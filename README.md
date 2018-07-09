# chuck-alipay
目前实现了支付宝电脑网页支付和手机端网页支付

# 安装
npm的安装方式

    npm install chuck-alipay
# 使用方法
 [手机网站支付参数参考链接](https://docs.open.alipay.com/203/107090/)
 
 [电脑网站支付参数参考链接](https://docs.open.alipay.com/270/alipay.trade.page.pay)

 [调用支付宝APP支付参数参考链接](https://docs.open.alipay.com/204/105465/)

    import Alipay from 'chuck-alipay';

    const data = {
        app_id: 'xxx', // 支付宝分配给开发者的应用ID
        return_url: , // 同步返回地址(app支付不需要该参数)
        notify_url,  // 支付宝服务器主动通知商户服务器里指定的页面http/https路径
        privatekeyPath, // 支付宝privatekey.txt文件在服务器上的路径
    };

    const alipay = new Alipay(data);
    const orderData = {
        subject: '测试',
        out_trade_no: 'DD12345678'，
        total_amount: 0.01,        
    };
    const url = alipay.pay(orderData, 'mobile') // 手机网站支付第二个参数传mobile
    const url = alipay.pay(orderData, 'pc') // 电脑网站支付第二个参数传pc
    const signString = alipay.appPay(orderData); // 一个签名的字符串用于调用APP支付
网站支付将拿到的这个url返回给浏览器执行location.assign(url)，APP支付拿到了签名的string后调用[cordova的支付宝支付](https://www.npmjs.com/package/cordova-plugin-alipay-v2)

