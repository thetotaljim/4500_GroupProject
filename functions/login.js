(function(){
	$(document).ready(function(){

		$('#login_form').on('submit', function(e){
			login();
		});
	});

	function login(){
		alert("submit");
		e.preventDefault();
	}

}());