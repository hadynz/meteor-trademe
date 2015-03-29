/* global Package */
Package.describe({
  name: 'hadynz:trademe',
  summary: 'TradeMe OAuth flow',
  version: '1.0.1',
  git: 'https://github.com/hadynz/meteor-trademe.git'
});

Package.onUse(function (api) {
  'use strict';

  api.versionsFrom('0.9.0');
  api.use('http', ['client', 'server']);
  api.use('templating', 'client');
  api.use('oauth1', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('random', 'client');
  api.use('underscore', 'server');
  api.use('service-configuration', ['client', 'server']);

  api.export('TradeMe');

  api.addFiles(['src/trademe_configure.html', 'src/trademe_configure.js'], 'client');

  api.addFiles('src/trademe_server.js', 'server');
  api.addFiles('src/trademe_client.js', 'client');
});
