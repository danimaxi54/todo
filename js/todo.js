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

const taskRemoveBtn = document.body.querySelector('.task-remove');

document.addEventListener('click', function(event) {
  let targetElem = event.target;

  if (list.children.length < 1) {
    return;
  }

  if (targetElem.classList.contains('task-remove') || targetElem.parentNode.tagName == 'BUTTON') {
    deleteTasksPopUp();
  }

  const askingPopUp = document.body.querySelector('.asking-popup');
  if (targetElem.dataset.result == 'confirm') {
    askingPopUp.classList.remove('asking-popup--visible');

    taskBtn();
  } else if (targetElem.dataset.result == 'cansel') {
    askingPopUp.classList.remove('asking-popup--visible');
  }
});


function taskBtn() {
  if (!taskRemoveBtn.classList.contains('task-remove--active')) {
    taskRemoveBtn.classList.add('task-remove--active');

    for (let getTask of document.body.querySelectorAll('.created__task')) {
      getTask.remove();
    }
  }

  setTimeout(() => taskRemoveBtn.classList.remove('task-remove--active'), 1000);
}

function deleteTasksPopUp() {
  const popUp = document.body.querySelector('.asking-popup');
  popUp.classList.add('asking-popup--visible');
}

function addTask(event) {
  if (field.value == '' || field.value.length < 2) {
    openModal();

    return;
  }

  const newTask = createTask(field.value);

  list.append(newTask);
  field.value = '';

  event.stopPropagation();
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

