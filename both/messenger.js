Messenger = Class({
    initialize: function (user) {
        this.user = user;
    },
    toString: function () {
        return "Connected As:"+this.user
    },
    sendMessage: function () {
        //send message method
    },
    getReadMessages: function () {
        //get read messages method
    },
    getUnreadMessages: function () {
        //get read messages method
    }

});

Message = Class({
    initialize: function (sender, recipient, boolRead,msgText) {
        this.sender = sender;
        this.recipient = recipient;
        this.boolread = boolRead;
        this.msgText = msgText;
    },
    toString: function () {
        return this.from + ": to" + this.recipient + "-" + this.lastName;
    }
});

