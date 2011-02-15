var Twitter = {
    get _socket() {
        delete this._socket;
        return this._socket = new io.Socket(null);
    },

    init: function() {
        var that = this;

        this._socket.on('message', function(message) {
            var tweet = JSON.parse(message);
            //console.log(tweet);
            if (!tweet.text) return;

            var entities = that.format(tweet);
            that.create(entities);
        });
    },

    connect: function() {
        this._socket.connect();
    },

    format: function(tweet) {
        var formatted = [
            tweet.user.screen_name,
            tweet.text,
            tweet.created_at,
        ].join(' ');
        return [
            '<div class="tweet">',
            formatted,
            '</div>',
        ].join('');
    },

    create: function(entities) {
        $('div#tweets').prepend(entities);
    },
};

$(function() {
    Twitter.init();
    Twitter.connect();
});
