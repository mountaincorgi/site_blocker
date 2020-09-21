chrome.storage.sync.get(['goal1', 'goal2', 'goal3', 'description1', 'description2', 'description3'], function(data) {
    console.log('loaded');

    let g1 = data.goal1;
    let g2 = data.goal2;
    let g3 = data.goal3;
    let d1 = data.description1;
    let d2 = data.description2;
    let d3 = data.description3;

    let goalZone = document.getElementById('goal-zone');
    if (g1 != '') {
        let g1Element = document.createElement('h1');
        g1Element.className = 'goal-title';
        g1Element.innerHTML = `${g1}`
        goalZone.appendChild(g1Element);
    }
    if (d1 != '') {
        let d1Element = document.createElement('p');
        d1Element.className = 'goal-description';
        d1Element.innerHTML = `${d1}`
        goalZone.appendChild(d1Element);
    }
    if (g2 != '') {
        let g2Element = document.createElement('h1');
        g2Element.className = 'goal-title';
        g2Element.innerHTML = `${g2}`
        goalZone.appendChild(g2Element);
    }
    if (d2 != '') {
        let d2Element = document.createElement('p');
        d2Element.className = 'goal-description';
        d2Element.innerHTML = `${d2}`
        goalZone.appendChild(d2Element);
    }
    if (g3 != '') {
        let g3Element = document.createElement('h1');
        g3Element.className = 'goal-title';
        g3Element.innerHTML = `${g3}`
        goalZone.appendChild(g3Element);
    }
    if (d3 != '') {
        let d3Element = document.createElement('p');
        d3Element.className = 'goal-description';
        d3Element.innerHTML = `${d3}`
        goalZone.appendChild(d3Element);
    }
});