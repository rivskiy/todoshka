const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const doneList = document.querySelector('#doneList')
const noTask = document.querySelector('#noTask');
const noDone = document.querySelector('#noDone');

let tasks = [];

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'))
  tasks.forEach(task => {
    renderTask(task)
    checkNoTasks()
    getQuantity()
  });
}

form.addEventListener('submit', createTask);
tasksList.addEventListener('click', removeTask);
doneList.addEventListener('click', removeTask);
tasksList.addEventListener('click', doneTask);

function createTask(e) {

  e.preventDefault();

  const taskText = taskInput.value
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false
  };

  tasks.push(newTask)
  saveToLocalStorage()

  renderTask(newTask)

  taskInput.value = '';
  taskInput.focus();

  getQuantity()
  checkNoTasks()
};

function removeTask(e) {
  if (e.target.innerHTML === 'Remove') {
    e.target.closest('.tasks__item').style.marginLeft = '100vw';
    setTimeout(() => {

      const id = Number(e.target.closest('.tasks__item').id)

      tasks = tasks.filter((task) => task.id !== id)
      saveToLocalStorage()
      e.target.closest('.tasks__item').remove();

      getQuantity()
      checkNoTasks()
    }, 200)
  };
};

function doneTask(e) {
  if (e.target.innerHTML === 'Done') {
    const id = Number(e.target.closest('.tasks__item').id)
    const task = tasks.find((task) => task.id === id)
    task.done = !task.done
    saveToLocalStorage()

    doneList.appendChild(e.target.closest('.tasks__item'));
    doneList.querySelector('.tasks__done-btn').remove();
  };

  getQuantity()
  checkNoTasks()
};

function checkNoTasks() {

  if (tasksList.children.length !== 1) {
    noTask.style.display = 'none';
  } else {
    noTask.style.display = 'block';
  };

  if (doneList.children.length !== 1) {
    noDone.style.display = 'none';
  } else {
    noDone.style.display = 'block';
  }
};

function  getQuantity() {
  const taskQuantity = document.querySelector('#taskQuantity');
  taskQuantity.innerHTML = tasksList.children.length - 1
  const doneQuantity = document.querySelector('#doneQuantity')
  doneQuantity.innerHTML = doneList.children.length - 1
  // const taskQuantity = document.querySelector('#taskQuantity');
  // taskQuantity.innerHTML = tasks.length
  // const doneQuantity = document.querySelector('#doneQuantity')
  // doneQuantity.innerHTML = doneList.children.length - 1
};

function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
  const taskHtml = `
  <li class="tasks__item" id="${task.id}">
    <span>${task.text}</span>
    <div class="tasks__btns">
      <button class="btn tasks__done-btn" type="button">Done</button>
      <button class="btn" type="button">Remove</button>
    </div>
  </li>
`;
tasksList.insertAdjacentHTML('beforeend', taskHtml);
}
