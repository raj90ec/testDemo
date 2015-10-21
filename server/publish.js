Meteor.publish('publicLists', function() {
  return Lists.find({userId: {$exists: false}});
});

Meteor.publish('privateLists', function() {
  if (this.userId) {
    return Lists.find({userId: this.userId});
  } else {
    this.ready();
  }
});

Meteor.publish('todos', function(listId) {
  check(listId, String);

  return Todos.find({listId: listId});
});


Meteor.publish('theMessage', function () {
    return Messages.find()
});

Meteor.publish('Address', function () {
    return Address.find()
});

Meteor.publish('theroutes', function () {
    return Routes.find()
});

Meteor.publish('theassignments', function () {
    return Assignments.find()
});

Meteor.publish('thescanqueue', function () {
    return ScanQueue.find()
});

Meteor.publish('theserviceareas', function () {
    return ServiceAreas.find()
});