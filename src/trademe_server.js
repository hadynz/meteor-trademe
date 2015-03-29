/* global TradeMe:true, OAuth, ServiceConfiguration */
'use strict';

function sandboxMode() {
  var config = ServiceConfiguration.configurations.findOne({service: 'trademe'});
  if (config) {
    return config.sandbox === true;
  }
  return false;
}

var trademeSettings = Meteor.settings.trademe || {};
var oAuthHostname = 'https://secure.trademe.co.nz';
var apiHostname = 'https://api.trademe.co.nz';

if (trademeSettings.sandbox === true || sandboxMode()) {
  oAuthHostname = 'https://secure.tmsandbox.co.nz';
  apiHostname = 'https://api.tmsandbox.co.nz';
}

TradeMe = {};

TradeMe.whitelistedFields = ['FirstName', 'LastName', 'Nickname', 'Email', 'ClosestDistrict', 'ClosestLocality'];

TradeMe.urls = {
  requestToken: oAuthHostname + '/Oauth/RequestToken',
  authorize: oAuthHostname + '/Oauth/Authorize',
  accessToken: oAuthHostname + '/Oauth/AccessToken',
  authenticate: oAuthHostname + '/Oauth/Authorize'
};

OAuth.registerService('trademe', 1, TradeMe.urls, function (oauthBinding) {
  var identity = oauthBinding.get(apiHostname + '/v1/MyTradeMe/Summary.json').data;

  var serviceData = {
    id: identity.MemberId,
    screenName: identity.Nickname,
    accessToken: OAuth.sealSecret(oauthBinding.accessToken),
    accessTokenSecret: OAuth.sealSecret(oauthBinding.accessTokenSecret)
  };

  var fields = _.pick(identity, TradeMe.whitelistedFields);
  _.extend(serviceData, fields);

  return {
    serviceData: serviceData,
    options: {
      profile: {
        name: identity.FirstName
      }
    }
  };
});

TradeMe.retrieveCredential = function (credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
