
module("Bar");

// hello test

test("Client should have a server and no drinks when arriving in the bar", function() {

    var client = new Client();

    ok(client.server != null);
    equal(client.drinks.length, 0);

});

// yell - spies / mock.

// TODO : refactor : orderBeer instead of yell.

test("Server should do nothing client on yell if not busy", function() {

    var server = new Server();
    this.spy(server, "goToTable");

    var client = new Client(null, {server : server});

    client.yell();

    ok(server.goToTable.withArgs(client.get("tableId")).calledOnce);

    server.goToTable.reset();

    var stub = this.stub(server, "isBusy");
    stub.returns(true);

    client.yell();

    ok(!server.goToTable.withArgs(client.get("tableId")).called);

});

// orderBeer - spies / mocks

test("Client should go to the toilet after the third beer", function() {

    var server = new Server();
    this.spy(server, "goToTable");

    var client = new Client(null, {server : server});
    this.spy(client, "goToBathRoom");

    client.orderBeer();
    ok(!client.goToBathRoom.called, "not after the first beer...");

    client.orderBeer();
    ok(!client.goToBathRoom.called, "not after the second beer...");

    client.orderBeer();
    ok(client.goToBathRoom.calledOnce, "but after the third beer !");

});

// Fake Clock.

asyncTest("(qunit) Client can go to the bathroom", function() {

    var server = new Server();

    var client = new Client(null, {server : server});

    ok(client.away==false, "client should be there");

    client.goToBathRoom();

    ok(client.away, "client should be away");

    setTimeout(function() {

        ok(client.away==false, "client should be back");

        start();
    }, 1000);

});

test("(sinon) Client can go to the bathroom", function() {

    this.clock = this.sandbox.useFakeTimers();

    var server = new Server();
    var client = new Client(null, {server : server});

    ok(client.away==false, "client should be there");

    client.goToBathRoom();

    ok(client.away, "client should be away");

    this.clock.tick(1000);

    ok(client.away==false, "client should be back");

});

// Fake server

test("server should go get the client bill on request", function() {

    var server = new Server();
    this.spy(server, "getBill");

    var client = new Client(null, {server : server});

    client.requestBill();

    ok(server.getBill.calledOnce);
    ok(server.getBill.withArgs(client).calledOnce);

});


test("getBill should trigger an ajax request and make the client pay on success", function() {


    var server = new Server();

    var fakeServer = this.sandbox.useFakeServer();

    fakeServer.respondWith([200, {"Content-Type" : "text/json"},
        JSON.stringify({ price : "120€"})]
    );

    var client  = new Client(null, {server : server});

    this.spy(client, "payBill");


    client.requestBill();

    equal(client.payBill.callCount, 0);

    equal(fakeServer.requests.length, 1);

    fakeServer.respond();

    ok(client.payBill.calledOnce, 0);

});
