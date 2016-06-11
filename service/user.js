/**
 * user service
 */
var crawler = require('./crawler'),
    Q = require('q'),
    util = require('util'),
    log = require('../utils/loggerUtil').getLogger('service/user');

/**
 * get user profile by github id
 * @param  {[type]} githubId [description]
 * @return {[type]}          [description]
 */
exports.getProfile = function(githubId) {
    var deferred = Q.defer();

    crawler.queue({
            uri: util.format('%s%s', 'https://www.freecodecamp.com/', githubId),
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(function(response) {
            var result = response.result,
                $ = response.$;

            // $('.b-content .a-wrap.corner').each(function(index, b) {
            //     if (index == 0) {
            //         $AuthorEl = $(b).find('div.a-wrap.corner .article .a-u-name');
            //         response.authorName = $AuthorEl.text();
            //         response.authorLink = $AuthorEl.html();
            //     } else {
            //         // commentor
            //         // don't save comment now.
            //     }
            // });
            deferred.resolve(response);
        })
        .fail(function(err) {
            deferred.reject(err);
        });

    return deferred.promise;
}
