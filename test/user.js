var assert = require('chai').assert;
var request = require('superagent');
var user = require('../service/user.js');


describe('Freecodecamp', function() {
    it('should return user profile data', function(done) {
        this.timeout(10000);
        user.getProfile('samurais')
        .then(function(result){
            done();
        }, function(err){
            done(err)
        });
    });
});
