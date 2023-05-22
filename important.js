const star = document.querySelector('svg#checked')
const checkbox = document.querySelector('#iImportant')

checkbox.addEventListener('input', function () {
    if (checkbox.checked) {
        star.style.setProperty('opacity', '1')
        star.style.setProperty('transform', 'rotate(360deg)')
    } else {
        star.style.setProperty('opacity', '0')
        star.style.setProperty('transform', 'rotate(0deg)')
    }
})