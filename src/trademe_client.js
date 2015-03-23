/* global TradeMe:true, ServiceConfiguration, OAuth */
'use strict';

TradeMe = {};

TradeMe.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'trademe'});

  if (!config && credentialRequestCompleteCallback) {
    credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError());
    return;
  }

  var credentialToken = Random.secret();
  // We need to keep credentialToken across the next two 'steps' so we're adding
  // a credentialToken parameter to the url and the callback url that we'll be returned
  // to by oauth provider

  var loginStyle = OAuth._loginStyle('trademe', config, options);

  // url to app, enters "step 1" as described in
  // packages/accounts-oauth1-helper/oauth1_server.js
  var loginPath = '_oauth/trademe/?requestTokenAndRedirect=true' +
    '&state=' + OAuth._stateParam(loginStyle, credentialToken);

  var loginUrl = Meteor.absoluteUrl(loginPath);

  OAuth.launchLogin({
    loginService: 'trademe',
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken,
    popupOptions: {width: 1005, height: 695}
  });
};
