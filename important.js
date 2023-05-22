const checkbox = document.querySelectorAll('.iImportant')

checkbox.forEach(function (element, index) {
    const star = element.nextSibling.nextSibling.lastChild.previousSibling
    element.addEventListener('input', function () {
        if (element.checked) {
            star.style.setProperty('opacity', '1')
            star.style.setProperty('transform', 'rotate(360deg)')
        } else {
            star.style.setProperty('opacity', '0')
            star.style.setProperty('transform', 'rotate(0deg)')
        }
    })
})

function resetImportance() {
    const star = document.querySelector("#checked")
    star.checked = false
    star.style.setProperty('opacity', '0')
    star.style.setProperty('transform', 'rotate(0deg)')
}