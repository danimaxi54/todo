const field = document.body.querySelector('.field');
const add = document.body.querySelector('.add');
const list = document.body.querySelector('.list');

function createTask(value) {
  const task = document.createElement('div');
  task.classList.add('created__task');
  task.addEventListener('click', completeTask);

  const taskTextBox = document.createElement('div');
  taskTextBox.textContent = value;
  taskTextBox.classList.add('task__text');

  const taskCheckbox = document.createElement('input');
  taskCheckbox.setAttribute('type', 'checkbox');
  taskCheckbox.classList.add('status');

  task.prepend(taskTextBox);
  task.append(taskCheckbox);

  return task;
}

add.addEventListener('click', addTask);
field.onkeydown = function(event) {
  if (event.keyCode === 13) {
    addTask();
  }
}

function addTask() {
  if (field.value == '' || field.value.length < 2) {
    openModal();

    return;
  }

  const newTask = createTask(field.value);

  list.append(newTask);
  field.value = '';
}

function completeTask(event) {
  const target = event.target;
  if (event.target.tagName != 'INPUT') {
    return;
  }

  const taskContainer = target.closest('.created__task');

  const checkBoxStatus = taskContainer.querySelector('.status');
  if (checkBoxStatus.checked) {
    taskContainer.classList.add('success');
  } else {
    taskContainer.classList.remove('success');
  }
}

const modalClose = document.body.querySelector('.modal__close');
modalClose.addEventListener('click', closeModal);

function openModal() {
  const modalOverlay = document.body.querySelector('.modal__overlay');
  const modalDialog = document.body.querySelector('.modal__dialog');
  modalOverlay.classList.add('modal__overlay--visible');
  modalDialog.classList.add('modal__dialog--visible');
}

function closeModal() {
  const modalOverlay = document.body.querySelector('.modal__overlay');
  const modalDialog = document.body.querySelector('.modal__dialog');
  modalOverlay.classList.remove('modal__overlay--visible');
  modalDialog.classList.remove('modal__dialog--visible');
}

