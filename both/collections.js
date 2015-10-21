Address = new Mongo.Collection('Address');
Todos = new Mongo.Collection('todos');
Messages = new Mongo.Collection('messages');
Routes = new Mongo.Collection('routes');
Assignments = new Mongo.Collection('assignments');
ScanQueue = new Mongo.Collection('scanqueue');
Helpers = new Mongo.Collection("helper1");
ServiceAreas = new Mongo.Collection("serviceareas");

if (Meteor.isClient) {
    Meteor.subscribe('theMessage');
    Meteor.subscribe('theroutes');
    Meteor.subscribe('theassignments');
    Meteor.subscribe('thescanqueue');
    Meteor.subscribe('Address');
    Meteor.subscribe('thehelpers');
    Meteor.subscribe('theserviceareas');
}


