# meteor-trademe
An OAuth wrapper for the TradeMe API

## Installation

* Install accounts-ui package: `mrt accounts-ui`
* `mrt add dropbox-oauth`

## Usage

Creates a new function `Meteor.loginWithDropbox(options, callback)`

This is the backbone of `accounts-dropbox`

## Configuration

```js
ServiceConfiguration.configurations.remove({
  service: 'trademe'
});

ServiceConfiguration.configurations.insert({
  service: 'trademe',
  sandbox: true,
  consumerKey: '...',
  secret: '...'
});
```
