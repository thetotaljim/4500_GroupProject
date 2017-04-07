(function(){

	$(document).ready(function(){

		console.log("in announcements");
		
		var starCountRef = firebase.database().ref('announcements/');
		starCountRef.on('value', function(snapshot) {
		  alert("announcement added");
		});

		var users = [];

		users.push(new User("Jeff", "Calhoun", "jcd39@mail.umsl.edu", null, true, true, "3147384445", "Home"));

		var group = new Group("Code Monkey Mafia", users);


		var announcement = new Announcement(users[0], "Test", "This is a test announcement", 1, [group]);

		addAnnouncement(announcement);

	});


	function addAnnouncement(announcement){
		  var key = firebase.database().ref('announcements/').push().key;
		  announcement.id = key;
		  firebase.database().ref('announcements/' + key).set({
		    announcement: announcement
		  });
	}

}());