/**
 * Taskq
 */

var CronJob = require('cron').CronJob;
var store = require('./store');
var config = require('../../config');
var slave = null;
var fccuserService = require('./fccuser.service.js');
var log = require('../utils/loggerUtil').getLogger('services/taskq');

function _construct() {
    log.info('_construct', 'exec...');
    fccuserService.getRank(config.fccusers)
        .then(function(results) {
            store.set('ranking', results);
        });
}

// start
function _start() {
    // init 
    store.set('ranking', []);
    _construct();
    // start slave
    slave = new CronJob({
        cronTime: config.cron,
        onTick: function() {
            var self = this;
            _construct()
        },
        onComplete: null,
        start: true,
        timeZone: 'Asia/Shanghai',
        context: {}
    });
}

// stop 
function _stop() {
    if (slave)
        slave.stop();
}

exports.construct = _construct;
exports.start = _start;
exports.stop = _stop;
