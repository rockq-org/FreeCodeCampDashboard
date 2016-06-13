'use strict';

/**
 * Expose
 */

module.exports = {
    port: 6999,
    db: 'mongodb://localhost/noobjs_dev',
    github: {
        clientID: process.env.GITHUB_CLIENTID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    fccusers: ['samurais',
        'cuifan'
    ]
};
