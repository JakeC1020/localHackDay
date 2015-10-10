var fs = require('fs');
var debug = require('debug')('green-space:router');
var routes = fs.readdirSync('./routes');
var database = require('./lib/database');

module.exports = function(app) {
  routes.forEach(function(entry) {
    var route = require('./routes/' + entry)(database);
    
    for (var verb in route.verbs) {
      debug('load ' + verb.toUpperCase() + ' ' + route.route);
      app[verb](route.route, route.verbs[verb]);
    }
  });
};
