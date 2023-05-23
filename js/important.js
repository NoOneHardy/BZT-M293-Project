const checkbox = document.querySelectorAll('.iImportant')

checkbox.forEach(function (element, index) {
    const star = element.nextSibling.nextSibling.lastChild.previousSibling
    const todo = element.parentElement.parentElement.parentElement
    element.addEventListener('input', function () {
        if (element.checked) {
            star.style.setProperty('opacity', '1')
            star.style.setProperty('transform', 'rotate(360deg)')
            if (checkbox.length > 1) {
                setTodoImportance(todo, true)
            }
        } else {
            star.style.setProperty('opacity', '0')
            star.style.setProperty('transform', 'rotate(0deg)')
            if (checkbox.length > 1) {
                setTodoImportance(todo, false)
            }
        }
    })
})

function resetImportance() {
    const star = document.querySelector("#checked")
    star.checked = false
    star.style.setProperty('opacity', '0')
    star.style.setProperty('transform', 'rotate(0deg)')
}

function setTodoImportance(todo, value) {
    let data = JSON.parse(localStorage.getItem('data'))
    let id = todo.id
    data.todos[id].important = value

    localStorage.setItem('data', JSON.stringify(data))
}