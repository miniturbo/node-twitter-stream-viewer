const CONSUMER_KEY    = 'your consumer key';
const CONSUMER_SECRET = 'your consumer secret';
const COOKIE_NAME     = 'twitter_auth';

var Twitter  = require('twitter');
var instance = {};

exports.getInstance = function(id) {
    instance[id] = instance[id] || new Twitter({
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
        cookie: COOKIE_NAME,
    });
    return instance[id];
};

exports.isAuthorized = function(id, req) {
    var twit = this.getInstance(id);
    var auth = twit.cookie(req);
    return auth && auth.user_id && auth.access_token_secret ? this.restoreToken(id, auth) : false;
};

exports.restoreToken = function(id, auth) {
    var twit = this.getInstance(id);
    if (auth.access_token_key && auth.access_token_secret) {
        twit.options.access_token_key    = auth.access_token_key;
        twit.options.access_token_secret = auth.access_token_secret;
        return true;
    }
    else {
        return false;
    }
};
