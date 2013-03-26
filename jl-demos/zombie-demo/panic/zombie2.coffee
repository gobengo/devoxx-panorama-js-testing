should = require('chai').should()
Browser = require('zombie')

home = 'http://localhost:8080/'

describe 'devoxx serpodile demo', ->

	it 'should be live', (done) ->
		browser = new Browser()
		browser.visit home, ->
			browser.text('title').should.contain 'Boutique Serpodile'
			done()

	it 'should add a product to the basket', (done) ->
		browser = new Browser()
		browser.visit home, ->
			browser.clickLink '#mon-cahier-5', ->
				browser.text('#nb-article').should.equal '1 article'
				done()

	it 'should add a product to the cookie', (done) ->
		browser = new Browser()
		browser.visit home, ->
			browser.clickLink '#mon-cahier-5', ->
				browser.cookies().get('serpodile_cart').should.contain 'mon-cahier-5'
				done()

	it 'should order a product', (done) ->
		browser = new Browser()
		browser.visit home, ->
			browser.clickLink '#mon-cahier-5', ->
				browser.clickLink 'Panier', ->
					browser.clickLink '.btn_valider', ->
						browser.fill("prenom", "Headless")
						browser.fill("nom", "Zombie")
						browser.fill("email", "headlesszombie@morlhon.net")
						browser.fill("nom_l", "Headless Zombie")
						browser.fill("adresse_l", "66 rue ambroise croizat")
						browser.fill("adresse_complement_l", "this rocks")
						browser.fill("code_postal_l", "78800")
						browser.fill("ville_l", "Houilles")
						browser.select("pays_l", "france")
						browser.check("cgv")
						browser.pressButton "#validate", ->
							browser.success.should.be.true
							browser.authenticate().basic "test", "test"
							browser.visit "#{home}orders.html", ->
								browser.text("tr:nth-child(1) > td:nth-child(2)").should.equal '9.0 €'
								browser.evaluate('$("table#orderTable > tbody > tr:nth-child(1) > td").click()')
								browser.wait 1000, ->
									browser.text(".product_title").should.equal 'Mon Cahier 5 mm'
									done()
