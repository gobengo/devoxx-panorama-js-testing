

module("Devoxx");

test("greaterThan plugin should test if number is greater than given minimum", function(assert) {

    var value = 5;

    assert.greaterThan(value, 3, "value should be greater than 3");


});