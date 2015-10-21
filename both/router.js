Router.configure({
  layoutTemplate: 'layout'
});

Meteor.startup(function () {
  if (Meteor.isClient) {
    var location = Iron.Location.get();
    if (location.queryObject.platformOverride) {
      Session.set('platformOverride', location.queryObject.platformOverride);
    }
  }
});

Router.map(function() {
  this.route('signin', {path: '/'});
  this.route('join');


  this.route('admin.home', { path: '/admin/home', layoutTemplate: 'adminLayout' });
  this.route('admin.addcoord', { path: '/admin/addcoord', layoutTemplate: 'adminLayout' });
  this.route('admin.addservicearea', { path: '/admin/addservicearea', layoutTemplate: 'adminLayout' });

  this.route('coord.home', { path: '/coordinator/home', layoutTemplate: 'coordLayout' });
  this.route('coord.users', { path: '/coordinator/users', layoutTemplate: 'coordLayout' });
  this.route('coord.maps', { path: '/coordinator/maps', layoutTemplate: 'coordLayout' });
  this.route('coord.messaging', { path: '/coordinator/messaging', layoutTemplate: 'coordLayout' });
  this.route('coord.route', { path: '/coordinator/route', layoutTemplate: 'coordLayout'
});

  this.route('driver.maps', { path: '/driver/maps', layoutTemplate: 'driverLayout' });
  this.route('driver.messaging', { path: '/driver/messaging', layoutTemplate: 'driverLayout' });

  this.route('helper.home', { path: '/helper/home', layoutTemplate: 'helperLayout' });
  this.route('helper.dispatch', { path: '/helper/dispatch', layoutTemplate: 'helperLayout' });
  this.route('helper.maps', { path: '/helper/maps', layoutTemplate: 'helperLayout' });
  this.route('helper.messaging', { path: '/helper/messaging', layoutTemplate: 'helperLayout' });

  this.route('helper.feedback', { path: '/helper/feedback', layoutTemplate: 'helperLayout' });
  this.route('helper.safety', { path: '/helper/safety', layoutTemplate: 'helperLayout' });

  this.route('helper.release', { path: '/helper/release/:_id', layoutTemplate: 'helperLayout' });
  this.route('helper.sigpad', { path: '/helper/sigpad/:_id', layoutTemplate: 'helperLayout' });
  this.route('helper.tracking', { path: '/helper/tracking/:_id', layoutTemplate: 'helperLayout' });

});

