(function(){
	var logoutButton = $('#logout_button');

	$(document).ready(function(){

		//logout when the logout button is clicked; and enable the login button
		logoutButton.on('click', function(){
			logout();
			window.location.href = "login.html";
		});

		// $('.announcement-list').append(generateAnnouncementFromTemplate(null));


		var announcementsRef = firebase.database().ref('announcements/').orderByChild('postDate');

		announcementsRef.on("child_added", function(data){
			console.log(data.toJSON());
			$('.announcements_list').prepend(generateAnnouncementFromTemplate(data.toJSON()));
		});


		// //Generates a new announcement after 7 second delay
		// setTimeout(function(){
		// 		var user = new User(null, "Jeffery", "Calhoun", "jcd39@mail.umsl.edu", null, true, true, null, null);
		// 		addAnnouncement(user, "Testing realtime adding", "This is a test to see if announcements show up in real time", 2, null);
		// 	}, 7000);




	});


	function addAnnouncement(announcement){
		  var key = firebase.database().ref('announcements/').push().key;
		  announcement.id = key;
		  firebase.database().ref('announcements/' + key).set({
		    announcement: announcement
		  });
	}


	function logout(){

		firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		}).catch(function(error) {
		  // An error happened.
		});	
	}

	function generateAnnouncementFromTemplate(announcement){
		var authorName = announcement.sender.firstName + " " + announcement.sender.lastName;

		var priorityClass;
		switch(announcement.priority){
			case 0:
				priorityClass = "priority-low";
				break;
			case 1:
				priorityClass = "priority-medium";
				break;
			case 2:
				priorityClass = "priority-high";
				break;
			default:
				priorityClass = "priority-low";
				break;
		}

		//TODO: The below code tries to display the announcement date as today if it is undefined in the announcement object
			//THIS IS A SLOPPY FIX
			//For some reason, when an announcement is added after the initial ones are loaded, firebase is notified of the change before the
			//postDate property is set for that new announcement (it was undefined)

		var announcementHTML = '<div class="announcement">';
      	announcementHTML += `<div class="announcement-block">
      						 <div class="announcement-heading">
      						<h5 class="announcement-title text-center ` + priorityClass + `">` + announcement.title + `</h5>
      						<p class="announcement-author text-left">` + authorName + `</p>
      						<p class="announcement-date text-right">` + $.format.date(announcement.postDate || new Date(), "MMM dd, yyyy")  + `</p>
      						</div>   
        					<hr>
       						<p class="announcement-message">` + announcement.message + `</p>
						      </div>
						    </div>`;
		return announcementHTML;
	}

	function addAnnouncement(faculty, title, message, priority, groups){

		var announcementsRef = firebase.database().ref('announcements/');
		var newAnnouncementKey = announcementsRef.push().key;
		var newAnnouncement = new Announcement(newAnnouncementKey, faculty, title, message, priority, groups);

		var updates = {};
		updates['/announcements/' + newAnnouncementKey] = newAnnouncement;
		firebase.database().ref().update(updates);
	}

}());