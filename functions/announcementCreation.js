(function() {

    var groupNum = 1;

    $(document).ready(function() {
     
        //populate check boxs based off existing distribution groups
        populateCheckBox();

        $("#back_button").on("click", function(){
            window.location.href = "announcements.html";
        });

        $("#announcementEntry_form").on("submit", function(e){
            e.preventDefault();
            var priority = $("#announcemet_priority").val();
            var title = $("#announcement_title").val();
            var message = $("#announcement_message").val();
            var user = new User(null, "Jeffery", "Calhoun", "jcd39@mail.umsl.edu", null, true, true, null, null);
            addAnnouncement(user, title, message, priority, null);
        
        });
  
    });



    function populateCheckBox() {

        var groupRef = firebase.database().ref('groups/');

        //query firebase group nodes and use 'name' to populate checkbox group
        groupRef.orderByChild('name').on('child_added', function(snapshot) {
           
            $("#groupCheckbox").append(groupHtmlFromObject(snapshot.val()));
            $("#groupCheckbox").append(getLabel(snapshot.val()));
            groupNum++;
        });



    }

    //create checkbox input and assign attributes for use later
    function groupHtmlFromObject(fbGroup) {
        console.log(groupNum);

        var $ctrl = $('<input/>', {
            type: 'checkbox',
            id: 'group' + groupNum,
            name: 'group' + groupNum,
            datagroup: fbGroup.name,
            checked: false
        });

        return $ctrl;
    }

    //create label for checkbox
    function getLabel(fbGroup) {

        return '<label>  ' + fbGroup.name + '<label></br>';
    }




    function addGroup(name, users) {

        var groupsRef = firebase.database().ref('groups/');
        var newGroupKey = groupsRef.push().key;
        var newGroup = new Group(newGroupKey, name, users);

        var updates = {};
        updates['/groups/' + newGroupKey] = newGroup;
        firebase.database().ref().update(updates);

    }

    function addAnnouncement(faculty, title, message, priority, groups){

        var announcementsRef = firebase.database().ref('announcements/');
        var newAnnouncementKey = announcementsRef.push().key;
        var newAnnouncement = new Announcement(newAnnouncementKey, faculty, title, message, priority, groups);

        var updates = {};
        updates['/announcements/' + newAnnouncementKey] = newAnnouncement;
        firebase.database().ref().update(updates).then(function(){
            window.location.href="announcements.html";
        }, function(error){
            alert("Failed to add announcement!");
        });
    }

    // function addAnnouncement(announcement) {
    //     var key = firebase.database().ref('announcements/').push().key;
    //     announcement.id = key;
    //     console.log(announcement);
    //     firebase.database().ref('announcements/' + key).set({
    //         announcement: announcement
    //     }).then(function(){
    //         // window.location.href="announcements.html";
    //     });
    // }


}());