const urlParams = new URLSearchParams(window.location.search)
const todo = document.querySelector('#todo')

document.querySelector(':root').style.setProperty('--primary-color', '#0f8')
document.querySelector(':root').style.setProperty('--secondary-color', '#084')

toDoName = urlParams.get('name')
todo.innerHTML = toDoName