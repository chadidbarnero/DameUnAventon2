			 /*FB.Event.subscribe('auth.login', function(response) {
                               alert('auth.login event');
                               });
            
            FB.Event.subscribe('auth.logout', function(response) {
                               alert('auth.logout event');
                               });*/
            
            /*FB.Event.subscribe('auth.sessionChange', function(response) {
                               alert('auth.sessionChange event');
                               });
            
            FB.Event.subscribe('auth.statusChange', function(response) {
                               alert('auth.statusChange event');
                               });*/
            
            /*function getSession() {
                alert("session: " + JSON.stringify(FB.getSession()));
            }
            */

			
			// para web mobile
            /*window.onLoad=FB.init({
							  appId      : '234586436647660', // App ID
							  channelUrl : 'channel.html', // Channel File
							  status     : true, // check login status
							  cookie     : true, // enable cookies to allow the server to access the session
							  xfbml      : true  // parse XFBML
							});*/
			
			//FB.init({ appId: "132921496839607", nativeInterface: CDV.FB, useCachedDialogs: false });
			
			//date time picker
			
			//para que funcionen los transitions
			$.mobile.transitionFallbacks = "none";
			
			$("#fechaPA").scroller({ preset: 'datetime' }); 
			$("#fechaDA").scroller({ preset: 'datetime' }); 
			
			window.localStorage.setItem("prevPageId","");
			
			function checkConnection() {
				
				
				var states = {};
				states[Connection.UNKNOWN]  = 'Unknown connection';
				states[Connection.ETHERNET] = 'Ethernet connection';
				states[Connection.WIFI]     = 'WiFi connection';
				states[Connection.CELL_2G]  = 'Cell 2G connection';
				states[Connection.CELL_3G]  = 'Cell 3G connection';
				states[Connection.CELL_4G]  = 'Cell 4G connection';
				states[Connection.NONE]     = 'No network connection';

				//*D console.log('Connection type: ' + states[networkState] + " y las demas: " +  Connection.UNKNOWN + "," + Connection.ETHERNET + "," +
						//*D	Connection.WIFI + "," + Connection.CELL_2G + "," + Connection.CELL_3G + "," + Connection.CELL_4G + "," + Connection.NONE);
				
			}

			//PUSHER TEST
			   //$('#deviceProperties').html(deviceInfo)

			function testLogin(){
				window.localStorage.setItem("fbUserId", '613135170'); //daviol: 613135170 pedazo: 100002508654290 josue: 555777204
				window.localStorage.setItem('fbPhotoUrl','falfafa');
				window.localStorage.setItem('fbName','pepe');
				window.localStorage.setItem('fbNickname','nickFafafa');
				window.localStorage.setItem('fbEmail','email@fafafa.fa');
				window.localStorage.setItem('fbCity','Cali');
				window.localStorage.setItem('fbAccessToken','23983487439832');
				window.localStorage.setItem("userCurrentLatitude","4.6838877");
				window.localStorage.setItem("userCurrentLongitude","-74.070328");
				$.mobile.changePage('#page7',{transition: 'slidedown'});
				//validarOcrearUsuario2();
				//loadNotifications();

			}
			
			function login() {
			    
				//Check internet connection
				var networkState = navigator.network.connection.type;
				if (networkState == Connection.UNKNOWN || networkState == Connection.NONE){
					alert("No hay conexion a internet, intenta de nuevo!");
					$(location).attr('href',"#loginPage");
					return;
				}
				
                FB.login(
                         function(response) {
                         if (response.authResponse) {
							 console.log('logged in');
							 window.localStorage.setItem("fbAccessToken", response.authResponse.accessToken);
							 //*D console.log(window.localStorage.getItem("fbAccessToken"));
							 FB.api('/me', function(response) {
									  console.log(JSON.stringify(response));
									  window.localStorage.setItem("fbUserId", response.id);
									  $('#profilePic').attr('src','https://graph.facebook.com/' + response.id + '/picture?type=small');
									  $('#userName').html("<b>" + response.name + "</b>");
									  $('#userLocation').html("<b>" + response.location  + "</b>");
									  //actividades de inicializacion	
									  validarOcrearUsuario2();
									  loadPusher();
							          loadNotifications();
									});
							 $(location).attr('href',"#home");
                         } else {
							alert('not logged in');
                         }
                         },
                         { scope: "email,publish_stream" }
                         );
                						 
            }
			
			function validarOcrearUsuario2(){
			
				//Check internet connection
				var networkState = navigator.network.connection.type;
				if (networkState == Connection.UNKNOWN || networkState == Connection.NONE){
					alert("No hay conexion a internet, intenta de nuevo!");
					$(location).attr('href',"#loginPage");
					return;
				}
			
			//*D console.log("Entro a validarOcrearUsuario2");  
			                
				var str_url= "http://www.dameunaventon.com/duaservicedev/DameUnAventonServices.svc/json/Account/registerUser/" + window.localStorage.getItem('fbUserId') + "/" + window.localStorage.getItem('fbAccessToken') + "/mobile/android";
				//*D console.log("url1: " + str_url);
				$.ajax({ url: str_url
						, async: false
						, type: "GET"
						, dataType: "jsonp"
						, success: function (json){
						            //si es false es que ya existe, si es true lo creo..
									//*D console.log("resultado crear validarOcrearUsuario2: " + json.validateAndRegisterUserResult);
									if(json.validateAndRegisterUserResult == true){
										//alert("Todos tus amigos de facebook que ya esten en DameUnAventon han sido agregados a tu red de aventones, si deseas eliminar a alguien lo puedes hacer a continuacion en la opción Tus Amigos. ");
										//getDuaFriends();
										$.mobile.changePage('#page7',{transition: 'slidedown'});
									}
								   }
				});
				$.mobile.changePage('#page7',{transition: 'slidedown'});
			}
			
            function getLoginStatus() {
                FB.getLoginStatus(function(response) {
                                  if (response.status == 'connected') {
                                  alert('logged in');
                                  } else {
                                  alert('not logged in');
                                  }
                                  });
            }
            var friendIDs = [];
			
			
            function getFriendsFB() {
			
				//Check internet connection
				var networkState = navigator.network.connection.type;
				if (networkState == Connection.UNKNOWN || networkState == Connection.NONE){
					alert("No hay conexion a internet, intenta de nuevo!");
					$(location).attr('href',"#loginPage");
					return;
				}
			 
			    navigator.notification.activityStart();
				$('#friendsList').empty();
                FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
                       if (response.error) {
					       alert(JSON.stringify(response.error));
                       } else {
						   response.data.forEach(function(item) {
								$('#friendsList').append('<li><a>' +
								'<img src="' + item.picture + '"/>' +
								//'<input type="checkbox" name="'+ item.id +'"/>' 
								'<h4>' + item.name + '</h4>' +
								'<p>' + item.name + '</p></a></li>');
								}
							);
							$('#friendsList').listview('refresh');
							navigator.notification.activityStop();
                       }

                       });
            }
            
            function logout() {
                FB.logout(function(response) {
                          alert('logged out');
                          });
				navigator.app.exitApp();
            }
            

			
			function loadNotifications(){
			
				//Check internet connection
				var networkState = navigator.network.connection.type;
				if (networkState == Connection.UNKNOWN || networkState == Connection.NONE){
					alert("No hay conexion a internet, intenta de nuevo!");
					$(location).attr('href',"#loginPage");
					return;
				}
			    //navigator.notification.activityStart();
				//*D console.log('Entro a loadNotifications');
				$('#personalNotif').children().remove('li');
				$('#friendsNotif').children().remove('li');
				
				//$("#friendsNotif").listview();
				$(".ui-li-count.ui-btn-up-c.ui-btn-corner-all.a").text("0");
				$(".ui-li-count.ui-btn-up-c.ui-btn-corner-all.b").text("0");
				var str_url_per="http://www.dameunaventon.com/duaservice/DameUnAventonServices.svc/json/Notifications/getPendingNotifications/"+window.localStorage.getItem('fbUserId');
				var str_url_pub="http://www.dameunaventon.com/duaservice/DameUnAventonServices.svc/json/Notification/getFriendsActivity/"+window.localStorage.getItem('fbUserId');
				//*D console.log("str_url_per-->" + str_url_per);
				//*D console.log("str_url_pub-->" + str_url_pub);
				try{
				//llamar al servicio que trae notificaciones personales pendientes
							$.ajax({ url: str_url_per
									, jsonpCallback: "getPendPerNotifCallback"
									, async: false
									, type: "GET"
									, dataType: "jsonp"
							}); 
				//llamar al servicio que trae notificaciones publicas pendientes
							$.ajax({ url: str_url_pub
									, jsonpCallback: "getPendPublicNotifCallback"
									, async: false
									, type: "GET"
									, dataType: "jsonp"
							});				
				}
				catch(err){
					alert(err.message);
				}
				//navigator.notification.activityStop();
			}
			
			function getPendPerNotifCallback(json){
			 //recorre y renderiza las notificaciones
			 //*D console.log("entro a getPendPerNotifCallback");
			 //window.localStorage.setItem("perNotifCount",json.getPendingNotificationsResult.length + window.localStorage.getItem("perNotifCount"));
			 json.getPendingNotificationsResult.forEach(function(item) {				
						switch (item.idEvent + '-' + item.idEventType)
									{
									case '10-2':
									  renderAcepAmistad(item);
									  break;
									case '13-2':
									  renderAcepPeticionAventon(item);
									  break;
									case '14-2':
									  renderAcepOfrecAventon(item);
									  break;
									} 
								}
							);


			}
			
			function getPendPublicNotifCallback(json){
			//recorre y renderiza las notificaciones
			//*D console.log("entro a getPendPublicNotifCallback");
			//window.localStorage.setItem("pubNotifCount",json.getFriendsActivityResult.length);
			json.getFriendsActivityResult.forEach(function(item) {		
                        //*D console.log("********" + item.Date);
                        if(item.Unread==true){					
							        switch (item.idEvent + '-' + item.idEventType)
									{
										case '2-1':
										  renderAcepAmistadPubl(item);
										  break;
										case '3-1':
										  renderPeticionAventonPubl(item);
										  break;
										case '4-1':
										  renderOfrecAventonPubl(item);
										  break;
										case '5-1':
										  renderAcepPetAventPubl(item);
										  break;
										case '6-1':
										  renderAceptOfrecAventPubl(item);
										  break;
									} 
						}
					}
				);

			}
			
			function facebookWallPost(mensaje) {
			
				//Check internet connection
				var networkState = navigator.network.connection.type;
				if (networkState == Connection.UNKNOWN || networkState == Connection.NONE){
					alert("No hay conexion a internet, intenta de nuevo!");
					$(location).attr('href',"#loginPage");
					return;
				}
				
			    //*D console.log('facebookWallPost');
				var params = {
					message: mensaje,
				    method: 'stream.publish',
				    name: 'Dame un aventon!',
				    // link: 'www.dameunaventon.com/Friends/Pending?userId=' + window.localStorage.getItem("fbUserId"),
					link: 'www.dameunaventon.com',
				    //picture: 'http://fbrell.com/f8.jpg',
				    //caption: 'Reference Documentation',
				    //description: 'Nueva aplicacion.'
				  };
				//console.log(params);
			    //FB.ui(params, function(obj) { console.log(obj);});
				FB.api('/me/feed', 'post', params, function(response) {
				  if (!response || response.error) {
				  //*D	console.log('Error posteando automaticamente');
				  } else {
					//*D console.log('Has posteado en FaceBook acerca de DameUnAventon: ' + response);
				  }
				 });     
			}
			
			function facebookInboxPost() {
			
				//Check internet connection
				var networkState = navigator.network.connection.type;
				if (networkState == Connection.UNKNOWN || networkState == Connection.NONE){
					alert("No hay conexion a internet, intenta de nuevo!");
					$(location).attr('href',"#loginPage");
					return;
				}
			    //*D console.log('facebookWallPost');
				var params = {
					message: 'Únete a mi red en dame un aventon',
				    method: 'send',
				    name: 'Dame un aventon!',
				    link: 'www.dameunaventon.com/Friends/Pending?userId=' + window.localStorage.getItem("fbUserId"),
					to: window.localStorage.getItem("fbUserId"),
				    //picture: 'http://fbrell.com/f8.jpg',
				    caption: 'Reference Documentation',
				    //description: 'Nueva aplicacion.'
				  };
				//console.log(params);
			    //FB.ui(params, function(obj) { console.log(obj);});
				FB.api('/me/feed', 'post', params, function(response) {
				  if (!response || response.error) {
					alert('Error posteando automaticamente');
				  } else {
					alert('Has invitado a tus amigos a DameUnAventon: ' + response);
				  }
				 });     
			}
            
			function publishStoryFriend() {
			
				//Check internet connection
				var networkState = navigator.network.connection.type;
				if (networkState == Connection.UNKNOWN || networkState == Connection.NONE){
					alert("No hay conexion a internet, intenta de nuevo!");
					$(location).attr('href',"#loginPage");
					return;
				}
				randNum = Math.floor ( Math.random() * friendIDs.length ); 

				var friendID = friendIDs[randNum];
				if (friendID == undefined){
					alert('please click the me button to get a list of friends first');
				}else{
			    	//*D console.log("friend id: " + friendID );
			        //*D console.log('Opening a dialog for friendID: ', friendID);
			        var params = {
			        	method: 'feed',
			            to: friendID.toString(),
			            name: 'Facebook Dialogs',
			            link: 'https://developers.facebook.com/docs/reference/dialogs/',
			            picture: 'http://fbrell.com/f8.jpg',
			            caption: 'Reference Documentation',
			            description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
			     	};
					FB.ui(params, function(obj) { //*D console.log(obj);
					});
			    }
			}
			
			function mapa(){
				window.location.replace('map.html');
			}
			
			function pedirAv(){
			
				//Check internet connection
				var networkState = navigator.network.connection.type;
				if (networkState == Connection.UNKNOWN || networkState == Connection.NONE){
					alert("No hay conexion a internet, intenta de nuevo!");
					$(location).attr('href',"#loginPage");
					return;
				}		
				//*D console.log('Entro a pedirAventon: ' + "http://www.dameunaventon.com/duaservice/DameUnAventonServices.svc/json/Ride/requestRide?startingVenue="+$('#origenPA').val()+"&startingPoint="+window.localStorage.getItem('llOrigenPA')+"&endingVenue="+$('#destinoPA').val()+"&endPoint="+window.localStorage.getItem('llDestinoPA')+"&dateTime="+$("#fechaPA").val()+"&friendsList=null"+"&idUserRequesting="+window.localStorage.getItem('fbUserId'));
				
				if($('#origenPA').val()=="" ||   $('#destinoPA').val()=="" ||  $("#fechaPA").val()==""){
				  alert("Debes ingresar todos los campos!");
				  return;
				}
				navigator.notification.activityStart();
				var str_url="http://www.dameunaventon.com/duaservice/DameUnAventonServices.svc/json/Ride/requestRide?startingVenue="+$('#origenPA').val()+"&startingPoint="+window.localStorage.getItem('llOrigenPA')+"&endingVenue="+$('#destinoPA').val()+"&endPoint="+window.localStorage.getItem('llDestinoPA')+"&dateTime="+$("#fechaPA").val()+"&friendsList=null"+"&idUserRequesting="+window.localStorage.getItem('fbUserId');
				str_url=str_url.replace(/#/g,"%23");
				try{
				//*D console.log("va a pedir...");
							$.ajax({ url: str_url
									, jsonpCallback: "pedirAvCallback"
									, async: false
									, type: "GET"
									, dataType: "jsonp"
							}); 	
				}
				catch(err){
					alert(err.message);
					navigator.notification.activityStop();
				}
			}
			
			function pedirAvCallback(json){
				  //*D console.log("El usuario pidio un aventon");
				  $(location).attr('href',"#home");
				  $('#origenPA').val("");
				  $('#destinoPA').val("");
				  $("#fechaPA").val("");
				  navigator.notification.activityStop();
				  alert("Has pedido un aventon");
				  facebookWallPost('Quiero mejorar la movilidad y ayudar al medio ambiente en mi ciudad. He pedido un aventon en DameUnAventon! Hazlo tu tambien!');
				  //alert(json.offerRideResult);
			}
			
			function darAv(){	
				//Check internet connection
				var networkState = navigator.network.connection.type;
				if (networkState == Connection.UNKNOWN || networkState == Connection.NONE){
					alert("No hay conexion a internet, intenta de nuevo!");
					$(location).attr('href',"#loginPage");
					return;
				}
				//*D console.log('Entro a ofrecerAventon: ' + "http://www.dameunaventon.com/duaservice/DameUnAventonServices.svc/json/Ride/requestRide?startingVenue="+$('#origenDA').val()+"&startingPoint="+window.localStorage.getItem('llOrigenDA')+"&endingVenue="+$('#destinoDA').val()+"&endPoint="+window.localStorage.getItem('llDestinoDA')+"&dateTime="+$("#fechaDA").val()+"&friendsList=null"+"&idUserRequesting="+window.localStorage.getItem('fbUserId'));
				if($('#origenDA').val()=="" ||   $('#destinoDA').val()=="" ||  $("#fechaDA").val()==""){
				 alert("Debes ingresar todos los campos!");
				 return;
				}
				navigator.notification.activityStart();
				var str_url="http://www.dameunaventon.com/duaservice/DameUnAventonServices.svc/json/Ride/offerRide?startingVenue="+$('#origenDA').val()+"&startingPoint="+window.localStorage.getItem('llOrigenDA')+"&endingVenue="+$('#destinoDA').val()+"&endPoint="+window.localStorage.getItem('llDestinoDA')+"&dateTime="+$("#fechaDA").val()+"&friendsList=null"+"&idUserRequesting="+window.localStorage.getItem('fbUserId');
				str_url=str_url.replace(/#/g,"%23");
				try{
							$.ajax({ url: str_url
									, jsonpCallback: "darAvCallback"
									, async: false
									, type: "GET"
									, dataType: "jsonp"
							}); 	
				}
				catch(err){
					alert(err.message);
					navigator.notification.activityStop();
				}
			}
			
			function darAvCallback(json){
				  //*D console.log("El usuario ofrecio un aventon");
				  $(location).attr('href',"#home");
				  $('#origenDA').val("");
				  $('#destinoDA').val("");
				  $("#fechaDA").val("");
				  navigator.notification.activityStop();
				  alert("Has ofrecido un aventon");
				  //alert(json.offerRideResult);
				  facebookWallPost('Quiero mejorar la movilidad y ayudar al medio ambiente en mi ciudad. He ofrecido un aventon en DameUnAventon! Hazlo tu tambien');
				                                                                                            
			}
				
			function getDuaFriends(){
				//Check internet connection
				var networkState = navigator.network.connection.type;
				if (networkState == Connection.UNKNOWN || networkState == Connection.NONE){
					alert("No hay conexion a internet, intenta de nuevo!");
					$(location).attr('href',"#loginPage");
					return;
				}
				navigator.notification.activityStart();
				//*D console.log('entro a getFriends');
				$('#duaFriendsList').empty();
                $.ajax({
						type: "GET",
						url: "http://www.dameunaventon.com/duaservice/DameUnAventonServices.svc/json/Account/getFriendsList/" + window.localStorage.getItem("fbUserId"),
						dataType: "jsonp",
						jsonpCallback: "duaFriendsJsonpCallback",
						async: false
				});
			}
			
			function duaFriendsJsonpCallback(json) {
				$('#duaFriendsList').empty();
			   if (json.error) {
				   //*D console.log(JSON.stringify(json.error));
				   navigator.notification.activityStop();
			   } else {
				   $.each(json.getFriendsListResult,(function(i,item) {
						$('#duaFriendsList').append('<li><a data-ajax="false" id="' + item.AuthKey + '" href="#friendsDetailsPage" onclick=getUserDetails(this.id)>' +
						'<img src="' + item.PhotoURL + '"/>' +
						//'<input type="checkbox" name="'+ item.id +'"/>' 
						'<h4>' + item.Nickname + '</h4>' +
						'<p>' + item.Name + '</p></a></li>');
						}
					));
					if ($('#duaFriendsList').children().length > 0){
						$('#duaFriendsList').listview('refresh'); 
					}
				navigator.notification.activityStop();					
			   }
			}
            
			function getUserDetails(userId){
			
				//Check internet connection
				var networkState = navigator.network.connection.type;
				if (networkState == Connection.UNKNOWN || networkState == Connection.NONE){
					alert("No hay conexion a internet, intenta de nuevo!");
					$(location).attr('href',"#loginPage");
					return;
				}
				//*D console.log('entro a getUserDetails con id:' + userId);
				//alert('entro a getUserDetails con id:' + userId);	
				
				$('#userPic').attr("src",null);
				$('#fullName').text("");
				$('#email').text("");
				$('#other').text("");
				
				window.localStorage.setItem("actualFriendId", userId);
				
                $.ajax({
						type: "GET",
						url: "http://www.dameunaventon.com/duaservice/DameUnAventonServices.svc/json/Account/getFullProfile/" + userId,
						dataType: "jsonp",
						jsonpCallback: "userDetailsJsonpCallback",
						async: false
				});
			}
			
			function userDetailsJsonpCallback(json){
			   $('#userPic').attr("src",json.getFullProfileResult[1].PhotoURL);
			   $('#fullName').text(json.getFullProfileResult[1].Name);
			   $('#email').text(json.getFullProfileResult[1].eMail);
			   $('#other').text("Conductor: " +json.getFullProfileResult[1].Driver + " Pasajero: " + json.getFullProfileResult[1].Passenger);
				
				window.localStorage.setItem("actualFriendName",json.getFullProfileResult[1].Name);
				    
					$.each(json.getFullProfileResult,(function(i,item) {
					    var fecha = new Date(parseInt(item.Date.substr(6)));
						$('#duaFriendEventsList').append('<li>' +
						  '<h4>' + item.EventDescription + '</h4>' +
						  '<p> Hecho por: ' + item.SourceUser_Name + '</p>' +
						  '<p> Aceptado por: ' + item.DestinationUser_Name + '</p>' +
						  '<p> Fecha: ' + fecha.toDateString() + '</p>' +
						'</li>');
						}
					));
					
				$('#duaFriendEventsList').listview('refresh'); 
			}
			
			function selectVenueOrigenPA(venueName,venueLocation,locLatLng){
				if(venueLocation=="undefined"){
					venueLocation=venueLocation.replace("undefined"," ");
				}
				$('#origenPA').val(venueName+', '+venueLocation);
				window.localStorage.setItem("llOrigenPA", locLatLng);
				$.mobile.sdCurrentDialog.close();
			}
			
			function selectVenueDestinoPA(venueName,venueLocation,locLatLng){
				if(venueLocation=="undefined"){
					venueLocation=venueLocation.replace("undefined"," ");
				}
				$('#destinoPA').val(venueName+', '+venueLocation);
				window.localStorage.setItem("llDestinoPA", locLatLng);
				$.mobile.sdCurrentDialog.close();
			}
			
			function selectVenueOrigenDA(venueName,venueLocation,locLatLng){
				if(venueLocation=="undefined"){
					venueLocation=venueLocation.replace("undefined"," ");
				}
				$('#origenDA').val(venueName+', '+venueLocation);
				window.localStorage.setItem("llOrigenDA", locLatLng);
				$.mobile.sdCurrentDialog.close();
			}
			
			function selectVenueDestinoDA(venueName,venueLocation,locLatLng){
				if(venueLocation=="undefined"){
					venueLocation=venueLocation.replace("undefined"," ");
				}
				$('#destinoDA').val(venueName+', '+venueLocation);
				window.localStorage.setItem("llDestinoDA", locLatLng);
				$.mobile.sdCurrentDialog.close();
			}
			
			function onSuccessGetLL(position){
				window.localStorage.setItem("userCurrentLatitude",position.coords.latitude);
				window.localStorage.setItem("userCurrentLongitude",position.coords.longitude);
			}
			
			function onErrorGetLL(error){
				//*D console.log(error);
				alert('No se pudo hallar la ubicacion, se utilizará una por defecto');
			}
			
			
			 			
			function getNearVenuesOrigen(){
			
				//*D console.log('entro a getNearVenues');
				//navigator.notification.activityStart();
				//Check internet connection
				
				/*var networkState = navigator.network.connection.type;
				if (networkState == Connection.UNKNOWN || networkState == Connection.NONE){
					alert("No hay conexion a internet, intenta de nuevo!");
					$(location).attr('href',"#loginPage");
					return;
				}*/
				
				navigator.geolocation.getCurrentPosition(onSuccessGetLL, onErrorGetLL);
                
				var html_text = '<div><ul id="dialogList1" name="dialogList1">';
				try{
				$.getJSON('https://api.foursquare.com/v2/venues/search?ll=' + window.localStorage.getItem("userCurrentLatitude") + "," +
				                                                              window.localStorage.getItem("userCurrentLongitude") +'&client_id=2POUFAUU4ZBJ2MTDOY3S2YHR2NIT52FYW0LUTPHBMNTJFJNQ&client_secret=YFDZI1YWV3ZI5S5SPM2DZJEQIEBPIDJ5XFZBWTIKIQZVQNYM&v=20120101' + '&query=' +  $('#origenPA').val(),
					function(data) {
						$.each(data.response.venues, function(i,venue){
							html_text = html_text + '<li><a rel="'+venue.location.lat+'|'+venue.location.lng+'" id="'+venue.name+'" name="'+ venue.location.address +'" onClick="selectVenueOrigenPA(this.id,this.name,this.rel)"><h4>' + venue.name + '</h4>' +
							                         '<p>'+ venue.location.address + '</p></a></li>';
					   });		   
					   $('<div>').simpledialog2({
								mode: 'blank',
								headerText: 'Origen:',
								headerClose: false,
								dialogForce: true,
								blankContent: 
								  html_text + '</ul></div>'
							});
						$('#dialogList1').listview();
						//navigator.notification.activityStop();						
				});	
				}
				catch(err){
					//*D console.log(err.message);   
				}

			}
			
			function getNearVenuesDestino(){
				//*D console.log('entro a getNearVenues');
				//navigator.notification.activityStart();
				
				//Check internet connection
				/*var networkState = navigator.network.connection.type;
				if (networkState == Connection.UNKNOWN || networkState == Connection.NONE){
					alert("No hay conexion a internet, intenta de nuevo!");
					$(location).attr('href',"#loginPage");
					return;
				}*/
				
				navigator.geolocation.getCurrentPosition(onSuccessGetLL, onErrorGetLL);
				var html_text = '<div><ul id="dialogList2" name="dialogList2">';
				try{
				$.getJSON('https://api.foursquare.com/v2/venues/search?ll=' + window.localStorage.getItem("userCurrentLatitude") + "," +
				                                                              window.localStorage.getItem("userCurrentLongitude") + '&client_id=2POUFAUU4ZBJ2MTDOY3S2YHR2NIT52FYW0LUTPHBMNTJFJNQ&client_secret=YFDZI1YWV3ZI5S5SPM2DZJEQIEBPIDJ5XFZBWTIKIQZVQNYM&v=20120101' + '&query=' +  $('#destinoPA').val(),
				function(data) {
						$.each(data.response.venues, function(i,venue){
							html_text = html_text + '<li><a rel="'+venue.location.lat+'|'+venue.location.lng+'" id="'+venue.name+'" name="'+ venue.location.address +'" onClick="selectVenueDestinoPA(this.id,this.name,this.rel)"><h4>' + venue.name + '</h4>' +
							                         '<p>'+ venue.location.address + '</p></a></li>';
					   });		   
					   $('<div>').simpledialog2({
								mode: 'blank',
								headerText: 'Destino:',
								headerClose: false,
								dialogForce: true,
								blankContent: 
								  html_text + '</ul></div>'
							});
						$('#dialogList2').listview(); 
						//navigator.notification.activityStop();
				});
				}
				catch(err){alert(err.message);}

			}
			
			function getNearVenuesOrigenDA(){
			    navigator.notification.activityStart();
				//Check internet connection
				var networkState = navigator.network.connection.type;
				if (networkState == Connection.UNKNOWN || networkState == Connection.NONE){
					alert("No hay conexion a internet, intenta de nuevo!");
					$(location).attr('href',"#loginPage");
					return;
				}
			    navigator.geolocation.getCurrentPosition(onSuccessGetLL, onErrorGetLL);
				//*D console.log('entro a getNearVenues');
				var html_text = '<div><ul id="dialogList3" name="dialogList3">';
				try{
				$.getJSON('https://api.foursquare.com/v2/venues/search?ll=' + window.localStorage.getItem("userCurrentLatitude") + "," +
				                                                              window.localStorage.getItem("userCurrentLongitude") + '&client_id=2POUFAUU4ZBJ2MTDOY3S2YHR2NIT52FYW0LUTPHBMNTJFJNQ&client_secret=YFDZI1YWV3ZI5S5SPM2DZJEQIEBPIDJ5XFZBWTIKIQZVQNYM&v=20120101' + '&query=' +  $('#origenDA').val(),
					function(data) {
						$.each(data.response.venues, function(i,venue){
							html_text = html_text + '<li><a rel="'+venue.location.lat+'|'+venue.location.lng+'" id="'+venue.name+'" name="'+ venue.location.address +'" onClick="selectVenueOrigenDA(this.id,this.name,this.rel)"><h4>' + venue.name + '</h4>' +
							                         '<p>'+ venue.location.address + '</p></a></li>';
					   });		   
					   $('<div>').simpledialog2({
								mode: 'blank',
								headerText: 'Escoje el destino:',
								headerClose: false,
								dialogForce: true,
								blankContent: 
								  html_text + '</ul></div>'
							});
						$('#dialogList3').listview(); 
				        navigator.notification.activityStop();
				});	
				}
				catch(err){alert(err.message);}
			}
			
			function getNearVenuesDestinoDA(){
			    navigator.notification.activityStart();
				//Check internet connection
				var networkState = navigator.network.connection.type;
				if (networkState == Connection.UNKNOWN || networkState == Connection.NONE){
					alert("No hay conexion a internet, intenta de nuevo!");
					$(location).attr('href',"#loginPage");
					return;
				}
			    navigator.geolocation.getCurrentPosition(onSuccessGetLL, onErrorGetLL);
				//*D console.log('entro a getNearVenues');
				var html_text = '<div><ul id="dialogList4" name="dialogList4">';
				try{
				$.getJSON('https://api.foursquare.com/v2/venues/search?ll=' + window.localStorage.getItem("userCurrentLatitude") + "," +
				                                                             window.localStorage.getItem("userCurrentLongitude") + '&client_id=2POUFAUU4ZBJ2MTDOY3S2YHR2NIT52FYW0LUTPHBMNTJFJNQ&client_secret=YFDZI1YWV3ZI5S5SPM2DZJEQIEBPIDJ5XFZBWTIKIQZVQNYM&v=20120101' + '&query=' +  $('#destinoDA').val(),
					function(data) {
						$.each(data.response.venues, function(i,venue){
							html_text = html_text + '<li><a rel="'+venue.location.lat+'|'+venue.location.lng+'" id="'+venue.name+'" name="'+ venue.location.address +'" onClick="selectVenueDestinoDA(this.id,this.name,this.rel)"><h4>' + venue.name + '</h4>' +
							                         '<p>'+ venue.location.address + '</p></a></li>';
					   });		   
					   $('<div>').simpledialog2({
								mode: 'blank',
								headerText: 'Escoje el destino:',
								headerClose: false,
								dialogForce: true,
								blankContent: 
								  html_text + '</ul></div>'
							});
						$('#dialogList4').listview(); 
						navigator.notification.activityStop();
				});	
				}
				catch(err){alert(err.message);}
			}		
	
			function deleteDuaFriend(){
			            showConfirmDeleteDuaFriend();
						//*D console.log('entro a deleteDuaFriend');			
			}
			
			function showConfirmDeleteDuaFriend() {
				navigator.notification.confirm(
					'Deseas eliminar a este amigo de DameUnAventon?',  // message
					onConfirmDelete,              // callback to invoke with index of button pressed
					'Aviso',            // title
					'Ok,Cancelar'          // buttonLabels
				);
			}
			
			function onConfirmDelete(button){
				//Check internet connection
				//*D console.log("entro a onConfirmDelete: " + button);
				if (button==1){
				    //*D console.log("presionaron Ok");
					var networkState = navigator.network.connection.type;
					if (networkState == Connection.UNKNOWN || networkState == Connection.NONE){
						alert("No hay conexion a internet, intenta de nuevo!");
						$(location).attr('href',"#loginPage");
						return;
					}
							$.ajax({
									type: "GET",
									url: "http://www.dameunaventon.com/duaservice/DameUnAventonServices.svc/json/Friends/DeleteFriendship/" + window.localStorage.getItem("fbUserId") + "/" + window.localStorage.getItem("actualFriendId"),
									dataType: "jsonp",
									jsonpCallback: "duaFriendDelJsonpCallback",
									async: false
							});
				}

			}
						
			function duaFriendDelJsonpCallback(){
			
				getDuaFriends();
				window.location.href = "#duaFriendsListPage";
				alert("Se elimino a " + window.localStorage.getItem("actualFriendName") + " de tu grupo de amigos.");
			}
			
	function perNotifTabClicked(){
	
		//*D console.log("entro a perNotifTabClicked");
		//Check internet connection
		var networkState = navigator.network.connection.type;
		if (networkState == Connection.UNKNOWN || networkState == Connection.NONE){
			alert("No hay conexion a internet, intenta de nuevo!");
			$(location).attr('href',"#loginPage");
			return;
		}
		
		$(".ui-li-count.ui-btn-up-c.ui-btn-corner-all.a").text("0");
		try{
			$("#personalNotif").trigger('create');
			$("#personalNotif").listview('refresh');
		}
		catch(err){ //*D console.log(err);
		}
		var sIdEventLogArray = "";
		$("#personalNotif").find("li").each(function(){ 
													   sIdEventLogArray= sIdEventLogArray + this.id + "-"; 
													  }
										    );
		//*D console.log(sIdEventLogArray);									
		var str_url="http://www.dameunaventon.com/duaservice/DameUnAventonServices.svc/json/Notification/markNotificationAsRead?idEventLogArray=" + sIdEventLogArray;
		console.log(str_url);
		//Notification/markNotificationsAsRead/{sIdEventLogArray}
			$.ajax({ url: str_url
					, async: false
					, type: "GET"
					, dataType: "jsonp"
					, success: "pubNotifTabClicked" 
			});
	}
	
	function pubNotifTabClicked(){
	
		//*D console.log("entro a pubNotifTabClicked");
		try{
			$("#friendsNotif").trigger('create');
			$("#friendsNotif").listview('refresh');
		}
		catch(err){ //*D console.log(err);
		}
	}
	
	function myRidesTabClicked(){
	    
		//navigator.notification.activityStart();
		//*D console.log("entro a myRidesTabClicked");
		//Check internet connection
		var networkState = navigator.network.connection.type;
		if (networkState == Connection.UNKNOWN || networkState == Connection.NONE){
			alert("No hay conexion a internet, intenta de nuevo!");
			$(location).attr('href',"#loginPage");
			return;
		}
		
		var str_url_myrides="http://www.dameunaventon.com/duaservice/DameUnAventonServices.svc/json/ride/UserRides/"+window.localStorage.getItem('fbUserId');
		//*D console.log("str_url_myrides-->" + str_url_myrides);
		try{
			//llamar al servicio que trae notificaciones personales pendientes
				$.ajax({ url: str_url_myrides
						, jsonpCallback: "getMyRides"
						, async: false
						, type: "GET"
						, dataType: "jsonp"
				}); 

		}
		catch(err){
					alert(err.message);
					//navigator.notification.activityStop();
		}
		//navigator.notification.activityStop();
	}
	
	function getMyRides(json){
	
	    $('#ridesNotif').children().remove('li');
		
    	json.UserRidesResult.forEach(function(data) {		
            
			var notifications = $("#ridesNotif");
			var fecha = new Date(parseInt(data.Date.substr(6))); //TODO: arreglar problema de fechas
			var estado;
				
            
			if (data.idEvent==3){
                //*D  console.log("");
				if(data.Taken==true){
					 estado= "Aceptado por: " + data.DriverUser_Name; 
				}  else{
				 estado= "En espera de usuarios.";
				}
				var notification = '<li id="' + data.idRide + '"><img src="' + data.PassengerUser_PhotoURL + '"/>' +
																 '<div class="notifTitle"> Peticion de Aventon </div><div class="notifMessage"> Desde: ' + data.SourceVenue + ' Hasta: '+ data.DestinationVenue +'. </div>' +
																 '<div class="notifBody">'+ estado +'</div><div>'+ fecha.toDateString() +'</div>' +
									'</li>';
			}
			else {
			
				if(data.Taken==true){
					 estado= "Aceptado por: " + data.PassengerUser_Name; 
				}  else{
				 estado= "En espera de usuarios.";
				}
				var notification = '<li id="' + data.idRide + '"><img src="' + data.DriverUser_PhotoURL + '"/>' +
																 '<div class="notifTitle"> Ofrecimiento de Aventon </div><div class="notifMessage"> Desde: ' + data.SourceVenue + ' Hasta: '+ data.DestinationVenue +'. </div>' +
																 '<div class="notifBody">' + estado + '</div><div>'+ fecha.toDateString() +'</div>' +
									'</li>';
			}
			
			//adding notification to personal notifications control
			if ($("#ridesNotif").children().length < 1) {
				$("#ridesNotif").append(notification);
			}
			else {
				$("#ridesNotif").children().first().before(notification);
			}        			
		}
		);
	
		try{
			$("#ridesNotif").trigger('create');
			$("#ridesNotif").listview('refresh');
		}
		catch(err){
					//*D console.log(err);
					//navigator.notification.activityStop();
		}
	}
			
	function loadPusher() {
  	
		Pusher.log = function( msg ) {
		if( window.console && window.console.log ) {
				window.console.log( msg );
				}	
		};
		
		// Connect
		var pusher = new Pusher('c1c5e53e2c8e5295a772');
		pusher.connection.bind('state_change', connectionStateChange);
		
		function connectionStateChange(state) {
			//*D console.log(state.current);
		}
		
		// Subscribe
		var channel = pusher.subscribe('user-' + window.localStorage.getItem("fbUserId"));
		channel.bind('pusher:subscription_succeeded', subscriptionSucceeded);
		
		function subscriptionSucceeded() {
			//*D console.log("subscriptionSucceeded");
		}
		
		channel.bind('rides', ridesHandler);
		
		function ridesHandler( data ) {
			// notificacion en el status bar de Android
			window.plugins.statusBarNotification.notify("Dame un aventon", JSON.stringify(data, null, 2));
			$('#eventList_dua').append('<li><a id="' + JSON.stringify(data, null, 2) + '" onclick=manageEvent(this.id)>' +
						'<img src="http://www.dameunaventon.com/"/>' +
						'<h4>' + JSON.stringify(data, null, 2) + '</h4>' +
						'<p>' + JSON.stringify(data, null, 2) + '</p></a></li>');
			$('#eventList_dua').listview(); 
		}
		
		//PersonalNotifications///////////////////////////////////////////////////////
		
		//Notificacion de Aceptacion de amistad
		channel.bind('10-2', renderAcepAmistad);
		
		//Notificacion de Aceptacion de peticion de aventon
		channel.bind('13-2', renderAcepPeticionAventon);
		
		//Notificacion de Aceptacion de ofrecimiento de aventon
		channel.bind('14-2', renderAcepOfrecAventon);
		
		//FriendsNotifications///////////////////////////////////////////////
		
		//Aceptacion de amistad
		channel.bind('2-1', renderAcepAmistadPubl);
		
		//Peticion de aventon
		channel.bind('3-1', renderPeticionAventonPubl);
		
		//Ofrecimiento de aventon
		channel.bind('4-1', renderOfrecAventonPubl);
		
		//Aceptacion de peticion de aventon
		channel.bind('5-1', renderAcepPetAventPubl);
		
		//Aceptacion de ofrecimiento de aventon
		channel.bind('6-1', renderAceptOfrecAventPubl);
		
  }
  
  var tempEventid = "";
  
  function aceptarPeticionAventon(eventId){
	//*D console.log("entro a aceptarPeticionAventon con: " + eventId);
	//Check internet connection
	var networkState = navigator.network.connection.type;
	if (networkState == Connection.UNKNOWN || networkState == Connection.NONE){
		alert("No hay conexion a internet, intenta de nuevo!");
		$(location).attr('href',"#loginPage");
		return;
	}
	//Ride/AcceptRideRequest/{sIdUserAccepting}/{sIdRide}
	var str_url="http://www.dameunaventon.com/duaservice/DameUnAventonServices.svc/json/Ride/AcceptRideRequest/" + window.localStorage.getItem("fbUserId") + "/" + eventId;
	tempEventid = eventId;
	//*D console.log("str_url-->" + str_url);
		$.ajax({ url: str_url
				, jsonpCallback: "aceptarPeticionAventonCallback"
				, async: false
				, type: "GET"
				, dataType: "jsonp"
		}); 
  }
  
  function aceptarPeticionAventonCallback(result){

		alert(result.AcceptRideRequestResult);
		$("#friendsNotif").children('li#' + tempEventid).append('<div>'+ result.AcceptRideRequestResult +'</div>');	
		$("#btn-" + tempEventid).remove();
		//*D console.log('--->' + result.AcceptRideRequestResult.substring(0,2));
		if (result.AcceptRideRequestResult.substring(0,2) != 'Lo' &&  result.AcceptRideRequestResult.substring(0,2) != 'Re'){
		  //*D console.log("adentro");
		  facebookWallPost('Quiero mejorar la movilidad y ayudar al medio ambiente en mi ciudad. He aceptado dar un aventon en DameUnAventon! Hazlo tu tambien!');
		}                                                                                     
	
  }
  
  function aceptarOfrecAventon(eventId){
	//Ride/AcceptRideOffer/{sIdUserAccepting}/{sIdRide}
	//*D console.log("entro a aceptarOfrecAventon con: " + eventId);
	//Check internet connection
	var networkState = navigator.network.connection.type;
	if (networkState == Connection.UNKNOWN || networkState == Connection.NONE){
		alert("No hay conexion a internet, intenta de nuevo!");
		$(location).attr('href',"#loginPage");
		return;
	}
	var str_url="http://www.dameunaventon.com/duaservice/DameUnAventonServices.svc/json/Ride/AcceptRideOffer/" + window.localStorage.getItem("fbUserId") + "/" + eventId;
	tempEventid = eventId;
	//*D console.log("str_url-->" + str_url);
		$.ajax({ url: str_url
				, jsonpCallback: "aceptarOfrecAventonCallback"
				, async: false
				, type: "GET"
				, dataType: "jsonp"
		}); 
  }
  
  function aceptarOfrecAventonCallback(result){

		alert(result.AcceptRideOfferResult);
	    $("#friendsNotif").children('li#' + tempEventid).append('<div>' + result.AcceptRideOfferResult + '</div>');
		$("#btn-" + tempEventid).remove();
		//*D console.log('--->' + result.AcceptRideOfferResult.substring(0,2));
		if (result.AcceptRideOfferResult.substring(0,2) != 'Lo' &&  result.AcceptRideOfferResult.substring(0,2) != 'Re'){
		  facebookWallPost('Quiero mejorar la movilidad y ayudar al medio ambiente en mi ciudad. He tomado un aventon en DameUnAventon! Hazlo tu tambien!');
		}                                                                                                   
  }
  
// process the confirmation dialog result
function onConfirm(buttonIndex) {
    //alert('You selected button ' + buttonIndex);
}



function wichPage(p_pageId){
 window.localStorage.setItem("prevPageId",p_pageId);
}

function reverseNav(){
 $.mobile.changePage('#' + window.localStorage.getItem("prevPageId"),{transition: 'slide'});
}

// Android / BlackBerry WebWorks (OS 5.0 and higher) / iPhone
//
function alertDismissed() {
    // do something
}

function showAlert(message, title, buttonName) {
	navigator.notification.alert(
		message,  // message
		alertDismissed,         // callback
		title,            // title
		buttonName                  // buttonName
	);
}

function spanishDate(){
	var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
	var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
	var f=new Date();
	document.write(diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());
}
	