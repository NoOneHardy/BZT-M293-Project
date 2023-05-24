function loadDashboard() {
    const data = JSON.parse(localStorage.getItem('data'))
    const todos = data.todos

    const todayList = document.querySelector('#today-todos')
    const weekList = document.querySelector('#week-todos')
    const importantList = document.querySelector('#important-todos')
    const expiredList = document.querySelector('#expired-todos')

    todayList.innerHTML = ""
    weekList.innerHTML = ""
    importantList.innerHTML = ""
    expiredList.innerHTML = ""

    for (let id = 0; id < todos.length; id++) {
        let todo = todos[id]
        let name = todo.name
        let category = todo.category
        let date = todo.date
        date = date.split("-")
        date = date[2] + "." + date[1] + "." + date[0]
        let important = todo.important
        let completed = todo.completed

        let html = "<div id='" + id + "' class='todo todo" + id
        if (completed) {
            html += " completed"
        }
        html += "'>\n"
        html += "\t<div class='a-completed'></div>\n"
        html += "\t<label class='check'>\n"
        html += "\t\t<input type='checkbox' class='todo-completed'"
        if (completed) {
            html += " checked"
        }
        html += ">\n"
        html += "\t\t<div class='checkmark'></div>\n"
        html += "\t</label>\n"
        html += "\t<a href='./detail.html?id=" + id + "' class='todo-name'>" + name + "</a>\n"
        html += "\t<span class='todo-category'>" + category[0].toUpperCase() + category.slice(1, category.length) +"</span>\n"
        html += "\t<span class='date'>" + date + "</span>\n"
        html += "</div>"

        let today = new Date(new Date().setHours(0, 0, 0, 0))
        date = date.split(".")
        let todoDate = new Date(new Date(date[1] + "." + date[0] + "." + date[2]).setHours(0, 0, 0, 0))
        if (today > todoDate && !completed) {
            expiredList.innerHTML += html
        }
        if (compareDates(today, todoDate)) {
            todayList.innerHTML += html
        }
        if (compareWeek(today, todoDate)) {
            weekList.innerHTML += html
        }
        if (important) {
            importantList.innerHTML += html
        }
    }
}

function compareDates(date1, date2) {
    if (date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()) {
        return true
    }
    return false
}

function compareWeek(date1, date2) {
    let tempdate = new Date((date1.getMonth() + 1) + "." + date1.getDate() + "." + date1.getFullYear())
    tempdate = new Date(tempdate.setDate(tempdate.getDate() + 1))
    while ((tempdate.getDay() >= date1.getDay() && tempdate.getDay() <= 6) || tempdate.getDay() === 0) {
        if (compareDates(tempdate, date2)) {
            return true
        }
        tempdate = new Date(tempdate.setDate(tempdate.getDate() + 1))
    }
    tempdate = new Date((date1.getMonth() + 1) + "." + date1.getDate() + "." + date1.getFullYear())
    while (tempdate.getDay() <= date1.getDay() && tempdate.getDay() >= 1) {
        if (compareDates(tempdate, date2)) {
            return true
        }
        tempdate = new Date(tempdate.setDate(tempdate.getDate() - 1))
    }
    return false
}

loadDashboard()

const completedCheckbox = document.querySelectorAll('.todo-completed')

completedCheckbox.forEach(
    function (element) {
        element.addEventListener('input', (e) => {
            const id = e.target.parentElement.parentElement.id
            const todos = document.querySelectorAll('.todo' + id)
            todos.forEach(function (todo, idx) {
                const animatable = todo.firstElementChild
                animatable.style.setProperty("top", (getComputedStyle(todo).getPropertyValue("height") / 2).toString())
                if (e.target.checked) {
                    todo.firstElementChild.nextElementSibling.firstElementChild.checked = true
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
                    todo.firstElementChild.nextElementSibling.firstElementChild.checked = false
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
        })
    }
)

function setTodoState(todo, value) {
    let data = JSON.parse(localStorage.getItem('data'))
    let id = todo.id
    data.todos[id].completed = value

    localStorage.setItem('data', JSON.stringify(data))
}