/**
 * Freecodecamp users
 */

var config = require('../../config');
var async = require('co').wrap;
var fccuserService = require('../services/fccuser.service.js');
var log = require('../utils/loggerUtil').getLogger('controllers/fccusers');

/**
 * List
 */
exports.index = async(function*(req, res) {
    const page = (req.query.page > 0 ? req.query.page : 1) - 1;
    const limit = 30;
    const options = {
        limit: limit,
        page: page
    };

    // const articles = yield Article.list(options);
    const users = yield fccuserService.getRank(config.fccusers);
    log.debug('index', users);
    const count = users.length;

    res.render('fccusers/index', {
        title: 'Users',
        users: users,
        page: page + 1,
        pages: Math.ceil(count / limit)
    });
});
