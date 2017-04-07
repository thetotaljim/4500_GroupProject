	function Announcement(id, faculty, title, message, priority, groups){

		//check if the message isn't set or is empty, and return undefined object if so
		if(!message || message === ""){
			return undefined;
		}

		this.id = id || "";
		this.postDate = new Date();
		this.expiryDate = new Date(this.postDate.getTime() + 7 * 24 * 60 * 60 * 1000);
		this.title = title || "Untitled";
		this.message = message;
		this.sender = {
			firstName: faculty.firstName || "",
			lastName: faculty.lastName || ""
		}
		this.priority = priority;
		this.groups = groups || [];


		function setSender(faculty){
			this.sender.firstName = faculty.firstName;
			this.sender.lastName = faculty.lastName;
		}
	}