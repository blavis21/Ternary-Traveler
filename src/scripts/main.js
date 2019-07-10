function getData(entity) {
    return fetch(`http://localhost:8088/${entity}`)
        .then(data => data.json())
}

function postData(obj) {
    return fetch("http://localhost:8088/interests?", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
}

function interestsComponent(input) {
    return `
    <div id="intObj">
        <p>Name: ${input.name}</p>
        <p>Description: ${input.description}</p>
        <p>Cost: ${input.cost}</p>
        <p>Review: ${input.review}</p>
        <button>Edit</button>
        <button>Delete</button>
    </div>
    `
}

function intFormComponent() {
    let selectEl = document.createElement("select")
    let div = document.createElement("div")
    let baseForm = `
    <h3>Create New Interest</h3>
    
    <p>Name: </p>
    <input type="text" id="intName" required>
    
    <p>Description: </p>
    <input type="text" id="intDescription" required>
    
    <p>Cost: </p>
    <input type="text" id="intCost" required>
    
    <p>Location: </p>
    `
    div.innerHTML = baseForm
    return getData("places").then(data => {
        data.forEach((test) => {
            selectEl.innerHTML += `<option value=${test.id}>${test.name}</option>`
        })
        div.appendChild(selectEl)
        div.innerHTML += "<button id='intSaveBtn'>Save</button>"
        console.log("this is the div", div)
        return div
    })
}


function intFormToDom() {
    // debugger;
    let intFormLocation = document.querySelector("#intForm")
    intFormComponent().then((form) => {
        intFormLocation.appendChild(form)
        document.querySelector("#intSaveBtn").addEventListener("click", () => {
            console.log("button clicked")
            let intName = document.querySelector("#intName").value
            let intDescription = document.querySelector("#intDescription").value
            let intCost = document.querySelector("#intCost").value
            let intLocation = +document.querySelector("#intLocation").value

            let newInt = buildInterestObj(intName, intDescription, intCost, intLocation)

            console.log(newInt)
            postData(newInt)
        })
    })
}


function interestsToDom(print) {
    let intLocation = document.querySelector("#interests")
    print.forEach((obj) => {
        intLocation.innerHTML += interestsComponent(obj)
    })
}

getData("interests").then(interestsToDom)

function buildInterestObj(name, description, cost, location) {
    return {
        name,
        description,
        cost,
        placeId: location
    }
}

document.querySelector("#createIntBtn").addEventListener("click", () => {
    intFormToDom()
})


console.log(selectEl)