const iName = document.querySelector('#iName')
const iCategory = document.querySelector('#iCategory')
const iDate = document.querySelector('#iDate')
const iInfo = document.querySelector('#iInfo')
const iImportant = document.querySelector('#iImportant')
const bCreate = document.querySelector('#create-todo')

bCreate.addEventListener('click', function () {
    if (iName.value === "") {
        alert("Please enter a name.")
    } else if (iDate.value === "") {
        alert("Please enter a date.")
    }
    let todos = []
    let data = localStorage.getItem("data")
    if (data !== null) {
        data = JSON.parse(data)
        todos = data.todos
    }

    let todo = {
        "name": iName.value,
        "category": iCategory.value,
        "date": iDate.value,
        "info": iInfo.value,
        "important": iImportant.checked,
        "completed": false
    }
    todos.push(todo)
    data = {
        "todos": todos
    }
    data = JSON.stringify(data)
    localStorage.setItem("data", data)
    iName.value = ""
    iCategory.value = ""
    iDate.value = ""
    iInfo.value = ""
    resetImportance()
})