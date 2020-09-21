chrome.storage.sync.get(['goal1', 'goal2', 'goal3', 'description1', 'description2', 'description3'], function(data) {
    console.log('loaded');

    let g1 = data.goal1;
    let g2 = data.goal2;
    let g3 = data.goal3;
    let d1 = data.description1;
    let d2 = data.description2;
    let d3 = data.description3;

    let goalsAndDescriptions = [
        data.goal1,
        data.description1,
        data.goal2,
        data.description2,
        data.goal3,
        data.description3
    ];

    let goalZone = document.getElementById('goal-zone');
    for (let i=0; i<goalsAndDescriptions.length; i++) {
        if (i == 0 || i == 2 || i == 4) {
            var elementType = 'h1';
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
});