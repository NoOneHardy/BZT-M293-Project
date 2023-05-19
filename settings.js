// DRY
const iPrimaryColor = document.querySelector('#primary')
const iSecondaryColor = document.querySelector('#secondary')
const iColorSync = document.querySelector('#color-sync')
const bApply = document.querySelector('#apply-button')
const right = document.querySelector('#right-after')
const left = document.querySelector('#left-after')
const preview = document.querySelector('#preview')


function applySettings() {
    primaryColor = iPrimaryColor.value
    secondaryColor = iSecondaryColor.value
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
