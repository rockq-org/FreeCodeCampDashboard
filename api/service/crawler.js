var Crawler = require('crawler');
var Q = require('q');
var _ = require('lodash');
// var minimatch = require('minimatch');
// var url = require('url');

// function _processLink(index, a, $) {
//     if (typeof $(a).attr('href') == 'string') {
//         var href = $(a).attr('href');
//         if (minimatch(href, '/article/Friends/*')) {
//             var pathname = url.parse(href).pathname;
//             if (!urls[pathname]) {
//                 // console.log(pathname);
//                 urls[pathname] = $(a).text();
//             }
//         }
//     }
// }

var _c = new Crawler({
    maxConnections: 10,
    forceUTF8: true
    // This will be called for each crawled page
    // callback: function(error, result, $) {
    //         // $ is Cheerio by default
    //         //a lean implementation of core jQuery designed specifically for the server
    //         // $('img').each(function(index, a) {
    //         //     var toQueueUrl = $(a).attr('src');
    //         //     console.log("get ..." + toQueueUrl);
    //         //     // c.queue(toQueueUrl);
    //         // });
    //         $('a').each(function(index, a) {
    //             _processLink(index, a, $);
    //         });
    //         console.log(JSON.stringify(urls));
    //     }
    // ,
    // There is no more queued requests
    // onDrain: function() {
    //     process.exit();
    // }
});

// c.queue({
//     uri: 'http://bbs.byr.cn/board/Friends',
//     headers: {
//         'X-Requested-With': 'XMLHttpRequest'
//     }
// });
exports.queue = function(request) {
    var deferred = Q.defer();
    _c.queue(_.assign(request, {
        callback: function(error, result, $) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve({
                    result: result,
                    $: $
                });
            }
        }
    }));
    return deferred.promise;
}
