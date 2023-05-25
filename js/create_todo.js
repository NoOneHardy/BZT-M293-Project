const iName = document.getElementById('iName')
const iCategory = document.getElementById('iCategory')
const iDate = document.getElementById('iDate')
const iInfo = document.getElementById('iInfo')
const iImportant = document.getElementById('iImportant')
const bCreate = document.getElementById('create-todo')
const bFinish = document.getElementById('finish')

bCreate.addEventListener('click', function () {
    if (iName.value === "") {
        alert("Please enter a name.")
        return
    } else if (iDate.value === "") {
        alert("Please enter a date.")
        return
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
    todos.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date)
    })
    if (data === null) {
        data = {
            "todos": todos,
            "categories": ['business', 'private', 'school', 'shopping']
        }
    } else {
        data.todos = todos
    }

    data = JSON.stringify(data)
    localStorage.setItem("data", data)
    iName.value = ""
    iCategory.getElementsByTagName('option')[0].selected = true
    iDate.value = ""
    iInfo.value = ""
    resetImportance()
})

bFinish.addEventListener('click', function () {
    if (iName.value === "") {
        alert("Please enter a name.")
        return
    } else if (iDate.value === "") {
        alert("Please enter a date.")
        return
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
    todos.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date)
    })
    if (data === null) {
        data = {
            "todos": todos,
            "categories": ['business', 'private', 'school', 'shopping']
        }
    } else {
        data.todos = todos
    }
    data = JSON.stringify(data)
    localStorage.setItem("data", data)
    window.location.href = "./all.html"
})

function loadCategoriesIntoSelect() {
    let data = JSON.parse(localStorage.getItem('data'))
    if (data === null) {
        data = {
            "todos": [],
            "categories": ['business', 'private', 'school', 'shopping']
        }
    }
    let html = ""

    const categories = data.categories
    categories.forEach(function (category) {
        html += '<option value="' + category + '">' + getCategoryDisplayName(category) + '</option>'
    });

    iCategory.innerHTML = html
}

loadCategoriesIntoSelect()