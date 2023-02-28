// form.js module
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task');

import { addTask } from './tasks.js';

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
const taskText = taskInput.value.trim();
if (taskText) {
addTask(taskText);
taskInput.value = '';
}
});

export { taskInput };
