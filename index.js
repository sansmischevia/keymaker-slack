var Slack = require('node-slack');
var slack = new Slack('webflow', process.env.SLACK_TOKEN);
var restify = require('restify');
var request = require('request');

var PORT = 3000;

var server = restify.createServer({
  name: 'keymaker'
});

server.use(restify.queryParser());
server.use(restify.bodyParser());

server.post('/keymaker', function(req, res, next) {
  console.log('BODY: ' + req.body);
  getZen(function(err, zen) {
    res.send('ok');
  });
});

server.listen(PORT, function() {
  console.log('Keymaker listening on PORT: ', PORT);
});

function getZen(cb) {
  request.get('https://api.github.com/zen', {
    headers: {
      'User-Agent': 'sansmischevia'
    }
  }, function(err, resp, body) {
    return cb(err, body);
  });
}
