		//PersonalNotifications///////////////////////////////////////////////////////
		// /Date(1355072400000-0800)/
		//Notificacion de creacion automatica de amistad
		function renderAcepAmistad(data) {
			//var notifications = $("#personalNotif");
			var fecha = new Date(parseInt(data.Date.substr(6))); //TODO: arreglar problema de fechas
			$(".ui-li-count.ui-btn-up-c.ui-btn-corner-all.a").text(parseInt($("#countBPerNotif").text()) + 1);
			var notification = '<li id="' + data.idEventLog + '"><img src="' + data.SourceUser_PhotoURL + '"/>' +
														     '<div class="notifTitle">' + data.SourceUser_Name + '</div><div class="notifMessage">' + data.EventDescription + '</div>' +
															 '<div class="notifBody">' + data.SourceUser_Name + ' ha ingresado a DameUnAventon y ahora hace parte de tu red.</div><div>'+ fecha.toDateString() +'</div>' +
								'</li>';
			//adding notification to personal notifications control
			if ($("#personalNotif").children().length < 1) {
				$("#personalNotif").append(notification);
			}
			else {
				$("#personalNotif").children().first().before(notification);
			}
		}
		
		//Notificacion de Aceptacion de peticion de aventon
		function renderAcepPeticionAventon(data) {
			
			//var notifications = $("#personalNotif");
			var fecha = new Date(parseInt(data.Date.substr(6))); //TODO: arreglar problema de fechas
			$(".ui-li-count.ui-btn-up-c.ui-btn-corner-all.a").text(parseInt($("#countBPerNotif").text()) + 1);
			var notification = '<li id="' + data.idEventLog + '"><img src="' + data.SourceUser_PhotoURL + '">' + 
														     '<div class="notifTitle">' + data.SourceUser_Name + '</div><div class="notifMessage">' + data.EventDescription + '</div>' +
															 '<div class="notifBody">' + data.SourceUser_Name + ' ha aceptado darte un aventon desde ' + data.SourceVenue + ' hasta ' + data.DestinationVenue + '. </div><div>'+ fecha.toLocaleString().substring(0,21)  +'</div></img>' +
								'</li>';
			//adding notification to personal notifications control
			if ($("#personalNotif").children().length < 1) {
				$("#personalNotif").append(notification);
			}
			else {
				$("#personalNotif").children().first().before(notification);
			}
		}
		
		//Notificacion de Aceptacion de ofrecimiento de aventon
		function renderAcepOfrecAventon(data) {
			//var notifications = $("#personalNotif");
            var fecha = new Date(parseInt(data.Date.substr(6))); //TODO: arreglar problema de fechas
			$(".ui-li-count.ui-btn-up-c.ui-btn-corner-all.a").text(parseInt($("#countBPerNotif").text()) + 1);
			var notification = '<li id="' + data.idEventLog + '"><img src="' + data.SourceUser_PhotoURL + '">' +
														      '<div class="notifTitle">' + data.SourceUser_Name + '</div><div class="notifMessage">' + data.EventDescription + '</div>' +
															  '<div class="notifBody">' + data.SourceUser_Name + ' quiere participar en el aventon que ofreciste desde ' + data.SourceVenue + ' hasta ' + data.DestinationVenue + '. </div><div>'+ fecha.toLocaleString().substring(0,21)  +'</div></img>' +
							    '</li>';
			//adding notification to personal notifications control
			if ($("#personalNotif").children().length < 1) {
				$("#personalNotif").append(notification);
			}
			else {
				$("#personalNotif").children().first().before(notification);

			}
		}
		
		
		//FriendsNotifications///////////////////////////////////////////////
		
		//Aceptacion de amistad
		function renderAcepAmistadPubl(data) {
		     /*
			//var notifications = $("#friendsNotif");
			var fecha = new Date(parseInt(data.Date.substr(6))); //TODO: arreglar problema de fechas
			$(".ui-li-count.ui-btn-up-c.ui-btn-corner-all.b").text(parseInt($("#countBPerNotif").text()) + 1);
			var notification = '<li id="' + data.idReatedEvent + '"><div class="notifTitle">' + data.EventDescription + '</div><div class="notifMessage">' + data.SourceUser_Name + '</div>' +
															 '<div>' + data.SourceUser_Name + ' ahora es amigo de ' + data.DestinationUser_Name + '</div><div>'+ fecha.toDateString() +'</div>' +
							   '</li>';
			//adding notification to personal notifications control
			if ($("#friendsNotif").children().length < 1) {
				$("#friendsNotif").append(notification);
			}
			else {
				$("#friendsNotif").children().first().before(notification);				
			}*/
		}
		
		//Peticion de aventon
		function renderPeticionAventonPubl(data) {

			//var notifications = $("#friendsNotif");
            data.Date = data.Date.replace('/Date(', '');
			data.Date = data.Date.replace(')/', '');
			var fecha = new Date(parseInt(data.Date) - 10800000); //TODO: arreglar problema de fechas
			$(".ui-li-count.ui-btn-up-c.ui-btn-corner-all.a").text(parseInt($("#countBPerNotif").text()) + 1);
			var notification = '<li id="' + data.idReatedEvent + '"><img src="' + data.SourceUser_PhotoURL + '"/>' + 
															 '<div class="notifTitle">' + data.SourceUser_Name + '<div class="notifMessage">' + data.EventDescription + '</div>' + 
															 '<div class="notifBody"> Desde: ' + data.SourceVenue + '</div><div class="notifBody"> Hasta: ' + data.DestinationVenue + '</div><div class="notifBody"> Cuando: '+ fecha.toLocaleString().substring(0,21) + '</div>' +
															 '<a id="btn-' + data.idReatedEvent + '" data-role="button" onclick="aceptarPeticionAventon('+ data.idReatedEvent +')">Dar este aventon</a></div>' +
								'</li>';
			//adding notification to personal notifications control
			if ($("#personalNotif").children().length < 1) {
				$("#personalNotif").append(notification);
			}
			else {
				$("#personalNotif").children().first().before(notification);
			}
		}
		
		//Ofrecimiento de aventon
		function renderOfrecAventonPubl(data) {

			//var notifications = $("#friendsNotif");
			data.Date = data.Date.replace('/Date(', '');
			data.Date = data.Date.replace(')/', '');
			var fecha = new Date(parseInt(data.Date) - 10800000); //TODO: arreglar problema de fechas
			$(".ui-li-count.ui-btn-up-c.ui-btn-corner-all.a").text(parseInt($("#countBPerNotif").text()) + 1);
			var notification = '<li id="' + data.idReatedEvent + '"><img src="' + data.SourceUser_PhotoURL + '"/>' +
															 '<div class="notifTitle">' + data.SourceUser_Name + '<div class="notifMessage">' + data.EventDescription + '</div>' +
															 '<div class="notifBody"> Desde: ' + data.SourceVenue + ' </div><div class="notifBody"> Hasta: ' + data.DestinationVenue + '</div><div class="notifBody"> Cuando: '+ fecha.toLocaleString().substring(0,21)  +'</div>' +
															 '<a id="btn-' + data.idReatedEvent + '" data-role="button" onclick="aceptarOfrecAventon('+ data.idReatedEvent +')">Tomar este aventon</a></div>' +
								'</li>';
			//adding notification to personal notifications control
			if ($("#personalNotif").children().length < 1) {
				$("#personalNotif").append(notification);
			}
			else {
				$("#personalNotif").children().first().before(notification);
			}		
	    }
		
		//Aceptacion de peticion de aventon
		function renderAcepPetAventPubl(data){

			//var notifications = $("#friendsNotif");
			var fecha = new Date(parseInt(data.RegistryDate.substr(6))); //TODO: arreglar problema de fechas
			$(".ui-li-count.ui-btn-up-c.ui-btn-corner-all.b").text(parseInt($("#countBPubNotif").text()) + 1);
			   
			var notification = '<li id="' + data.idReatedEvent + '"><img src="' + data.SourceUser_PhotoURL + '"/>' +
															 '<div class="notifTitle">' + data.DestinationUser_Name + '</div><div class="notifMessage">' + data.EventDescription + '</div>' +
															 '<div class="notifBody">' + data.DestinationUser_Name + ' pidio un aventon desde ' + data.SourceVenue + ' hasta ' + data.DestinationVenue + ' y ' + data.SourceUser_Name + ' ha ofrecido darselo.</div>' +
															 '<div>'+ fecha.toDateString() +'</div>' +
							   '</li>';
			//adding notification to personal notifications control
			if ($("#friendsNotif").children().length < 1) {
				$("#friendsNotif").append(notification);
			}
			else {
				$("#friendsNotif").children().first().before(notification);
			}		
		}
		
		//Aceptacion de ofrecimiento de aventon
		function renderAceptOfrecAventPubl(data) {

			//var notifications = $("#friendsNotif");
			var fecha = new Date(parseInt(data.RegistryDate.substr(6))); //TODO: arreglar problema de fechas
			$(".ui-li-count.ui-btn-up-c.ui-btn-corner-all.b").text(parseInt($("#countBPubNotif").text()) + 1);
			var notification = '<li id="' + data.idReatedEvent + '"><img src="' + data.SourceUser_PhotoURL + '"/>' +
															 '<div class="notifTitle">' + data.DestinationUser_Name + '</div><div class="notifMessage">' + data.EventDescription + '</div>' +
														     '<div class="notifBody">' + data.DestinationUser_Name + ' ofrecio un aventon desde ' + data.SourceVenue + ' hasta ' + data.DestinationVenue + ' y ' + data.SourceUser_Name + ' lo tomará.</div>' +
							                                 '<div>'+ fecha.toDateString() +'</div>' +
							   '</li>';
			//adding notification to personal notifications control
			if ($("#friendsNotif").children().length < 1) {
				$("#friendsNotif").append(notification);
			}
			else {
				$("#friendsNotif").children().first().before(notification);				
			}
		}