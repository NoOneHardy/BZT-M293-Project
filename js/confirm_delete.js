function showPanel(id) {
    const data = JSON.parse(localStorage.getItem('data'))
    const categories = data.categories
    const category = categories[id]
    const panel = document.getElementById('confirm-delete')
    const warn_category = panel.querySelector('#warn-category')
    const which_category = panel.getElementsByTagName('span')[0]
    warn_category.innerHTML = getCategoryDisplayName(category)
    which_category.innerHTML = warn_category.innerHTML
    window.scrollTo({ top: 0, behavior: 'smooth' })
    panel.style.setProperty('top', '40vh')
}

function hidePanel() {
    const panel = document.getElementById('confirm-delete')
    panel.style.setProperty('top', '-300px')
}

const bNo = document.getElementById('no')
const bYes = document.getElementById('yes')

bNo.addEventListener('click', hidePanel)
bYes.addEventListener('click', function () {
    const data = JSON.parse(localStorage.getItem('data'))
    const categories = data.categories
    const todos = data.todos

    const panel = document.getElementById('confirm-delete')
    const warn_category = panel.querySelector('#warn-category')

    const category = warn_category.innerHTML.toLowerCase()
    const id = categories.indexOf(category)

    todos.forEach(function (todo, idx) {
        if (todo.category === category) {
            todo.category = 'private'
        }
    })
    
    categories.splice(id, 1)

    data.todos = todos
    data.categories = categories
    localStorage.setItem('data', JSON.stringify(data))
    hidePanel()
    loadCategories()
})