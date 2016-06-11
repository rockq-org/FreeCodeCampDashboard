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
            .then(function(profile) {
                // { github: 'samurais',
                // avatar: 'https://avatars.githubusercontent.com/u/3538629?v=3',
                // name: 'Hain',
                // location: 'Beijing,China',
                // progress: '[ 10 ]' }
                done();
            })
            .fail(function(err) {
                done(err)
            });
    });
});
