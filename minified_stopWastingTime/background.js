function urlIncludesAnyInList(o,e){return e.some(e=>o.includes(e))}function blockUrl(o){let e=chrome.runtime.getURL("block-page.html");chrome.tabs.update(o,{url:e},function(){console.log("Page blocked")})}function checkAndBlockUrl(o,e,t){chrome.storage.sync.get(["blockList","limitList","mode"],function(t){e.hasOwnProperty("url")&&("BLOCK"===t.mode?urlIncludesAnyInList(e.url,t.blockList)&&blockUrl(o):"LIMIT"===t.mode&&(urlIncludesAnyInList(e.url,t.limitList)||blockUrl(o)))})}chrome.runtime.onInstalled.addListener(function(){chrome.storage.sync.get(["goal1","goal2","goal3","description1","description2","description3","blockList","limitList","mode"],function(o){0===Object.keys(o).length&&chrome.storage.sync.set({goal1:"",goal2:"",goal3:"",description1:"",description2:"",description3:"",blockList:[],limitList:[],mode:"BLOCK"},function(){console.log("Initialized storage data")})})}),chrome.tabs.onUpdated.addListener(checkAndBlockUrl);