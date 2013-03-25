




Server = Backbone.Model.extend({

    billUrl : "/bills",

    initialize : function(attr, options) {
        this.clients = [];
        this.currentTable = null;
    },

    serveBeer : function() {
        if(this.isBusy()) {
            throw "ImBusyException"
        }
        return "beer";
    },

    isBusy : function() {
        return false;
    },

    manageClient : function(client) {
        this.clients.push(client);
        client.on("request:bill", this.getBill, this);
    },

    getBill : function(client) {
        return $.get(this.billUrl, { tableId : client.get("tableId")}).then(function(bill) {
            client.payBill(bill);
        }, "json");
    }

});


Client =  Backbone.Model.extend({

    initialize : function(attr, options) {
        this.away = false;
        this.drinks = [];
        this.server = options && options.server || new Server();
        this.server.manageClient(this);
    },

    orderBeer : function() {
        try {
            var beer = this.server.serveBeer();
            this.drinks.push(beer);
            if(this.drinks.length % 3 == 0) {
                this.goToBathRoom();
            }
        } catch(e) {
            console.log("damn server, always busy.")
        }
    },

    yell : function() {
        this.trigger("yell", this);
    },

    goToBathRoom : function() {
        this.away = true;
        var self = this;
        _.delay(function() {
            self.away = false;
        }, 1000);
    },

    requestBill : function() {
        this.trigger("request:bill", this);
    },

    payBill : function(bill) {
        console.log("payBill !")
    }

});


