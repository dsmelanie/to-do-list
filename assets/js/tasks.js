// tasks.js module
const taskList = document.getElementById('task-list');
let tasks = [];

function displayTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = createTaskListItem(task, index);
    taskList.appendChild(li);
  });
}

function createTaskListItem(task, index) {
  const li = document.createElement('li');
  li.className = 'list-group-item';
  li.innerHTML = `
      <div class="d-flex flex-row justify-content-between align-items-center">
              <button class="btn-done btn btn-link" data-index="${index}">
                  <i class="fas fa-check" style="pointer-events: none;"></i>
              </button>
          <div class="task-text mr-auto">${task}</div>
          <div>
              <button class="btn-edit btn btn-link" data-index="${index}">
                      <i class="far fa-edit" style="pointer-events: none;"></i>
              </button>
              <button class="btn-delete btn btn-link" data-index="${index}">
                      <i class="far fa-trash-alt" style="pointer-events: none;"></i>
              </button>
          </div>
      </div>  
  `;
  return li;
}

function addTask(taskText) {
  if (tasks.includes(taskText)) {
    Swal.fire({
      title: 'Oops...',
      text: 'Cette tâche existe déjà !',
    });
    return;
  }
  tasks.push(taskText);
  saveTasks();
  displayTasks();
}

function deleteTask(index) {
  Swal.fire({
    title: 'Êtes-vous sûr de vouloir supprimer cette tâche ?',
    showCancelButton: true,
    confirmButtonText: 'Supprimer',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      tasks.splice(index, 1);
      saveTasks();
      displayTasks();
    }
  })
}

function editTask(index, newText) {
  tasks[index] = newText;
  saveTasks();
  displayTasks();
}

function taskIsDone(index) {
  const taskItem = document.querySelectorAll('.list-group-item')[index];
  taskItem.querySelector('.task-text').classList.toggle('taskDone');
  saveTasks();
};

function deleteTasksDone() {
  const uncompletedTasks = [];

  for (let i = 0; i < tasks.length; i++) {
    const taskItem = document.querySelectorAll('.list-group-item')[i];
    if (!taskItem.querySelector('.task-text').classList.contains('taskDone')) {
      uncompletedTasks.push(tasks[i]);
    }
  } Swal.fire({
    title: 'Êtes-vous sûr de vouloir supprimer toutes les tâches accomplies ?',
    showCancelButton: true,
    confirmButtonText: 'Supprimer',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      tasks = uncompletedTasks;
      saveTasks();
      displayTasks();
    }
  });
};

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  tasks = JSON.parse(localStorage.getItem('tasks')) || [];
}

loadTasks();

export { addTask, deleteTask, editTask, taskIsDone, deleteTasksDone };
