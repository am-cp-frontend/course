// elements
const $input = document.querySelector('#todo-input')
const $todos = document.querySelector('#todos-container')

// todos array
const todos = [
    'Finish my frontend homework',
    'Chill a bit, idk'
]

function makeTodo (text) {
    const todo = document.createElement('li')
    
    todo.classList.add('todo')
    todo.textContent = text

    return todo
}

function renderAll () {
    todos.forEach(todo => $todos.appendChild(makeTodo(todo)))
}

$input.addEventListener('keyup', event => {
    if (event.code === 'Enter' && $input.value) {
        const todoText = $input.value

        todos.push(todoText)
        $todos.appendChild(
            makeTodo(todoText)
        )

        $input.value = ''
    }
})

renderAll()