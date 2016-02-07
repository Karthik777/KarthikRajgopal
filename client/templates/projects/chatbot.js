Template.messageItem.helpers({
	activityText: function(){
		var user = Meteor.users.findOne({_id: this.user_id});
		if ( this.activityType == 'join' ) {
			return '<strong>'+user.name+'</strong> has joined the room.';
		} else if ( this.activityType == 'leave' ) {
			return '<strong>'+user.name+'</strong> has left the room.';
		} else if ( this.activityType == 'addVideo' ) {
			var video = Videos.findOne({_id: this.video_id});
			return '<strong>'+user.name+'</strong> has added <strong>"'+video.title+'"</strong> to the playlist.';
		}
	},
	timeFormat: function(timestamp){
		return moment(timestamp).format('HH:mm');
	}
})


Template.chatbot.helpers({
  imageName: function(){
    return "images/eva.jpg";
  },
	messageList: function(){
		return Messages.find();
	}
});

Template.chatbot.events({
	"click #room-chat .sendmessage": function(event, template){
		 event.preventDefault();
		 var message = $('#room-chat input.chattext').val();
		 var data = {name:'eva',imagepath:'images/captainfalcon.jpg',message:message};
		 var template = ""
     $('#room-chat .card-content ul').append()
		 var params = {message : $('#room-chat input.chattext').val()};
		 var url = "http://127.0.0.1:5000/eva/chat";
		Meteor.call("Sendchat",url, params, function(error, result){
		 	if(error){
		 		console.log("error", error);
		 	}
		 	if(result){
				console.log(result);
				result = EJSON.parse(result.content);
				var response = {name:'eva',imagepath:'images/eva.jpg',message:result['message']};
		 		Meteor.call("Messages.insert",response);
		 	}
		 });
	},
	"click .room-chat #chatbot": function(event, template){
		 event.preventDefault();
	},
});

Template.messageItem.rendered = function(){
	var messagesContainer = $('.room-messages');
	messagesContainer.scrollTop(messagesContainer.prop('scrollHeight'));

	$('.message-list li').each(function(){
		var user_id = $(this).attr('data-user-id');
		if ( user_id && $(this).prev().attr('data-user-id') == user_id ) {
			$(this).prev().addClass('hide-info');
		}
	});
}
