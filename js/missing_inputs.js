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

function shakeOnExistingInput(elInput) {
    const el = elInput.parentElement
    resetExistingInput(elInput)
    setTimeout(() => {
        el.classList.add('exists')
    }, 1)
}

function resetExistingInput(elInput) {
    const el = elInput.parentElement
    el.classList.remove('exists')
}