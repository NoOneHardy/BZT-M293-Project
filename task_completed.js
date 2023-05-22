const checkbox = document.querySelectorAll('.todo-completed')

checkbox.forEach(
    function (node, index) {
        node.addEventListener('input', (e) => {
            const animatable = e.target.parentElement.previousSibling.previousSibling
            const todo = e.target.parentElement.parentElement
            if (e.target.checked) {
                animatable.classList.remove("not-completed")
                setTimeout(function () {
                    animatable.classList.add("completed")
                }, 1)
                setTimeout(function () {
                    todo.classList.add("completed")
                }, 1500)
                setTimeout(function () {
                    animatable.classList.remove("completed")
                }, 2001)
            } else {
                animatable.classList.remove("completed")
                setTimeout(function () {
                    animatable.classList.add("not-completed")
                }, 1)
                setTimeout(function () {
                    todo.classList.remove("completed")
                }, 500)
                setTimeout(function () {
                    animatable.classList.remove("not-completed")
                }, 2001)
            }
        })
    }
)