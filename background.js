chrome.runtime.onInstalled.addListener(function() {
    // As soon as the extension is installed, initialize data in storage
    chrome.storage.sync.get(
        [
            'goal1',
            'goal2',
            'goal3',
            'description1',
            'description2',
            'description3',
            'blockList',
            'limitList',
            'mode'
        ], 
        function(data) {
            if (Object.keys(data).length === 0) {
                chrome.storage.sync.set(
                    {
                        goal1: '',
                        goal2: '',
                        goal3: '',
                        description1: '',
                        description2: '',
                        description3: '',
                        blockList: [],
                        limitList: [],
                        mode: 'BLOCK'
                    },
                    function() {console.log('Initialized storage data');}
                );
            }
        }
    );

    // As soon as the extension is installed, initialize rules to allow the popup
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules(
            [{
                conditions: [new chrome.declarativeContent.PageStateMatcher({})],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }]
        );
    });
});


function urlIncludesAnyInList(url, list) {
    return list.some((i) => url.includes(i));
}

function blockUrl(tabId) {
    let blockUrl = chrome.runtime.getURL('block-page.html');
    chrome.tabs.update(tabId, {'url': blockUrl}, function() {
        console.log('Page blocked');
    });
}


// Callback on tab update
function checkAndBlockUrl(tabId, changeInfo, tab) {
    chrome.storage.sync.get(['blockList', 'limitList', 'mode'], function(data) {
        if (changeInfo.hasOwnProperty('url')) {
            if (data.mode === 'BLOCK') {
                if (urlIncludesAnyInList(changeInfo.url, data.blockList)) {
                    blockUrl(tabId);
                }
            } else if (data.mode === 'LIMIT') {
                if (!urlIncludesAnyInList(changeInfo.url, data.limitList)) {
                    blockUrl(tabId);
                }
            }
        }
    });
}


// Add listener on updating tab
chrome.tabs.onUpdated.addListener(checkAndBlockUrl);
