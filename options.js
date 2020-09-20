// Populate form from storage
chrome.storage.sync.get(null, function(data) {
    document.getElementById('goal-1').setAttribute('value', data.goal1);
    document.getElementById('goal-2').setAttribute('value', data.goal2);
    document.getElementById('goal-3').setAttribute('value', data.goal3);
    document.getElementById('description-1').setAttribute('value', data.description1);
    document.getElementById('description-2').setAttribute('value', data.description2);
    document.getElementById('description-3').setAttribute('value', data.description3);
    document.getElementById('block-list-input').setAttribute('value', data.blockList.join(', '));
    document.getElementById('limit-list-input').setAttribute('value', data.limitList.join(', '));
});


// Save options
let saveButton = document.getElementById('save-options');
saveButton.addEventListener('click', function() {
    let g1 = document.getElementById('goal-1').value;
    let g2 = document.getElementById('goal-2').value;
    let g3 = document.getElementById('goal-3').value;
    let d1 = document.getElementById('description-1').value;
    let d2 = document.getElementById('description-2').value;
    let d3 = document.getElementById('description-3').value;
    // let bL = document.getElementById('block-list-input').value;
    // let lL = document.getElementById('limit-list-input').value;

    let updateObject = {
        goal1: g1,
        goal2: g2,
        goal3: g3,
        description1: d1,
        description2: d2,
        description3: d3,
        // blockList: bL,
        // limitList: lL
    } 

    chrome.storage.sync.set(updateObject, function() {
        console.log('Options successfully saved');
    });
});
