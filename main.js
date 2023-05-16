const urlParams = new URLSearchParams(window.location.search)
const todo = document.querySelector('#todo')

document.querySelector(':root').style.setProperty('--primary-color', '#ff0')
document.querySelector(':root').style.setProperty('--secondary-color', '#f80')

toDoName = urlParams.get('name')
todo.innerHTML = toDoName