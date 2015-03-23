/* global Template */
'use strict';

Template.configureLoginServiceDialogForTradeMe.helpers({
  siteUrl: function () {
    return Meteor.absoluteUrl();
  }
});

Template.configureLoginServiceDialogForTradeMe.fields = function () {
  return [
    {property: 'consumerKey', label: 'Consumer Key'},
    {property: 'secret', label: 'Consumer Secret'}
  ];
};
