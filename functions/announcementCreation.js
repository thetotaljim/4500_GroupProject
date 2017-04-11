(function() {

    var groupNum = 1;

    $(document).ready(function() {
        console.log("in test announcements");

        //var groupRef = firebase.database().ref('groups/');

        //var availableGroups;
        populateCheckBox();
        // ref.child('users').orderByChild('age').startAt(25).on('child_added', ...)
        //groupRef.orderByChild('name').on('child_added', function(snapshot) {
        //console.log(snapshot.val().name);
        //var group = snapshot.val().name;
        //var availableGroups = snapshot.val().name;
        //console.log(availableGroups);
        //availableGroups.push(snapshot.val().name.toString());
        //console.log(JSON.stringify(snapshot.val()));
    });


    //console.log(availableGroups.toString()) ;
    //var users = [];

    //users.push(new User("Jon", "Snow", "winteriscoming@mail.umsl.edu", null, true, true, "3148675309", "Home"));
    //users.push(new User("Tyrion", "Lannister", "ilovedrinking@mail.umsl.edu", null, true, true, "5558675309", "Home"));
    //var group = new Group("Jon Snow is Dead", users);
    //addGroup("Jon Snow is Dead",users);



    //addAnnouncement(announcement);




    function populateCheckBox() {

        var groupRef = firebase.database().ref('groups/');
        groupRef.orderByChild('name').on('child_added', function(snapshot) {
            //console.log(snapshot.val().name);
            //var group = snapshot.val().name;
            var availableGroups = snapshot.val().name;
            console.log(availableGroups);

            //$('#contacts').append(contactHtmlFromObject(snapshot.val()));
            //$('#containerId').append('<input type="checkbox" name="myCheckbox" />');
            //var newSet = '<fieldset data-role="controlgroup" class="cbGroup' + groupNum + '"></fieldset>';
            //$('.cbDiv').append(newSet);
            //var newBox = '<input type="checkbox" name="checkbox-' + groupNum + '" id="checkbox-' + groupNum + '" class="custom" /> <label for="checkbox-'+ groupNum + '">I agree</label>';
            //$(".checkbox-group" + groupNum).append(newBox).trigger('create');
            //$("#groupCheckbox").append('<input type="checkbox" value = "hello" id="' + groupNum + 'VisibleCheckbox" name="'  + groupNum + 'VisibleCheckbox " ><label for="' + groupNum + 'VisibleCheckbox">' + groupNum + '</label></br>');

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
        var label = '<label>Hello world</label>';

        return $ctrl.after(label);
    }

    //create label for checkbox
    function getLabel(fbGroup) {

        return '<label>' + fbGroup.name + '<label></br>';
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
        });
    }


}());