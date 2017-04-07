(function(){

	var logoutButton;

	

	$(document).ready(function(){


		logoutButton = $('#logout_button');

		logoutButton.hide();

	

		$('#login_form').on('submit', function(e){
			e.preventDefault();
			var email= $('#login_email').val();
			var password = $('#login_password').val();
			login(email, password);
		});


		logoutButton.on('click', function(){
			logout();
		});
	});


	function login(email, password){

		firebase.auth().signInWithEmailAndPassword(email, password).then(function(){

			console.log("user signed in");
			logoutButton.show();
			

		}, function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
		  alert("signin failed");
		  console.log("signin failed");
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

	function createUser(email){
		var password = generateRandomPassword();

		firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){

			console.log("user created");
			firebase.auth().sendPasswordResetEmail(email).then(function() {
			  // Email sent.
			  console.log("password reset email sent");
			}, function(error) {
			  // An error happened.
			  console.log("failed to send password reset email");
			});

		}, function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
		  console.log(errorMessage);
		});



	}

	function generateRandomPassword(){
		var randomstring = Math.random().toString(36).slice(-8);
		return randomstring;
	}



}());