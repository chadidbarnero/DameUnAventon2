function PersonalNotificationsBinding(userAuthKey) {
    var pusher = new Pusher('c1c5e53e2c8e5295a772'); // Replace with your app key
    var channel = pusher.subscribe('user-' + userAuthKey);
    //Friendship notification binding
    channel.bind('10-2', function (data) {
        var notifications = $("#myNotifications").children("div");
        var notification = '<div id="' + data.notificationId + '" class="unread"><img src="' + data.userRequestingPhotoURL + '"/><span><a href="/Friends/FriendProfile?authKey="' + data.userRequestingAuthKey
        '">' + data.userRequestingName + '</a> ' + data.message + '</span></div>';
        //adding notification to personal notifications control
        if (notifications.length <= 0) {
            $("#myNotifications").append(notification);
        }
        else {
            notifications.first().prepend(notification);
        }
    });
    //Ride requesting accepted notification binding
    channel.bind('13-2', function (data) {
        var notifications = $("#myNotifications").children("div");
        var notification = '<div id="' + data.notificationId + '" class="unread"><img src="' + data.userRequestingPhotoURL + '"/><span><a href="/Friends/FriendProfile?authKey="' + data.userRequestingAuthKey
        '">' + data.userRequestingName + '</a> ' + data.message + '</span></div>';
        //adding notification to personal notifications control
        if (notifications.length <= 0) {
            $("#myNotifications").append(notification);
        }
        else {
            notifications.first().prepend(notification);
        }
    });
    //Ride offering accepted notification binding
    channel.bind('14-2', function (data) {
        var notifications = $("#myNotifications").children("div");
        var notification = '<div id="' + data.notificationId + '" class="unread"><img src="' + data.userRequestingPhotoURL + '"/><span><a href="/Friends/FriendProfile?authKey="' + data.userRequestingAuthKey
        '">' + data.userRequestingName + '</a> ' + data.message + '</span></div>';
        //adding notification to personal notifications control
        if (notifications.length <= 0) {
            $("#myNotifications").append(notification);
        }
        else {
            notifications.first().prepend(notification);
        }
    });
}

function FriendsNotificationBinding(userAuthKey) 
{
    var pusher = new Pusher('c1c5e53e2c8e5295a772'); // Replace with your app key
    var channel = pusher.subscribe('user-' + userAuthKey);
    //Friendship accepted
    channel.bind('2-1', function (data) {
        var notifications = $("#myNotifications").children("div");
        var notification = '<div id="' + data.notificationId + '"><span>' + data.message + '<a href="/Friends/FriendProfile?authKey="' + data.userRequestingAuthKey
        '">' + data.userRequestingName + '</a></span></div>';
        //adding notification to personal notifications control
        if (notifications.length <= 0) {
            $("#myNotifications").append(notification);
        }
        else {
            notifications.first().prepend(notification);
        }
    });
    //Ride requesting notification binding
    channel.bind('3-1', function (data) {
        var notifications = $("#myNotifications").children("div");
        var notification = '<div id="' + data.notificationId + '"><img src="' + data.userRequestingPhotoURL + '"/><span><a href="/Friends/FriendProfile?authKey="' + data.userRequestingAuthKey
        '">' + data.userRequestingName + '</a> ' + data.message + '</span></div>';
        //adding notification to personal notifications control
        if (notifications.length <= 0) {
            $("#myNotifications").append(notification);
        }
        else {
            notifications.first().prepend(notification);
        }
    });
    //Ride offering notification binding
    channel.bind('4-1', function (data) {
        var notifications = $("#myNotifications").children("div");
        var notification = '<div id="' + data.notificationId + '"><img src="' + data.userRequestingPhotoURL + '"/><span><a href="/Friends/FriendProfile?authKey="' + data.userRequestingAuthKey
        '">' + data.userRequestingName + '</a> ' + data.message + '</span></div>';
        //adding notification to personal notifications control
        if (notifications.length <= 0) {
            $("#myNotifications").append(notification);
        }
        else {
            notifications.first().prepend(notification);
        }
    });
    //Ride offering notification binding
    channel.bind('5-1', function (data) {
        var notifications = $("#myNotifications").children("div");
        var notification = '<div id="' + data.notificationId + '"><img src="' + data.userRequestingPhotoURL + '"/><span><a href="/Friends/FriendProfile?authKey="' + data.userRequestingAuthKey
        '">' + data.userRequestingName + '</a> ' + data.message + '</span><img src="' + data.userOfferingPhotoURL + '"/><span><a href="/Friends/FriendProfile?authKey="' + data.userOfferingAuthKey
        '">' + data.userOfferingName + '</a> </div>';
        //adding notification to personal notifications control
        if (notifications.length <= 0) {
            $("#myNotifications").append(notification);
        }
        else {
            notifications.first().prepend(notification);
        }
    });
    //Ride offering notification binding
    channel.bind('6-1', function (data) {
        var notifications = $("#myNotifications").children("div");
        var notification = '<div id="' + data.notificationId + '"><img src="' + data.userRequestingPhotoURL + '"/><span><a href="/Friends/FriendProfile?authKey="' + data.userRequestingAuthKey
        '">' + data.userRequestingName + '</a> ' + data.message + '</span><img src="' + data.userOfferingPhotoURL + '"/><span><a href="/Friends/FriendProfile?authKey="' + data.userOfferingAuthKey
        '">' + data.userOfferingName + '</a> </div>';
        //adding notification to personal notifications control
        if (notifications.length <= 0) {
            $("#myNotifications").append(notification);
        }
        else {
            notifications.first().prepend(notification);
        }
    });
}