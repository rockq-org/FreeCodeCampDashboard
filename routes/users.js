var express = require('express');
var router = express.Router();
var user = require('../service/user');
var config = require('../config/environment');

/* GET users listing. */
router.get('/rank', function(req, res, next) {

    user.getRank(config.githubIds)
        .then(function(data) {
            res.json({
                rc: 2,
                data: data
            });
        })
        .fail(function(err) {
            res.json({
                rc: 1,
                error: err
            });
        });
});

module.exports = router;
