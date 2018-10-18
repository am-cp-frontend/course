// elements
const $input = document.querySelector('.input-container input')
const $todos = document.querySelector('.todo-container')

const todos = [
    'Finish my frontend homework',
    'Почебуречить'
]

function makeTodo (text) {
    const todo = document.createElement('div')
        
    todo.classList.add('todo')
    todo.textContent = text

    return todo
}

function renderAll () {
    todos.forEach(function (text) {
        $todos.appendChild(
            makeTodo(text)
        )
    })
}

$input.addEventListener('keyup', function (event) {
    if (event.code === 'Enter' && $input.value.trim()) {
        const text = $input.value

        todos.push(text)

        $todos.appendChild(
            makeTodo(text)
        )

        $input.value = ''
    }
})

renderAll()