const field = document.body.querySelector('.field');
const add = document.body.querySelector('.add');
const list = document.body.querySelector('.list');

document.addEventListener('click', function(event) {
  const targetElem = event.target;

  if (targetElem.closest('.task-remove') &&
    list.children.length < 1) {
    field.classList.add('field--shake');
    setTimeout(() => field.classList.remove('field--shake'), 1000);

    return;
  }

  if (targetElem.closest('.task-remove')) {
    deleteTasksPopUp();
  }

  if (!targetElem.classList.contains('asking-popup__btn')) {
    return;
  }

  const askingPopUp = document.body.querySelector('.asking-popup');
  if (targetElem.dataset.result == 'confirm') {
    askingPopUp.classList.remove('asking-popup--visible');

    taskBtn();
  } else if (targetElem.dataset.result == 'cansel') {
    askingPopUp.classList.remove('asking-popup--visible');
  }
});

add.addEventListener('click', addTask);

field.onkeydown = function(event) {
  if (event.keyCode === 13) {
    addTask();
  }
}

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

  const taskDeleteBtn = document.createElement('button');
  taskDeleteBtn.className = 'delete-taskbtn';
  taskDeleteBtn.textContent = 'Удалить';

  const taskControls = document.createElement('div');
  taskControls.className = 'task-control-btns';
  taskControls.append(taskCheckbox);
  taskControls.append(taskDeleteBtn);

  task.prepend(taskTextBox);
  task.append(taskControls);

  return task;
}

function addTask(event) {
  if (field.value == '' || field.value.length < 2) {
    openModal();

    return;
  }

  const newTask = createTask(field.value);

  list.append(newTask);
  field.value = '';

  const taskCounter = document.body.querySelector('.task-info');
  taskCounter.classList.add('task-info--visible');

  allTasksCounter();
  todoTasksCounter();
}

list.onclick = function(event) {
  const listElem = event.target;

  if (listElem.tagName != 'BUTTON') {
    return;
  }

  const getCurrentTask = listElem.closest('.created__task');
  deleteTask(getCurrentTask);
};

function completeTask(event) {
  const target = event.target;

  if (event.target.tagName != 'INPUT') {
    return;
  }

  const taskContainer = target.closest('.created__task');

  const checkBoxStatus = taskContainer.querySelector('.status');
  if (checkBoxStatus.checked) {
    taskContainer.classList.add('success');

    doneTasksCounter();
  } else {
    taskContainer.classList.remove('success');

    doneTasksCounter();
  }
}

const taskRemoveBtn = document.body.querySelector('.task-remove');

function taskBtn() {
  if (!taskRemoveBtn.classList.contains('task-remove--active')) {
    taskRemoveBtn.classList.add('task-remove--active');

    for (let getTask of document.body.querySelectorAll('.created__task')) {
      getTask.classList.add('created__task--remove');

      setTimeout(() => {
        getTask.remove();
        todoTasksCounter();
      }, 500);
    }
  }

  setTimeout(() => taskRemoveBtn.classList.remove('task-remove--active'), 1000);
}

function deleteTask(oneTask) {
  oneTask.classList.add('created__task--remove');

  setTimeout(() => {
    oneTask.remove();
    todoTasksCounter();
    doneTasksCounter();
  }, 500);
};

let totalSumTasks = 0;

function allTasksCounter() {
  totalSumTasks++;

  const totalTasks = document.body.querySelector('.task-couter__total');
  totalTasks.innerHTML = totalSumTasks;
}

function todoTasksCounter() {
  const sumTasks = list.children.length;

  const todoTasks = document.body.querySelector('.task-couter__todo');
  todoTasks.innerHTML = sumTasks;
}

function doneTasksCounter() {
  const allDoneTasks = document.body.querySelectorAll('.created__task.success');

  const doneTasks = document.body.querySelector('.task-couter__done');
  doneTasks.innerHTML = allDoneTasks.length;
}

function deleteTasksPopUp() {
  const popUp = document.body.querySelector('.asking-popup');
  popUp.classList.add('asking-popup--visible');
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

const clock = document.createElement('code');
setInterval(function() {
  const date = new Date();

  const time = [
    '0' + date.getHours(),
    '0' + date.getMinutes(),
    '0' + date.getSeconds()
  ].map((current) => current.slice(-2)).join(':');

  clock.className = 'clock';
  clock.innerHTML = time;
  document.body.append(clock);
}, 1000);





