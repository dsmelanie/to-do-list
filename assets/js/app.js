const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function displayTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
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
    taskList.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText) {
    if (tasks.includes(taskText)) {
      Swal.fire({
        title: 'Oops...',
        text: 'Cette tâche existe déjà !',
      });
      return;
    }
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    displayTasks();
  }
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
      localStorage.setItem('tasks', JSON.stringify(tasks));
      displayTasks();
    }
  })
}

function editTask(index, newText) {
  tasks[index] = newText;
  saveTasks();
  displayTasks();
}

function showEditPopup(index) {
  Swal.fire({
    title: 'Modifier la tâche',
    input: 'text',
    inputValue: tasks[index],
    showCancelButton: true,
    confirmButtonText: 'Enregistrer',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      const newText = result.value.trim();
      if (newText) {
        editTask(index, newText);
      }
    }
  })
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-edit')) {
    const index = e.target.dataset.index;
    showEditPopup(index);
  } else if (e.target.classList.contains('btn-delete')) {
    const index = e.target.dataset.index;
    deleteTask(index);
  } else if (e.target.classList.contains('btn-done')) {
    const index = e.target.dataset.index;
    taskIsDone(index);
    e.target.classList.toggle('btnIsDone');
  }
});

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = e.target.elements.taskInput;
  const taskText = input.value.trim();
  if (taskText) {
    addTask(taskText);
    input.value = '';
  }
});

taskForm.addEventListener('submit', addTask);

displayTasks();

function taskIsDone(index) {
  const taskItem = document.querySelectorAll('.list-group-item')[index];
  taskItem.querySelector('.task-text').classList.toggle('taskDone');
  localStorage.setItem('tasks', JSON.stringify(tasks));
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
      localStorage.setItem('tasks', JSON.stringify(tasks));
      displayTasks();
    }
  });
};

  
  
