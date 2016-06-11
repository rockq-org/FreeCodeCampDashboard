var assert = require('chai').assert;
var request = require('superagent');
var user = require('../service/user.js');
var log = require('../utils/loggerUtil').getLogger('test/user');
var Q = require('q');

describe('Freecodecamp', function() {
    it('should return user profile data', function(done) {
        this.timeout(20000);
        var githubId = 'samurais';
        user.getProfile(githubId)
            .then(function(response) {
                var result = response.result,
                    $ = response.$,
                    profile = { github: githubId },
                    d = Q.defer();

                $('img.public-profile-img').each(function(index, i) {
                    profile.avatar = i.attribs.src;
                    d.resolve({
                        $: $,
                        profile: profile
                    });
                });
                return d.promise;
            })
            .then(function(resource) {
                var $ = resource.$;
                var profile = resource.profile;
                $('h1.flat-top.wrappable').each(function(index, i) {
                    // console.log('sss#', index, i);
                    switch (index) {
                        case 0:
                            console.log('##0', i.children[0].data);
                            profile.name = i.children[0].data;
                            break;
                        case 1:
                            console.log('##0', i.children[0].data);
                            profile.location = i.children[0].data;
                            break;
                        default:
                            break;
                    }
                    // done();
                });
                $('h1.flat-top.text-primary').each(function(index, i) {
                    if (index == 0)
                        profile.progress = i.children[0].data;
                });

                return {
                    $: $,
                    profile: profile
                }
            })
            .then(function(resource) {
                console.log('resource', resource.profile);
                done();
            })
            .fail(function(err) {
                done(err)
            });
    });
});
