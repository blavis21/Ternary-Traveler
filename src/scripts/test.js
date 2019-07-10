let places = [
    {
        name: "London",
        id: 1
    },
    {
        name: "Italy",
        id: 2
    }
]

let select = document.createElement("select")

places.forEach( (place) => {
    select.innerHTML += `<option value=${place.id}>${place.name}</option>`
})

console.log(select)