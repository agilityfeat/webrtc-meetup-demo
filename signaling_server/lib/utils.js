var url     = require('url');
var request = require('request');

var config  = require('../lib/config');

function checkPremiumUser(id, callback) {
  var options = {
    uri: url.resolve(config.get('BACKEND_URL'), '/user/get'),
    method: 'POST',
    json: { "_id": id }
  };
  console.log('request options: ', options);
  request(options, function (error, response, body) {
    console.log('response', body);
    if (body) {
      var user = body;
      var activeUntil = user.active_until;
      var timestamp = new Date().getTime() / 1000;
      activeUntil = new Date(activeUntil).getTime() / 1000;
      callback(timestamp < activeUntil);
    } else {
      callback(false);
    }
  });
}

module.exports = {
  checkPremiumUser: checkPremiumUser
};
