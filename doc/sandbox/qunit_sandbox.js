
// test


test("true should be equals to true and different that false", function() {

    ok(true==true);
    ok(true!=false)

});


// module

module("BISAM", {
    setup : function () {
        this.sandbox = $("#sandbox");
    },
    teardown : function () {
        this.sandbox.empty();
    }
});

test("BISAM object should be in window scope", function(){
    ok(typeof window.BISAM != "undefined");
});

// plugins

QUnit.extend( QUnit.assert, {
    /**
     * Asserts that given number is strictly greater than given minimum
     */
    greaterThan : function(number, minimum, message) {
        QUnit.push(number > minimum, number, ">" + minimum, message);
    }
});