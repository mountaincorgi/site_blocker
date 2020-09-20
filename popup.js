// Set the URL of the popup text box to the current tab's domain
function setPopupUrl(tabs) {
    let tab = tabs[0];
    let url = new URL(tab.url);
    let domain = url.hostname;
    document.getElementById('url-textbox').setAttribute('value', domain);
}
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, setPopupUrl);


// Shared function to add domains to appropriate lists
function addToList(listName) {
    chrome.storage.sync.get(listName, function(data) {
        debugger;
        let updateList = data[listName];
        let domain = document.getElementById('url-textbox').value;
        updateList.push(domain);

        let updateObject = {};
        updateObject[listName] = updateList;

        chrome.storage.sync.set(updateObject, () => {
            console.log(`${domain} added to ${listName}`);
        });
    });
}


// Shared function to toggle mode
function toggleMode(modePressed) {
    chrome.storage.sync.get('mode', function(data) {
        let changeMode = null;
        if (data.mode !== modePressed) {
            changeMode = modePressed;
        }
        chrome.storage.sync.set({'mode': changeMode}, () => {
            console.log(`${changeMode} mode set`);
        });
    });
}


// Add to block list
let blockButton = document.getElementById('block-button');
blockButton.addEventListener('click', function() {addToList('blockList');});


// Add to limit list
let limitButton = document.getElementById('limit-button');
limitButton.addEventListener('click', function() {addToList('limitList');});


// Toggle block mode
let blockModeButton = document.getElementById('block-mode');
blockModeButton.addEventListener('click', function() {toggleMode('BLOCK');});


// Toggle limit mode
let limitModeButton = document.getElementById('limit-mode');
limitModeButton.addEventListener('click', function() {toggleMode('LIMIT');});
