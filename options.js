// Function to populate lists
function populateList(element, list) {
    for (let i=0; i<list.length; i++) {
        let item = document.createElement('li');
        item.className = 'remove-element';
        item.innerHTML = `<input type="text" class="list-item" value="${list[i]}"><button class="minus">-</button>`;
        element.appendChild(item);
    }
    let addItem = document.createElement('li');
    addItem.className = 'add-element';
    addItem.innerHTML = `<input type="text" class="list-item" value=""><button class="plus">+</button>`;
    element.appendChild(addItem);
}


// Delete button functionality
function addDeleteListeners() {
    let deleteButtons = document.getElementsByClassName('minus');
    for (let i=0; i<deleteButtons.length; i++) {
        let b = deleteButtons[i];
        b.addEventListener('click', function() {b.parentElement.remove();});
    }
}


// Add button functionality
function addAddListeners() {
    let addRows = document.getElementsByClassName('add-element');
    for (let i=0; i<addRows.length; i++) {
        let row = addRows[i];
        let button = row.lastElementChild;
        button.addEventListener('click', function() {
            let row = button.parentElement;
            let list = button.parentElement.parentElement;
            let value = row.firstChild.value;
            row.firstChild.value = '';

            let newItem = document.createElement('li');
            newItem.className = 'remove-element';
            newItem.innerHTML = `<input type="text" class="list-item" value="${value}"><button class="minus">-</button>`;
            newItem.lastElementChild.addEventListener('click', function() {
                newItem.remove();
            });
            list.insertBefore(
                newItem, list.childNodes[list.childNodes.length-1]
            );
        });
    }
}


// Populate form from storage
chrome.storage.sync.get(null, function(data) {
    document.getElementById('goal-1').setAttribute('value', data.goal1);
    document.getElementById('goal-2').setAttribute('value', data.goal2);
    document.getElementById('goal-3').setAttribute('value', data.goal3);
    document.getElementById('description-1').value = data.description1;
    document.getElementById('description-2').value = data.description2;
    document.getElementById('description-3').value = data.description3;

    let blockUl = document.getElementById('block-list');
    let limitUl = document.getElementById('limit-list');
    populateList(blockUl, data.blockList);
    populateList(limitUl, data.limitList);

    addDeleteListeners();
    addAddListeners();
});


// Shared function to create lists of input values from list items
function inputValuesList(list) {
    let ret = [];
    for (let i=0; i<list.length; i++) {
        let v = list[i].firstChild.value.trim();
        if (v != '') {
            ret.push(v);
        }
    }
    return ret;
}


// Save options
let saveButton = document.getElementById('save-options');
saveButton.addEventListener('click', function() {
    let g1 = document.getElementById('goal-1').value;
    let g2 = document.getElementById('goal-2').value;
    let g3 = document.getElementById('goal-3').value;
    let d1 = document.getElementById('description-1').value;
    let d2 = document.getElementById('description-2').value;
    let d3 = document.getElementById('description-3').value;

    let blockListElements = document.querySelectorAll('#block-list .remove-element');
    let bL = inputValuesList(blockListElements);

    let limitListElements = document.querySelectorAll('#limit-list .remove-element');
    let lL = inputValuesList(limitListElements);

    let updateObject = {
        goal1: g1,
        goal2: g2,
        goal3: g3,
        description1: d1,
        description2: d2,
        description3: d3,
        blockList: bL,
        limitList: lL
    }

    chrome.storage.sync.set(updateObject, function() {
        console.log('Options successfully saved');
    });
});
