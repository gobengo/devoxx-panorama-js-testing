
// screencast

/*var page = require('webpage').create();

page.viewportSize = { width: 480, height: 400 };

// page.clipRect = { top: 14, left: 3, width: 400, height: 300 };

page.open('http://github.com/', function () {
    page.render('github.png');
    phantom.exit();
});*/


// double context

var page = require('webpage').create();
page.viewportSize = { width: 1280, height: 1024 };
page.open('http://serpodile.com/', function (status) {

    // document.querySelector("input[name=q]")
    // $(".produit h2")  // document.querySelectorAll(".produit h2")

    console.log(status);
    console.log(JSON.stringify(page.viewportSize));

    page.render('test.png');
    phantom.exit();
});

