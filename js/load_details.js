const id = new URLSearchParams(window.location.search).get('id')
const iName = document.querySelector('#iName')
const elCategory = document.querySelector('#category')
const iCategory = elCategory.firstElementChild
const sCategory = elCategory.lastElementChild
sCategory.style.setProperty("display", "none")
const options = sCategory.getElementsByTagName('option')
const iDate = document.querySelector('#iDate')
const iInfo = document.querySelector('#iInfo')
const iImportant = document.querySelector('#iImportant')
const star = iImportant.nextElementSibling.lastElementChild
const iCompleted = document.querySelector('#iCompleted')
const bEdit = document.querySelector('#edit-todo')
const bDelete = document.querySelector('#delete-todo')
const bSave = document.querySelector('#save')
bSave.style.setProperty("display", "none")

function loadCategoriesIntoSelect() {
    let html = ""
    const data = JSON.parse(localStorage.getItem('data'))
    const categories = data.categories
    categories.forEach(function (category) {
        html += '<option value="' + category + '">' + getCategoryDisplayName(category) + '</option>'
    });

    sCategory.innerHTML = html
}

let todos = JSON.parse(localStorage.getItem('data')).todos

function loadDetail() {
    const todo = todos[id]

    const todoName = todo.name
    const category = todo.category
    const date = todo.date
    const info = todo.info
    const important = todo.important
    const completed = todo.completed
    if (completed) {
        iName.style.setProperty("color", "var(--darker-text)")
        iName.style.setProperty("text-decoration", "line-through")
    }
    
    iName.value = todoName
    iCategory.value = category[0].toUpperCase() + category.slice(1, category.length)
    for (let idx = 0; idx < options.length; idx++) {
        if (category === options[idx].value) {
            options[idx].selected = true
            break
        }
    }
    iDate.value = date
    iInfo.innerHTML = info
    iImportant.checked = important
    if (important) {
        star.style.setProperty("opacity", "1")
        star.style.setProperty("transform", "rotate(360deg)")
    }
    iCompleted.checked = completed
}


iCompleted.addEventListener('click', function () {
    if (iCompleted.checked) {
        setTodoState(id, true)
        iName.style.setProperty("color", "var(--darker-text)")
        iName.style.setProperty("text-decoration", "line-through")
    } else {
        setTodoState(id, false)
        iName.style.setProperty("color", "var(--text)")
        iName.style.setProperty("text-decoration", "none")
    }
})

function setTodoState(id, value) {
    let data = JSON.parse(localStorage.getItem('data'))
    data.todos[id].completed = value
    localStorage.setItem('data', JSON.stringify(data))
}

function deleteTodo() {
    let data = JSON.parse(localStorage.getItem('data'))
    todos.splice(id, 1)
    data.todos = todos
    localStorage.setItem('data', JSON.stringify(data))
    window.location.href = './all.html'
}

bDelete.addEventListener('click', deleteTodo)
bEdit.addEventListener('click', editTodo)
bSave.addEventListener('click', saveChanges)

function editTodo() {
    iName.readOnly = false
    iName.style.setProperty("color", "var(--text)")
    iName.style.setProperty("text-decoration", "none")
    iCategory.style.setProperty("display", "none")
    sCategory.style.setProperty("display", "block")
    iDate.readOnly = false
    iDate.style.setProperty("text-align", "right")
    iInfo.readOnly = false
    iImportant.onclick = ""
    iCompleted.parentElement.style.setProperty("display", "none")
    bDelete.style.setProperty("display", "none")
    bEdit.style.setProperty("display", "none")
    bSave.style.setProperty("display", "block")
}

function saveChanges() {
    if (iName.value === "") {
        shakeOnMissingInput(iName)
        if (iDate.value === "") {
            shakeOnMissingInput(iDate)
        }
        return
    } else if (iDate.value === "") {
        shakeOnMissingInput(iDate)
        return
    }
    
    todos[id].name = iName.value
    todos[id].date = iDate.value
    todos[id].category = sCategory.value
    todos[id].info = iInfo.value
    todos[id].important = iImportant.checked
    
    let data = JSON.parse(localStorage.getItem('data'))
    data.todos = todos
    data = JSON.stringify(data)
    localStorage.setItem("data", data)
    iName.readOnly = true
    iCategory.style.setProperty("display", "block")
    sCategory.style.setProperty("display", "none")
    iDate.readOnly = true
    iDate.style.setProperty("text-align", "left")
    iInfo.readOnly = true
    iImportant.onclick = function() {return false}
    iCompleted.parentElement.style.setProperty("display", "block")
    bDelete.style.setProperty("display", "block")
    bEdit.style.setProperty("display", "block")
    bSave.style.setProperty("display", "none")
    loadDetail()
}

iName.addEventListener('input', () => {
    resetInput(iName)
})

iDate.addEventListener('input', () => {
    resetInput(iDate)
})


loadCategoriesIntoSelect()
loadDetail()