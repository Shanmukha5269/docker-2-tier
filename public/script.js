document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Function to fetch and display todos
    const fetchTodos = async () => {
        const response = await fetch('/todos');
        const todos = await response.json();
        todoList.innerHTML = ''; // Clear existing list
        todos.forEach(todo => {
            addTodoToDOM(todo);
        });
    };

    // Function to add a todo item to the DOM
    const addTodoToDOM = (todo) => {
        const li = document.createElement('li');
        li.dataset.id = todo._id; // Store the todo ID
        li.className = todo.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${todo.text}</span>
            <div>
                <button class="complete-btn">${todo.completed ? 'Undo' : 'Complete'}</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        todoList.appendChild(li);
    };

    // Handle form submission to add new todo
    todoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (text) {
            const response = await fetch('/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });
            const newTodo = await response.json();
            addTodoToDOM(newTodo);
            todoInput.value = '';
        }
    });

    // Handle complete and delete buttons
    todoList.addEventListener('click', async (e) => {
        const li = e.target.closest('li');
        if (!li) return; // Click wasn't on a list item

        const id = li.dataset.id;

        if (e.target.classList.contains('complete-btn')) {
            const completed = !li.classList.contains('completed');
            const response = await fetch(`/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed }),
            });
            if (response.ok) {
                li.classList.toggle('completed');
                e.target.textContent = completed ? 'Undo' : 'Complete';
            }
        } else if (e.target.classList.contains('delete-btn')) {
            const response = await fetch(`/todos/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                li.remove();
            }
        }
    });

    // Initial fetch of todos
    fetchTodos();
});