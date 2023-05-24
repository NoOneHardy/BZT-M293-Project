const hex = ["a", "b", "c", "d", "e", "f"]

// DRY
const root = document.querySelector(':root')

let colors = localStorage.getItem('colors')
let primaryColor
let secondaryColor
if (colors === null) {
    primaryColor = '#00ff88'
    secondaryColor = '#008844'
} else {
    colors = JSON.parse(colors)
    primaryColor = colors.primary
    secondaryColor = colors.secondary
}


document.querySelector(':root').style.setProperty('--primary-color', primaryColor)
document.querySelector(':root').style.setProperty('--secondary-color', secondaryColor)
/*
toDoName = urlParams.get('name')
todo.innerHTML = toDoName
*/
function getVariable(property) {
    let style = getComputedStyle(root)
    return style.getPropertyValue(property)
}

function setVariable(property, value) {
    root.style.setProperty(property, value)
}

function halveHex(color) {
    for (let idxDigit = 1; idxDigit < color.length; idxDigit++) {
        let digit = color[idxDigit]
        if (isNaN(digit)) {
            digit = hex.indexOf(digit) + 10
        }

        digit = (digit / 2).toFixed()

        if (digit > 9) {
            digit = String.fromCharCode(digit + 87)
        }
        color = color.slice(0, idxDigit) + digit + color.slice(idxDigit + 1)
    }

    return color
}