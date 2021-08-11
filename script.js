const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

// get from localstorage
const todos = JSON.parse(localStorage.getItem('todos'));

//if we already have todos in local storage, for each todo
if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

//on click of enter we are adding Todo
form.addEventListener('submit', (e) => {
  e.preventDefault();

  addTodo();
});

function addTodo(todo) {

  //whatever we enter the value in the input
  let todoText = input.value;


  //checking if we have any todo in the localstorage, if yes take the todo.text value and save it
  if (todo) {
    todoText = todo.text;
  }

  //if we have todo entered then create an li
  if (todoText) {
    const todoEl = document.createElement('li');

    // in the todos array we are storing completed as a key, if we have complted as true then add the class, so that in style.css we can underline
    if (todo && todo.completed) {
      todoEl.classList.add('completed');
    }

    // li's innerText
    todoEl.innerText = todoText;

    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed');
      updateLS();
    });

    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      todoEl.remove();
      updateLS();
    });

    todosUL.appendChild(todoEl);

    input.value = '';

    updateLS();
  }
}

function updateLS() {
  todosEl = document.querySelectorAll('li');

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed'),
    });
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}
