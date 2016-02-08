Template.chatbot.helpers({
  imageName: function(){
    return "images/eva.jpg";
  },
	messageList: function(){
		return Messages.find();
	}
});
function encompassmessage(name,message)
{
	if(name === 'eva')
	{
		return	'<span class="black-text text-darken-2">'+message+'</span>';

	}
	else {
		return '<span class="blue-text text-darken-2">'+message+'</span>'
	}
}

function getListTemplate(name,imageName,message,direction)
{

	return '<li class=""><div class="chip avatar">'+
	'<img src="'+imageName+'" alt="'+name+'"></div>'+encompassmessage(name,message)+'</li>'
}
Template.chatbot.events({
	"click #room-chat .sendmessage": function(event, template){
		 event.preventDefault();
		 var message = $('#room-chat input.chattext').val();
	   $('#room-chat .card-content ul').append(getListTemplate('human','images/captainfalcon.jpg',message,'left'));
		 var params = {message : $('#room-chat input.chattext').val()};
		 var url = "http://127.0.0.1:5000/eva/chat";
		Meteor.call("Sendchat",url, params, function(error, result){
		 	if(error){
		 		console.log("error", error);
		 	}
		 	if(result){
				console.log(result);
				var response = EJSON.parse(result.content);
				$('#room-chat .card-content ul').append(getListTemplate('eva','images/eva.jpg',response['message'],'right'));
		 	}
		 });
	},
	"click .room-chat #chatbot": function(event, template){
		 event.preventDefault();
	},
});
