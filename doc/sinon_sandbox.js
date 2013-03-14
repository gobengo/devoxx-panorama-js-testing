
// spies

var greeter = {
    greet : function(name) {
        console.log("hello " + (name || "stranger") + " !");
    }
}

var spy = sinon.spy(greeter, "greet");

greeter.greet("john");
greeter.greet("bobby");

spy.called      // true;
spy.calledOnce  // false
spy.calledTwice // true;

spy.withArgs("john").called // returns true
spy.withArgs("dolly").called // return false

// stubs

var stub = sinon.stub();

stub.returnsArg(0);
stub.withArgs("hello").returns(1);
stub.withArgs("throw").throws("YouMadeMeDoThisError");

stub();         // returns undefined
stub("dolly");  // returns "dolly"
stub("hello");  // returns 1
stub("throw");  // throws YouMadeMeDoThisError

// mock

test("mock should mock", function() {
    var greeter = {
        greet : function(name) {
            console.log("hello " + (name || "stranger") + " !");
        }
    };

    var mock = sinon.mock(greeter);
    mock.expects("greet").once().withArgs("john");

    // mock.verify() // would raise
    greeter.greet("john");
    mock.verify(); // will pass
});

// fake timers

var clock = sinon.useFakeTimers();
var spy = sinon.spy();

window.setTimeout(spy, 150);

clock.tick(149);
spy.called; // returns false

clock.tick(1);
spy.called; // returns true

// alternative

var clock = sinon.useFakeTimers();
var spy = sinon.spy();

window.setInterval(spy, 30);
clock.tick(100);

clock.restore();

spy.calledThrice; // returns true

// fake xhr

var xhr = sinon.useFakeXMLHttpRequest();
var requests = [];
xhr.onCreate = function (request) {
    requests.push(request);
};

var spy = sinon.spy();

$.get("/").then(spy);

requests[0].respond(200, {}, "some text");

spy.calledOnce; // returns true
spy.withArgs("some text").calledOnce; // returns true

// fake server

this.server = sinon.fakeServerWithClock.create();
server.respondWith([200, { "Content-Type": "text/plain" },"hello dolly"]);
var spy = sinon.spy();

$.get("/").then(spy);
server.respond();

spy.calledOnce;
spy.withArgs("hello dolly").calledOnce;






////////////////////////
// more advanced exemple :

"test should call method once with each argument": function () {
    var object = { method: function () {} };
    var spy = sinon.spy(object, "method");
    spy.withArgs(42);
    spy.withArgs(1);

    object.method(42);
    object.method(1);

    assert(spy.withArgs(42).calledOnce);
    assert(spy.withArgs(1).calledOnce);
}