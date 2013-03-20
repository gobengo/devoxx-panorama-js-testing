
// screen cast

// casper
casper.start('http://localhost:8080', function() {
    this.captureSelector('header.png', '#header');
});

casper.run();


// phantom
var page = require('webpage').create();
page.open("http://localhost:8080", function(status) {
	if(status!="success") {
		phantom.exit();
	}
	var headerClipRect = page.evaluate(function() {
		var clipRect = document.querySelector(selector).getBoundingClientRect();
        return {
            top: clipRect.top, left: clipRect.left, 
            width: clipRect.width, height: clipRect.height
        };	
	});
	var oldClipRect = page.clipRect;
	page.clipRect = headerClipRect;
	page.render("header.png");
	page.clipRect = oldClipRect;

	phantom.exit();
});    


//// Tester API

casper.test.comment('Loosy comment');

casper.start(homeUrl, function() {
    this.test.assertTitle(homeTitle, "home title should match");

    this.test.assertEval(function() {
   		return $(".product").length == 7;
    }, "home should display 7 products");

    this.click(".product a").click();
});

casper.then(function() {
	this.test.assertUrlMatch(/http:\/\/localhost:8080\/product/, "should be on a product url");
});

casper.run(function() {
    this.test.done(3); 
});