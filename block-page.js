chrome.storage.sync.get(['goal1', 'goal2', 'goal3', 'description1', 'description2', 'description3'], function(data) {
    console.log('loaded');

    let goalsAndDescriptions = [
        data.goal1,
        data.description1,
        data.goal2,
        data.description2,
        data.goal3,
        data.description3
    ];

    let goalZone = document.getElementById('goal-zone');

    if (goalsAndDescriptions.every((v) => v == '')) {
        // If there ARE NO goals and descriptions

        let info = document.createElement('p');
        info.innerHTML = "You haven't set any goals yet. Why not make some in the extension settings to remind yourself next time you're blocked?"
        goalZone.appendChild(info);

        let settingsButton = document.createElement('p');
        settingsButton.className = 'settings-link';
        settingsButton.innerHTML = 'Settings';
        settingsButton.addEventListener('click', function() {
            chrome.runtime.openOptionsPage();
        });
        goalZone.appendChild(settingsButton);
    } else {
        // Else if there ARE goals and descriptions

        let note = document.createElement('p');
        note.innerHTML = "You said you don't want to be distracted from achieving these goals:"
        goalZone.appendChild(note);
    
        for (let i=0; i<goalsAndDescriptions.length; i++) {
            if (i == 0 || i == 2 || i == 4) {
                var elementType = 'h2';
                var cName = 'goal-title';
            } else {
                var elementType = 'p';
                var cName = 'goal-description';
            }
    
            let textValue = goalsAndDescriptions[i];
            if (textValue != '') {
                let e = document.createElement(elementType);
                e.className = cName;
                e.innerHTML = textValue
                goalZone.appendChild(e);
            }
        }
    }
});