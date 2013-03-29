basePath = '';

files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  '*.coffee'
];


exclude = [];

reporter = 'progress';


port = 8081;

runnerPort = 9100;


colors = true;

logLevel = LOG_INFO;


autoWatch = true;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari
// - PhantomJS
browsers = ['Chrome','Firefox','ChromeCanary','Opera','Safari','PhantomJS'];

singleRun = false;

urlRoot = '/karma/'

proxies = {
	'/' : 'http://localhost:4000/'
}