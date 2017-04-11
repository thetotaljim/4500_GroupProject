(function(){
	var logoutButton = $('#logout_button');

	$(document).ready(function(){

		//logout when the logout button is clicked; and enable the login button
		logoutButton.on('click', function(){
			logout();
			window.location.href = "login.html";
		});

		// $('.announcement-list').append(generateAnnouncementFromTemplate(null));


		var announcementsRef = firebase.database().ref('announcements/').orderByChild('postDate');;
		announcementsRef.on('value', function(data) {
  			data.forEach(function(announcement){
  				$('.announcements_list').append(generateAnnouncementFromTemplate(announcement.toJSON()));
  			})
		});


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
		  console.log("signout success");
		  logoutButton.hide();
		}).catch(function(error) {
		  // An error happened.
		  console.log("signout failed");
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

		var announcementHTML = '<div class="announcement ' + priorityClass + '">';
      	announcementHTML += `<div class="announcement-block">
      						 <div class="announcement-heading">
      						<h5 class="announcement-title text-center">` + announcement.title + `</h5>
      						<p class="announcement-author text-left">` + authorName + `</p>
      						<p class="announcement-date text-right">` + $.format.date(announcement.postDate, "MMM d, yyyy")  + `</p>
      						</div>   
        					<hr>
       						<p class="announcement-message">` + announcement.message + `</p>
						      </div>
						    </div>`;
		return announcementHTML;
	}

}());