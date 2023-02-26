const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const pendingTasksList = document.getElementById('pending-tasks');
const completedTasksList = document.getElementById('completed-tasks');

let tasks = [];

function addTask(event) {
  event.preventDefault();
  const task = todoInput.value;
  if (task !== '') {
    tasks.push({ text: task, completed: false });
    todoInput.value = '';
    renderTasks();
  }
}

function renderTasks() {
  pendingTasksList.innerHTML = '';
  completedTasksList.innerHTML = '';

  if (tasks.filter(task => !task.completed).length === 0) {
    pendingTasksList.innerHTML = '<p>No pending tasks.</p>';
   
  }

  if (tasks.filter(task => task.completed).length === 0) {
    completedTasksList.innerHTML = '<p>No completed tasks.</p>';
  }

  tasks.forEach((task, index) => {
    const div = document.createElement('div');
    div.classList.add('flex-item');
    div.innerHTML = '';
    div.innerHTML += "<h2>" + task.text + "</h2>";
    if (!task.completed) {
      div.innerHTML += "<br><button onclick='completeTask(" + index + ")'>Complete</button>";
      pendingTasksList.appendChild(div);
    } else {
      div.innerHTML += "<br><button onclick='removeCompletedTask(" + index + ")'>Delete</button>";
      completedTasksList.appendChild(div);
    }
  });
}


function completeTask(index) {
  tasks[index].completed = true;
  renderTasks();
}

function removeCompletedTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

todoForm.addEventListener('submit', addTask);
renderTasks();