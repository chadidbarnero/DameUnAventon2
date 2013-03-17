//( function( $ ) {
	
  var CONFIG = {
			PUSHER: {
		    APP_KEY: 'c1c5e53e2c8e5295a772'
			}
	};
	
	document.addEventListener("deviceready", onDeviceReady_, false);
	
	function onDeviceReady_(){
	
	}

  function loadAndSuscribePusher() 	function loadPusher() {
  	
		Pusher.log = function( msg ) {
		if( window.console && window.console.log ) {
				window.console.log( msg );
				}	
		};
		
		// Connect
		var pusher = new Pusher('c1c5e53e2c8e5295a772');
		pusher.connection.bind('state_change', connectionStateChange);
		
		function connectionStateChange(state) {
			console.log(state.current);
		}
		
		// Subscribe
		var channel = pusher.subscribe('user-' + window.localStorage.getItem("fbUserId"));
		channel.bind('pusher:subscription_succeeded', subscriptionSucceeded);
		
		function subscriptionSucceeded() {
			console.log("subscriptionSucceeded");
		}
		
		channel.bind('rides', ridesHandler);
		
		function ridesHandler( data ) {
			window.plugins.statusBarNotification.notify("Dame un aventon", JSON.stringify(data, null, 2));
			$('#eventList_dua').append('<li><a id="' + JSON.stringify(data, null, 2) + '" onclick=manageEvent(this.id)>' +
						'<img src="http://www.dameunaventon.com/"/>' +
						'<h4>' + JSON.stringify(data, null, 2) + '</h4>' +
						'<p>' + JSON.stringify(data, null, 2) + '</p></a></li>');
			$('#eventList_dua').listview(); 

		}
  	
  }
  
//} )( jQuery );

Pusher.log = function( msg ) {
	if( window.console && window.console.log ) {
		window.console.log( msg );
	}
};