const inputTask = document.querySelector('#new-task');
const btnAddTask = document.querySelector('#new-task-btn');
const btnClearAll = document.querySelector('#clear-btn');
const containerToDo = document.querySelector('#todo');
let tasks = [];

function init() {
  console.log('ciao');
  tasks = caricaTask();
  // console.log(tasks);
  popolaToDoList(tasks);
}

function addTask() {
  const task = inputTask.value.trim(); // Estrai il valore dell'input
  if (task === '') return; // Verifica se l'input è vuoto

  const taskObject = {
    id: Date.now(), // Usa un timestamp come identificatore univoco
    task: task,
  };

  tasks.push(taskObject);
  addTaskToList(taskObject);
  localStorage.setItem('todos', JSON.stringify(tasks));
  inputTask.value = ''; // Resetta il campo di input dopo l'aggiunta
}

function addTaskToList(taskObject) {
  const p = document.createElement('p');
  p.classList.add('new-task');
  p.textContent = taskObject.task;
  p.dataset.id = taskObject.id;
  containerToDo.appendChild(p);
  inputTask.value = '';
}

containerToDo.addEventListener('click', function (e) {
  const todo = e.target.closest('.new-task');
  if (todo) {
    const id = parseInt(todo.dataset.id);
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      localStorage.setItem('todos', JSON.stringify(tasks));
      todo.remove();
    }
  }
});

function caricaTask() {
  const tasks = JSON.parse(localStorage.getItem('todos')) ?? [];
  return tasks;
}

function popolaToDoList(tasks) {
  tasks.forEach((task, index) => {
    const p = document.createElement('p');
    p.classList.add('new-task');
    p.textContent = task.task;
    p.dataset.id = task.id;
    containerToDo.appendChild(p);
    p.setAttribute('data-index', index);
  });
}

btnAddTask.addEventListener('click', addTask);
btnClearAll.addEventListener('click', function () {
  tasks = [];
  localStorage.setItem('todos', JSON.stringify(tasks));
  containerToDo.innerHTML = '';
});

init();
console.log(tasks);
