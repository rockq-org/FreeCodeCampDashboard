/**
 * Freecodecamp user service
 */
var crawler = require('./crawler'),
    Q = require('q'),
    util = require('util'),
    _ = require('lodash'),
    log = require('../utils/loggerUtil').getLogger('services/fccusers');

/**
 * get user profile by github id
 * @param  {[type]} githubId [description]
 * @return {[type]}          [description]
 */
function _getProfile(githubId) {
    var deferred = Q.defer();

    crawler.queue({
            uri: util.format('%s%s', 'https://www.freecodecamp.com/', githubId),
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(function(response) {
            var result = response.result,
                $ = response.$,
                profile = { github: githubId };

            log.debug('_getProfile', 'process', githubId);
            // avatar
            $('img.public-profile-img').each(function(index, i) {
                profile.avatar = i.attribs.src;
            });
            // name and location
            $('h1.flat-top.wrappable').each(function(index, i) {
                switch (index) {
                    case 0:
                        profile.name = i.children[0].data;
                        break;
                    case 1:
                        try {
                            profile.location = i.children[0].data;
                        } catch (e) {
                            log.warn('_getProfile', "can not get location.");
                        }
                        break;
                    default:
                        break;
                }
            });
            $('h1.flat-top.text-primary').each(function(index, i) {
                if (index == 0)
                    profile.progress = parseInt(i.children[0].data.slice(2, -2).trim());
            });
            log.debug('githubId', githubId, 'profile', profile);
            if (profile.progress) {
                deferred.resolve(profile);
            } else {
                log.warn('_getProfile', githubId, 'is not a freecodecamp.com user.');
                throw new Error(githubId + ' is not a freecodecamp.com user.');
            }
        })
        .fail(function(err) {
            log.warn('getProfile:err', err);
            deferred.reject(err);
        });

    return deferred.promise;
}

/**
 * [_getRank description]
 * @param  {[type]} githubIds [description]
 * @return {[type]}           [description]
 */
function _getRank(githubIds) {
    var promises = [];
    var deferred = Q.defer();

    _.each(githubIds, function(val, index) {
        promises.push(_getProfile(val));
    });

    Q.allSettled(promises).then(function(results) {
        log.debug('_getRank', results);
        var collection = [];
        results.forEach(function(result) {
            if (result.state === "fulfilled") {
                collection.push(result.value);
            }
        });
        deferred.resolve(_.sortBy(collection, 'progress').reverse());
    }, function(err) {
        log.error('_getRank', err);
        deferred.reject(err);
    });

    return deferred.promise;
}

exports.getProfile = _getProfile;
exports.getRank = _getRank;
