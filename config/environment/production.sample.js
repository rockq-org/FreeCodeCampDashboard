'use strict';

module.exports = {
    api: {
        url: 'http://api.songni.cc'
    },
    mongo: {
        uris: 'mongodb://foo:bar@115.28.145.154:27099/snapipro'
    },
    redis: {
        host: '101.201.208.166',
        port: 6399,
        pass: 'foo'
    },
    // 第三方平台的配置
    wechat: {
        component: {
            appId: 'wx1007c99533665b6b'
        }
    },
    log4jsPath: '/tmp/logs',
    // 微信菜单默认配置
    menu: {
        "wx1007c99533665b6b": { //礼物
            "button": [{
                "type": "view",
                "name": "礼物列表",
                "url": "http://$APPID$.songni.cc"
            }, {
                "type": "view",
                "name": "我送的礼物",
                "url": "http://$APPID$.songni.cc/order/list"
            }]
        }
    },
    domain: {
        serve: "www.songni.cc",
        client: "wx.songni.cc",
        api: "api.songni.cc",
	img: "imgs.songni.cc",
        contact: "010-84988362"
    },
    newrelic: true
};
