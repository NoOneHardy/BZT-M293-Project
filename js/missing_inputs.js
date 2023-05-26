function shakeOnMissingInput(elInput) {
    const el = elInput.parentElement
    resetInput(elInput)
    setTimeout(() => {
        el.classList.add('empty')
    }, 1)
}

function resetInput(elInput) {
    const el = elInput.parentElement
    el.classList.remove('empty')
}