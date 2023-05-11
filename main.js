const urlParams = new URLSearchParams(window.location.search)
const todo = document.querySelector('#todo')

toDoName = urlParams.get('name')
todo.innerHTML = toDoName