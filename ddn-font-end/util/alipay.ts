import Alipay from '@uiw/react-native-alipay';

// 正式环境
// Alipay.setAlipayScheme(scheme);

// 沙箱环境（仅限安卓端）
// Alipay.setAlipaySandbox(isSandbox);

async function aliPay() {
    // 支付宝端支付
    // payInfo 是后台拼接好的支付参数
    // return_url=
    const payInfo = 'alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_id=2021001172656340&biz_content=%7B%22out_trade_no%22%3A%221111112222222%22%2C%22total_amount%22%3A%220.01%22%2C%22subject%22%3A%221234%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%7D&charset=UTF-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fane.boshu.ltd%2Fowner%2Fpay%2Fapi%2FownerPay%2Fcallback&sign=oUQmGtkv8mrhJ0YwHl9%2FfxMcoLACWuSFKiMTC4Id8nc%2FZVvDQ6MLQq5hhtEN03Qn1%2BAtzTAaofE8nNixdroxOek2l5YtOAcYcXVYlJIyogN%2B22erN2NpDTWJ7tQTKgYFDJLRiG0DZJaxfADhUUF6UR9kdA8omoXKLDlP17ZPUs5Jr4aKv5HJtH5C53ui7PbmyWYg934L4UDC2F%2F9pPQlRwwDeE1SAaV3HW9Dt83kK52o8%2FlChXdotbFdAvH0d4qYGhpEYU5sepj9xiOMyL9aC4pMXW9INYLLGbvtqtlRchZTAfH5yji6nqqQm9KKMmcVrWdBDLyjFVNpejq1UjbJBw%3D%3D&sign_type=RSA2&timestamp=2020-07-09+12%3A16%3A16&version=1.0';
    const resule = await Alipay.alipay(payInfo);
    console.log('alipay:resule-->>>', resule);
  }