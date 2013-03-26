describe 'devoxx karma demo', ->

	it 'should show the homepage', ->
		browser().navigateTo '/'
		expect(element('h1').text()).toBe 'Hello Devoxx'

	it 'should show all language on the front page', ->
		browser().navigateTo '/'
		expect(repeater('.languages li').count()).toBe 6

	it 'should filter language by words', ->
		browser().navigateTo '/'
		input('query').enter 'cobol'
		expect(repeater('.languages li').count()).toBe 1	

	# Do it with the pause

	it 'should check the right url is set', ->
		browser().navigateTo '/'
		expect(element('title').text()).toBe 'Hello Devoxx'