// document.onreadystatechange = function () {
//     if (document.readyState == "interactive") {
//         console.log('document loaded');
//         saveToList(event);
//     }
// }
let tasks = new Firebase('https://dubow-house-project-management.firebaseio.com/tasks')

function saveToList(event) {
    //if user presses enter key
    if (event.which == 13 || event.keyCode == 13) {
        console.log('hit enter');
        let taskName = document.getElementById('taskName').value.trim();
        console.log('Task name: ' + taskName);
        let assignedTo = document.getElementById('assignedTo').value.trim();
        console.log('Task assignedTo: ' + assignedTo);
        let taskInfo = document.getElementById('taskInfo').value.trim();
        console.log('Task info: ' + taskInfo);
        let taskDue = document.getElementById('taskDue').value.trim();
        console.log('Task due: ' + taskDue);
        if (taskName.length > 0) {
            console.log('attempting to save to firebase');
            saveToFb(taskName, assignedTo, taskInfo, taskDue);
        }
        console.log('Resetting values');
        document.getElementById('taskName').value = '';
        document.getElementById('assignedTo').value = '';
        document.getElementById('taskInfo').value = '';
        document.getElementById('taskDue').value = '';
        return false;
    }
};

function saveToFb(taskName, assignedTo, taskInfo, taskDue) {
    console.log('running saveToFb');
    tasks.push({
        name: taskName,
        assignedTo: assignedTo,
        taskInfo: taskInfo,
        taskDue: taskDue
    })
    console.log('saved new task to firebase');
    console.log(tasks);
};

function refreshUI(list) {
    var lis = '';
    for (var i = 0; i < list.length; i++) {
        lis += '<li data-key="' + list[i].key + '">' + list[i].name + '</li>';
    };
    document.getElementById('tasks').innerHTML = lis;
};

tasks.on("value", function(snapshot) {
    var data = snapshot.val();
    var list = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            name = data[key].name ? data[key].name : '';
            if (name.trim().length > 0) {
                list.push({
                    name: name,
                    key: key
                })
            }
        }
    }
    // refresh the UI
    refreshUI(list);
});