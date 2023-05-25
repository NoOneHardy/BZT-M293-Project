// DRY
const iPrimaryColor = document.getElementById('primary')
const iSecondaryColor = document.getElementById('secondary')
const iColorSync = document.getElementById('color-sync')
const bApply = document.getElementById('apply-button')
const right = document.getElementById('right-after')
const left = document.getElementById('left-after')
const preview = document.getElementById('preview')

const elCategoryList = document.getElementById('category-list')
const iNewCategory = document.getElementById('new-category')


function applySettings() {
    let primaryColor = iPrimaryColor.value
    let secondaryColor = iSecondaryColor.value
    setVariable('--primary-color', primaryColor)
    setVariable('--secondary-color', secondaryColor)
    let colors = {
        'primary': primaryColor,
        'secondary': secondaryColor
    }
    colors = JSON.stringify(colors)
    localStorage.setItem('colors', colors)
}

function setApplyBackgrounds() {
    right.style.setProperty('background', iSecondaryColor.value)
    left.style.setProperty('background', iPrimaryColor.value)
}

function removeApplyBackgrounds() {
    right.style.setProperty('background', 'transparent')
    left.style.setProperty('background', 'transparent')
}

function displayPreviewPrimaryColor() {
    let newSecondaryColor
    let newPrimaryColor
    newPrimaryColor = iPrimaryColor.value
    setVariable('--new-primary-color', newPrimaryColor)
    if (iColorSync.checked) {
        newSecondaryColor = halveHex(newPrimaryColor)
        iSecondaryColor.value = newSecondaryColor
        setVariable('--new-secondary-color', newSecondaryColor)
    }
}

function displayPreviewScondaryColor() {
    setVariable('--new-secondary-color', iSecondaryColor.value)
}

bApply.addEventListener('mouseenter', setApplyBackgrounds)
bApply.addEventListener('mouseleave', removeApplyBackgrounds)
bApply.addEventListener('click', applySettings)

iPrimaryColor.addEventListener('input', displayPreviewPrimaryColor)
iSecondaryColor.addEventListener('input', displayPreviewScondaryColor)

iPrimaryColor.value = primaryColor
iSecondaryColor.value = secondaryColor

function loadCategories() {
    let data = JSON.parse(localStorage.getItem('data'))
    if (data === null) {
        data = {
            "todos": [],
            "categories": ['business', 'private', 'school', 'shopping']
        }
        localStorage.setItem('data', JSON.stringify(data))
    }
    const categories = data.categories
    let html = ''
    let width = 0
    categories.forEach(function (category, id) {
        let categoryDisplayName = getCategoryDisplayName(category)
        let li
        if (category === 'private') {
            li = '<li id="' + id + '"><input class="name" value="' + categoryDisplayName + '" readonly></li>'
        } else {
            li = '<li id="' + id + '"><input class="name" value="' + categoryDisplayName + '" readonly> <span class="fa-solid fa-pencil" onclick="renameCategory(' + id + ')"></span> <span class="fa-solid fa-trash-can" onclick="removeCategory(' + id + ')"></span></li>'
        }
        if (category.length > width) {
            width = category.length
        }
        html += li + '\n'
    })
    elCategoryList.innerHTML = html
    const lis = elCategoryList.getElementsByTagName('input')
    width += 4
    width += 'ch'
    for (let idx = 0; idx < lis.length; idx++) {
        let element = lis[idx]
        element.style.setProperty('width', width)
    }

    const inputsCategoryName = elCategoryList.getElementsByClassName('name')
    for (let idx = 0; idx < inputsCategoryName.length; idx++) {
        const iCategoryName = inputsCategoryName[idx]
        iCategoryName.addEventListener('keypress', (e) => {
            if (e.target === document.activeElement && e.key === 'Enter') {
                const id = e.target.parentElement.id
                saveChangedCategoryName(id)
            }
        })
    }
}

function newCategory() {
    const data = JSON.parse(localStorage.getItem('data'))
    const categories = data.categories
    const category = iNewCategory.value
    categories.push(category.toLowerCase())
    data.categories = categories.sort()
    localStorage.setItem('data', JSON.stringify(data))
    iNewCategory.value = ''
}

function removeCategory(id) {
    let data = JSON.parse(localStorage.getItem('data'))
    let categories = data.categories
    let todos = data.todos
    todos.forEach(function (todo, idx) {
        if (todo.category === categories[id]) {
            todo.category = 'private'
            todos[idx] = todo
        }
    })
    data.todos = todos
    categories.splice(id, 1)
    data.categories = categories
    localStorage.setItem('data', JSON.stringify(data))
    loadCategories()
}

function renameCategory(id) {
    const elCategories = elCategoryList.getElementsByTagName('li')
    const elCategory = elCategories[id]
    const elCategoryItems = elCategory.children
    const iCategoryName = elCategoryItems[0]
    const deleteIcon = elCategoryItems[2]
    const editIcon = elCategoryItems[1]

    if (editIcon.classList.contains('fa-pencil')) {
        deleteIcon.style.setProperty('display', 'none')
        editIcon.classList.remove('fa-pencil')
        editIcon.classList.add('fa-floppy-disk')
        iCategoryName.readOnly = false
        iCategoryName.style.setProperty('background', 'var(--darker-label)')
    } else if (editIcon.classList.contains('fa-floppy-disk')) {
        saveChangedCategoryName(id)
    }
}


iNewCategory.addEventListener('keypress', (e) => {
    if (e.target === document.activeElement && e.key === 'Enter') {
        newCategory()
        loadCategories()
    }
})

function saveChangedCategoryName(id) {
    const elCategories = elCategoryList.getElementsByTagName('li')
    const elCategory = elCategories[id]
    const elCategoryItems = elCategory.children
    const iCategoryName = elCategoryItems[0]
    const deleteIcon = elCategoryItems[2]
    const editIcon = elCategoryItems[1]

    const data = JSON.parse(localStorage.getItem('data'))
    const categories = data.categories
    const todos = data.todos

    if (iCategoryName.value === '') {
        alert('Please enter a Name.')
        return
    }

    if (categories.includes(iCategoryName.value.toLowerCase()) && iCategoryName.value.toLowerCase() !== categories[id]) {
        alert('This category already exists.')
        return
    }

    deleteIcon.style.setProperty('display', 'block')
    editIcon.classList.remove('fa-floppy-disk')
    editIcon.classList.add('fa-pencil')
    iCategoryName.readOnly = true
    iCategoryName.style.setProperty('background', 'transparent')

    for (let idx = 0; idx < todos.length; idx++) {
        const todo = todos[idx]
        if (categories[id] === todo.category) {
            todo.category = iCategoryName.value.toLowerCase()
        }
        todos[idx] = todo
    }

    categories[id] = iCategoryName.value.toLowerCase()
    data.categories = categories.sort()
    data.todos = todos
    localStorage.setItem('data', JSON.stringify(data))
    loadCategories()
}

loadCategories()