/**
 * Freecodecamp users
 */

var config = require('../../config');
var async = require('co').wrap;
var fccuserService = require('../services/fccuser.service.js');
var log = require('../utils/loggerUtil').getLogger('controllers/fccusers');
var store = require('../services/store');

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
    const users = store.get('ranking');
    log.debug('index', users);
    const count = users.length;

    res.render('fccusers/index', {
        title: '紫禁之巅分舵@freecodecamp.com',
        users: users,
        page: page + 1,
        pages: Math.ceil(count / limit)
    });
});
