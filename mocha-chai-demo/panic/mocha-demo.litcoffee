# Mocha Chai Demo
*need chai and mocha node modules*

'mocha --compilers coffee:coffee-script --reporter spec --watch test.coffee'

Can try with other reporter like :
* xunit
* landing
* nyan


	should = require('chai').should()

	FizzBuzz = (value) ->
		return undefined unless value?
		return "fizz" if value == 3
		"#{value}"

	describe 'FizzBuzz', ->

		it 'should be undefined for undefined', ->
			should.not.exist FizzBuzz()

		it 'should be one for 1', ->
			FizzBuzz(1).should.equal '1';

		it 'should be fizz for 3', ->
			FizzBuzz(3).should.equal 'fizz'

		it 'should showcase chai.js assertions', ->
			map = 
				foo : 'bar'
				qix : 'baz'
				nop : 
					polka : 'dance'
					rock : 'awesome'

			map.should.include.keys 'foo'
			map.should.have.property 'foo'
			map.should.have.keys ['foo','qix','nop']

			map.foo.should.contain 'ba'
			map.foo.should.have.string 'ba'


			map.foo.should.have.length 3
			map.should.have.deep.property 'nop.rock'

