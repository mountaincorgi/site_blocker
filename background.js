chrome.runtime.onInstalled.addListener(function() {
    // As soon as the extension is installed, initialize lists in storage
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


// Callback function
// function blockUrl(tabId, changeInfo, tab) {

//     //1. find out whether mode is include / exclude

//     //2. Get appropriate list from storage

//     //3. Check if URL is in storage

//     //4. If the URL in storage is a substring of the tab URL,
//     // redirect to the blocking page.
//     chrome.storage.sync.get(['blockList', 'limitList', 'mode'], function(data) {
//         if (data.mode === 'block') {
//             var mode = 'block';
//             var listToUse = data.blockList;
//         } else if (data.mode === 'limit') {
//             var mode = 'limit';
//             var listToUse = data.limitList;
//         } else {
//             return null
//         }

//         if (changeInfo.hasOwnProperty("url")) {
//             let tabUrl = changeInfo.url;
//             if (mode === 'block') {
//                 for (const i in listToUse) {
//                     if (tabUrl.includes(i)) {
//                         let url = chrome.runtime.getURL('block-page.html');
//                         chrome.tabs.update(tabId, {"url": url}, function(tab) {
//                             console.log(tab);
//                         });
//                     }
//                 }
//             } else if (mode === 'limit') {
//                 for (const i in listToUse) {
//                     if (!tabUrl.includes(i)) {
//                         let url = chrome.runtime.getURL('block-page.html');
//                         chrome.tabs.update(tabId, {"url": url}, function(tab) {
//                             console.log(tab);
//                         });
//                     }
//                 }
//             }
//         }


//     });
//     if (changeInfo.url.includes("facebook.com") || changeInfo.url.includes("twitter.com")) {
        
//     }
// }

// chrome.tabs.onUpdated.addListener(blockUrl);
