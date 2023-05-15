const urlParams = new URLSearchParams(window.location.search)
const todo = document.querySelector('#todo')

document.querySelector(':root').style = '--nav-link-glow:' + '#0000ff'

toDoName = urlParams.get('name')
todo.innerHTML = toDoName