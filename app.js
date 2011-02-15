/**
 * Module dependencies.
 */
var express     = require('express');
var connect     = require('connect');
var io          = require('socket.io');
var util        = require('util');
var Twitter     = require('./lib/twitter');

var app          = module.exports = express.createServer();
var sessionStore = new express.session.MemoryStore();
var socket       = io.listen(app);

// Configuration
app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.bodyDecoder());
    app.use(express.methodOverride());
    app.use(express.cookieDecoder());
    app.use(express.session({ secret: 'secret keyword', store: sessionStore }));
    app.use(app.router);
    app.use(express.staticProvider(__dirname + '/public'));
});

app.configure('development', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function() {
    app.use(express.errorHandler()); 
});

app.dynamicHelpers({
    session: function(req, res){
        return req.session;
    }
});

// Routes
app.get('/', function(req, res) {
    if (!Twitter.isAuthorized(req.session.id, req)) {
        res.render('login');
    }
    else {
        res.render('index', { layout: 'layout_index' });
    }
});

app.all('/auth', function(req, res) {
    if (Twitter.isAuthorized(req.session.id, req)) {
        res.redirect('/');
    }

    var twit   = Twitter.getInstance(req.session.id);
    var handle = twit.login('/auth');
    handle(req, res, function(result) {
        console.log(result);
    });
});

if (!module.parent) {
    app.listen(5000);
    console.log("Express server listening on port %d", app.address().port)
}

socket.on('connection', function(client) {
    var cookie = connect.utils.parseCookie(client.request.headers.cookie);
    if (!cookie['connect.sid']) return;

    sessionStore.get(cookie['connect.sid'], function(error, session) {
        var twit = Twitter.getInstance(session.id);
        twit.stream('user', null, function(stream) {
            stream.on('data', function(data) {
                console.log(util.inspect(data));
                client.send(JSON.stringify(data));
            });

            client.on('disconnect', function() {
                stream.destroy();
            });
        });
    });
});
