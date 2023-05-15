const urlParams = new URLSearchParams(window.location.search)
const todo = document.querySelector('#todo')

document.querySelector(':root').style = '--nav-link-glow:' + '#FFCA3A'

toDoName = urlParams.get('name')
todo.innerHTML = toDoName