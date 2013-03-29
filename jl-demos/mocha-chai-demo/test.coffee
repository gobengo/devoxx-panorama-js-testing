should = require('chai').should()

fizzbuzz = (value) ->
	return 'fizz' if value == 3
	"#{value}"

describe 'FizzBuzz', ->

	it 'should be 1 for 1', ->
		fizzbuzz(1).should.equal '1'
		
	it 'should be fizz for 3', ->
		fizzbuzz(3).should.equal 'fizz'