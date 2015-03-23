# trademe

[![Build Status](https://travis-ci.org/hadynz/meteor-trademe.svg)](https://travis-ci.org/hadynz/meteor-trademe)

An OAuth wrapper for the TradeMe API.

## Registering an Application

To use the Trade Me API methods, you will first need to register an application to generate a ‘Consumer Key’ 
and ‘Consumer Secret’ inorder to request and modify data on behalf of a user using OAuth.

> Registering an application is easy.

> 1. If you don’t already have a Trade Me sandbox membership you’ll need to [create one][register].

> 2. Go to your [My Trade Me][mytrademe] page. Click ‘My Applications’, choose ‘Developer options’, 
and then ‘Register a new application’.

> 3. Fill in the form fields and once you’ve successfully submitted the form make a note of 
your ‘Consumer key’ and ‘Consumer secret’ – add these to your application to be used as part 
of the OAuth authorization process. [Read more about Authentication][auth].

> Reference: [Trade Me - Registering an Application][registerapp]

## Configuration

You will need to ensure that your Trade Me ‘Consumer Key’ and ‘Consumer Secret’ are stored in Meteor's 
`ServiceConfiguration` Mongo tables everytime your Meteor application starts up.

In a config file that runs inside Meteor's server context (e.g. `server/trademe-config.js`) configure the
following:

```js
ServiceConfiguration.configurations.remove({
  service: 'trademe'
});

ServiceConfiguration.configurations.insert({
  service: 'trademe',
  sandbox: true,  // Optional parameter
  consumerKey: '...',
  secret: '...'
});
```

If you are still developing your application against Trade Me's [sandbox environment][sandbox] then
set `sandbox: true` for the `meteor-trademe` module to use all the relevant Trade Me OAuth and API
sandbox URL's instead of Production.

## License

Copyright (c) 2015 Hady Osman.   
Licensed under the [MIT license][license].

[registerapp]: http://developer.trademe.co.nz/api-overview/registering-an-application
[register]: http://www.tmsandbox.co.nz/Members/Register.aspx
[mytrademe]: http://www.tmsandbox.co.nz/MyTradeMe/Default.aspx
[auth]: http://developer.trademe.co.nz/api-overview/authentication
[sandbox]: http://developer.trademe.co.nz/api-overview/sandbox-environment
[license]: https://github.com/hadynz/meteor-trademe/blob/master/README.md

