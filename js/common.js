/*接口地址*/
var common_url = 'http://api.kxs.quanmintuike.com/';

var common_img_url = 'http://api.kxs.quanmintuike.com/';



//微洽用户ID
var weiqia_userId = '1006426775497998336';

/*检查更新*/
function checkUpdate() {
    var mam = api.require('mam');
    mam.checkUpdate(function(ret, err) {
        if (ret) {
            var result = ret.result;
            if (result.update == true && result.closed == false) {
                var str = '新版本型号:' + result.version + ';更新提示语:' + result.updateTip + ';下载地址:' + result.source + ';发布时间:' + result.time;
                api.confirm({
                    title: '有新的版本,是否下载并安装 ',
                    msg: str,
                    buttons: ['确定', '取消']
                }, function(ret, err) {
                    if (ret.buttonIndex == 1) {
                        if (api.systemType == "android") {
                            api.download({
                                url: result.source,
                                report: true
                            }, function(ret, err) {
                                if (ret && 0 == ret.state) { /* 下载进度 */
                                    api.toast({
                                        msg: "正在下载应用" + ret.percent + "%",
                                        duration: 2000
                                    });
                                }
                                if (ret && 1 == ret.state) { /* 下载完成 */
                                    var savePath = ret.savePath;
                                    api.installApp({
                                        appUri: savePath
                                    });
                                }
                            });
                        }
                        if (api.systemType == "ios") {
                            api.installApp({
                                appUri: result.source
                            });
                        }
                    }
                });
            } else {
                api.alert({
                    msg: "暂无更新"
                });
            }
        } else {
            api.alert({
                msg: err.msg
            });
        }
    });
}

/*文本框聚焦*/
function textFocus(obj) {
    $(obj).focus();
}
/*未开发模块提示*/
function undevelopedPrompt() {
    api.toast({
        msg: '即将开放，敬请期待！',
        duration: 1000,
        location: 'middle'
    });
}
/*打开浏览器*/
function openBrowser(title, url) {
    api.openWin({
        name: 'browser',
        url: '../../html/common/browser.html',
        bounces: false,
        pageParam: {
            title: title, //页面标题
            url: url //页面地址
        }
    });
}

//适配系统状态栏，为传入的DOM元素增加20px的上内边距
function SetstatusBarStyle() {
    var header = $api.byId('aui-header');
    if (api.systemType == "ios") {
        $api.fixIos7Bar(header); //适配iOS7+系统状态栏，为传入的DOM元素增加20px的上内边距
        //设置状态栏样式为白色（适用于深色背景）或黑色（适用于浅色背景），以及设置状态栏背景颜色
        api.setStatusBarStyle({
            style: 'dark'
        });
    } else {
        $api.fixStatusBar(header); //适配iOS7+、Android4.4+系统状态栏，为传入的DOM元素增加适当的上内边距，避免header与状态栏重叠
        if (parseFloat(api.systemVersion) >= 6) {
            api.setStatusBarStyle({
                style: 'dark',
                color: '#ffffff'
            });
        }
        if (parseFloat(api.systemVersion) >= 5 && parseFloat(api.systemVersion) < 6 && api.deviceModel.indexOf('WPOS') != 0) {
            api.setStatusBarStyle({
                style: 'dark',
                color: '#ffffff'
            });
        }
    }
}
//适配系统状态栏，为传入的DOM元素增加20px的上内边距
function SetstatusBarStyle_dark() {
    var header = $api.byId('aui-header');
    if (api.systemType == "ios") {
        $api.fixIos7Bar(header); //适配iOS7+系统状态栏，为传入的DOM元素增加20px的上内边距
        //设置状态栏样式为白色（适用于深色背景）或黑色（适用于浅色背景），以及设置状态栏背景颜色
        api.setStatusBarStyle({
            style: 'dark'
        });
    } else {
        $api.fixStatusBar(header); //适配iOS7+、Android4.4+系统状态栏，为传入的DOM元素增加适当的上内边距，避免header与状态栏重叠
        if (parseFloat(api.systemVersion) >= 6) {
            api.setStatusBarStyle({
                style: 'dark',
                color: '#ffffff'
            });
        }
        if (parseFloat(api.systemVersion) >= 5 && parseFloat(api.systemVersion) < 6 && api.deviceModel.indexOf('WPOS') != 0) {
            api.setStatusBarStyle({
                style: 'dark',
                color: '#ffffff'
            });
        }
        api.setStatusBarStyle({
            style: 'dark',
            color: '#ffffff'
        });
    }
}

//异步调用接口
function ajaxRequest(url, method, bodyParam, callBack) {
    var appId = 'A6088807697750';
    var key = '2A50CC3C-04FC-E904-DFE0-40D241A9D483'; //?
    var now = getNowFormatDate(); //当前时间为yyyy-mm-dd形式
    var appKey = SHA1(appId + "UZ" + key + "UZ" + now) + "." + now;
    var param = {
        param: bodyParam
    };
    api.ajax({
        url: common_url + url,
        method: method,
        headers: {
            "x-siti-appid": appId,
            "x-siti-appkey": appKey
        },
        data: {
            values: param
        }
    }, function(ret, err) {
        callBack(ret, err);
    });
}

function ajaxUploadFileRequest(url, method, valuesParam, filesParam, callBack) {
    var appId = 'A6088807697750';
    var key = '2A50CC3C-04FC-E904-DFE0-40D241A9D483';
    var now = getNowFormatDate(); //当前时间为yyyy-mm-dd形式
    var appKey = SHA1(appId + "UZ" + key + "UZ" + now) + "." + now;
    var param = {
        param: valuesParam
    };

    api.ajax({
        url: common_url + url,
        method: method,
        headers: {
            "x-siti-appid": appId,
            "x-siti-appkey": appKey
        },
        data: {
            values: param,
            files: filesParam
        }
    }, function(ret, err) {
        callBack(ret, err);
    });
}


function getNowFormatDate() {
    var day = new Date();
    var Year = 0;
    var Month = 0;
    var Day = 0;
    var CurrentDate = "";
    //初始化时间
    //Year= day.getYear();//有火狐下2008年显示108的bug
    Year = day.getFullYear(); //ie火狐下都可以
    Month = day.getMonth() + 1;
    Day = day.getDate();
    CurrentDate += Year + "-";
    if (Month >= 10) {
        CurrentDate += Month + "-";
    } else {
        CurrentDate += "0" + Month + "-";
    }
    if (Day >= 10) {
        CurrentDate += Day;
    } else {
        CurrentDate += "0" + Day;
    }
    return CurrentDate;
}

function getNowFormatTime() {
    var date = new Date(); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '/';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y + M + D + h + m + s;
}

function SHA1(msg) {

    function rotate_left(n, s) {
        var t4 = (n << s) | (n >>> (32 - s));
        return t4;
    };

    function lsb_hex(val) {
        var str = "";
        var i;
        var vh;
        var vl;

        for (i = 0; i <= 6; i += 2) {
            vh = (val >>> (i * 4 + 4)) & 0x0f;
            vl = (val >>> (i * 4)) & 0x0f;
            str += vh.toString(16) + vl.toString(16);
        }
        return str;
    };

    function cvt_hex(val) {
        var str = "";
        var i;
        var v;

        for (i = 7; i >= 0; i--) {
            v = (val >>> (i * 4)) & 0x0f;
            str += v.toString(16);
        }
        return str;
    };


    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;

    msg = Utf8Encode(msg);

    var msg_len = msg.length;

    var word_array = new Array();
    for (i = 0; i < msg_len - 3; i += 4) {
        j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
            msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
        word_array.push(j);
    }

    switch (msg_len % 4) {
        case 0:
            i = 0x080000000;
            break;
        case 1:
            i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
            break;

        case 2:
            i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
            break;

        case 3:
            i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
            break;
    }

    word_array.push(i);

    while ((word_array.length % 16) != 14) word_array.push(0);

    word_array.push(msg_len >>> 29);
    word_array.push((msg_len << 3) & 0x0ffffffff);


    for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {

        for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
        for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;

        for (i = 0; i <= 19; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 20; i <= 39; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 40; i <= 59; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 60; i <= 79; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;

    }

    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

    return temp.toLowerCase();

}


/**
 *  获取银行卡色值
 */
function getBankCardColorValue(bankType) {
    var coloc;
    switch (bankType) {
        case "CMB": //招商银行
            coloc = "#c4132d";
            break;
        case "ICBC": //中国工商银行
            coloc = "#df2519";
            break;
        case "CCB": //中国建设银行
            coloc = "#0f3e96";
            break;
        case "BOC": //中国银行
            coloc = "#c1272d";
            break;
        case "ABC": //中国农业银行
            coloc = "#018a6e";
            break;
        case "BCM": //交通银行
            coloc = "#003267";
            break;
        case "SPDB": //浦发银行
            coloc = "#013570";
            break;
        case "CGB": //广东发展银行
            coloc = "#a6041b";
            break;
        case "CTIB": //中信银行
            coloc = "#e10624";
            break;
        case "CEB": //中国光大银行
            coloc = "#6e1593";
            break;
        case "CIB": //兴业银行
            coloc = "#183382";
            break;
        case "CMBC": //中国民生银行
            coloc = "#025fc7";
            break;
        case "HXB": //华夏银行
            coloc = "#c1272d";
            break;
        case "PAB": //平安银行
            coloc = "#f37221";
            break;
        case "PSBC": //中国邮政储蓄银行
            coloc = "#00552b";
            break;
        case "CBHB": //渤海银行
            coloc = "#291670";
            break;
        case "HKBEA": //东亚银行
            coloc = "#d90e2c";
            break;
        case "NCBC": //宁波银行
            coloc = "#f49539";
            break;
        case "HSB": //徽商银行
            coloc = "#da251e";
            break;
        case "FDB": //富滇银行
            coloc = "#88020d";
            break;
        case "BOG": //广州银行
            coloc = "#b70005";
            break;
        case "SRCB": //上海农商银行
            coloc = "#0d2481";
            break;
        case "BOS": //上海银行
            coloc = "#34377c";
            break;
        case "DLCB": //大连银行
            coloc = "#d21719";
            break;
        case "DGCB": //东莞银行
            coloc = "#b52821";
            break;
        case "BHB": //河北银行
            coloc = "#024770";
            break;
        case "JSBK": //江苏银行
            coloc = "#035094";
            break;
        case "YCCB": //宁夏银行
            coloc = "#c50116";
            break;
        case "QLB": //齐鲁银行
            coloc = "#018cdf";
            break;
        case "XMCB": //厦门银行
            coloc = "#005bac";
            break;
        case "BSZ": //苏州银行
            coloc = "#669126";
            break;
        case "WZCB": //温州市商业银行
            coloc = "#f29619";
            break;
        case "NJCB": //南京银行
            coloc = "#e6020e";
            break;
        case "HZCB": //杭州银行
            coloc = "#007cc2";
            break;
    }
    return coloc;
}
