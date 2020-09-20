// Populate form from storage
chrome.storage.sync.get(null, function(data) {
    document.getElementById('goal-1').setAttribute('value', data.goal1);
    document.getElementById('goal-2').setAttribute('value', data.goal2);
    document.getElementById('goal-3').setAttribute('value', data.goal3);
    document.getElementById('description-1').setAttribute('value', data.description1);
    document.getElementById('description-2').setAttribute('value', data.description2);
    document.getElementById('description-3').setAttribute('value', data.description3);

    let blockUl = document.getElementById('block-list')
    debugger;
    for (let i=0; i<data.blockList.length; i++) {
        let j = document.createElement("li");
        j.innerHTML = `<input type="text" value="${data.blockList[i]}"><button class="delete">-</button>`;
        blockUl.appendChild(j);
    }
    let k = document.createElement("li");
    k.innerHTML = `<input type="text"><button class="add">+</button>`;
    blockUl.appendChild(k);


    let limitUl = document.getElementById('limit-list')
    for (let x=0; x<data.limitList.length; x++) {
        let y = document.createElement("li");
        y.innerHTML = `<input type="text" value="${data.limitList[x]}"><button class="delete">-</button>`;
        limitUl.appendChild(y);
    }
    let z = document.createElement("li");
    z.innerHTML = `<input type="text"><button class="add">+</button>`;
    limitUl.appendChild(z);


    let deleteButtons = document.getElementsByClassName('delete');
    debugger;
    for (let b=0; b<deleteButtons.length; b++) {
        let linsanity = deleteButtons[b];
        linsanity.addEventListener('click', function() {
            linsanity.parentElement.remove();
        });
    }


    let addButtons = document.getElementsByClassName('add');
    debugger;
    for (let v=0; v<addButtons.length; v++) {
        let kobe = addButtons[v];
        kobe.addEventListener('click', function() {
            kobe.className = 'delete';
            kobe.innerHTML = 'do_stuff';
        });
    }
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
