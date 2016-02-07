Items = new Meteor.Collection('items');
Messages = new Meteor.Collection('messages');

Items.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});
