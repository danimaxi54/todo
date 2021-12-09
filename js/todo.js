const field = document.body.querySelector('.field');
const add = document.body.querySelector('.add');
const list = document.body.querySelector('.list');

function createTask(value) {
  let task = document.createElement('div');
  task.classList.add('created__task');
  task.addEventListener('click', completeTask);

  let taskTextBox = document.createElement('div');
  taskTextBox.textContent = value;
  taskTextBox.classList.add('task__text');

  let taskCheckbox = document.createElement('input');
  taskCheckbox.setAttribute('type', 'checkbox');
  taskCheckbox.classList.add('status');

  task.prepend(taskTextBox);
  task.append(taskCheckbox);

  return task;
}

add.addEventListener('click', addTask);

function addTask() {
  if (field.value == '' || field.value.length < 2) {
    openModal();

    return false;
  }

  const newTask = createTask(field.value);

  list.append(newTask);
  field.value = '';
}

function completeTask(event) {
  const target = event.target;
  if (event.target.tagName != 'INPUT') {
    return false;
  }

  const taskContainer = target.closest('.created__task');

  let checkBoxStatus = taskContainer.querySelector('.status');
  if (checkBoxStatus.checked) {
    taskContainer.classList.add('success');
  } else {
    taskContainer.classList.remove('success');
  }
}

let modalClose = document.body.querySelector('.modal__close');
modalClose.addEventListener('click', closeModal);

function openModal() {
  let modalOverlay = document.body.querySelector('.modal__overlay');
  let modalDialog = document.body.querySelector('.modal__dialog');
  modalOverlay.classList.add('modal__overlay--visible');
  modalDialog.classList.add('modal__dialog--visible');
}

function closeModal() {
  let modalOverlay = document.body.querySelector('.modal__overlay');
  let modalDialog = document.body.querySelector('.modal__dialog');
  modalOverlay.classList.remove('modal__overlay--visible');
  modalDialog.classList.remove('modal__dialog--visible');
}

