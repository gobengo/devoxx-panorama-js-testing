describe 'devoxx angular karma', ->

	it 'should show the homepage', ->
		browser().navigateTo '/'
		expect(element('h1').text()).toBe 'Hello Devoxx'

	it 'should show 6 elements in the page', ->
		browser().navigateTo '/'
		expect(repeater('.languages li').count()).toBe 6

	it 'should show 6 elements in the page', ->
		browser().navigateTo '/'
		expect(repeater('.languages li').count()).toBe 6
		input('query').enter 'cobol'
		expect(repeater('.languages li').count()).toBe 1