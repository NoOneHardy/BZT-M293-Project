const completedCheckbox = document.querySelectorAll('.todo-completed')

completedCheckbox.forEach(
    function (element, index) {
        element.addEventListener('input', (e) => {
            const animatable = e.target.parentElement.previousElementSibling
            const todo = e.target.parentElement.parentElement
            animatable.style.setProperty("top", (getComputedStyle(todo).getPropertyValue("height") / 2).toString())
            if (e.target.checked) {
                animatable.classList.remove("completed")
                setTimeout(function () {
                    animatable.classList.add("completed")
                }, 1)
                setTimeout(function () {
                    todo.classList.add("completed")
                }, 750)
                setTimeout(function () {
                    animatable.classList.remove("completed")
                }, 1001)
                setTodoState(todo, true)
            } else {
                animatable.classList.remove("completed")
                setTimeout(function () {
                    animatable.classList.add("not-completed")
                }, 1)
                setTimeout(function () {
                    todo.classList.remove("completed")
                }, 750)
                setTimeout(function () {
                    animatable.classList.remove("not-completed")
                }, 1001)
                setTodoState(todo, false)
            }
        })
    }
)

function setTodoState(todo, value) {
    let data = JSON.parse(localStorage.getItem('data'))
    let id = todo.id
    data.todos[id].completed = value

    localStorage.setItem('data', JSON.stringify(data))
}