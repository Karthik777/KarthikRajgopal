Meteor.methods({
  'Messages.insert': function (params) {
    Messages.insert(params);
  },
  'Sendchat': function (url,params) {
            this.unblock();
            return Meteor.http.call("GET", url,{data: params});
  }

});
