(function() {

    var groupNum = 1;

    $(document).ready(function() {
     
        //populate check boxs based off existing distribution groups
        populateCheckBox();

        $("#back_button").on("click", function(){
            window.location.href = "announcements.html";
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

    function addAnnouncement(announcement) {
        var key = firebase.database().ref('announcements/').push().key;
        announcement.id = key;
        firebase.database().ref('announcements/' + key).set({
            announcement: announcement
        }).then(function(){
            window.location.href="announcements.html";
        });
    }


}());