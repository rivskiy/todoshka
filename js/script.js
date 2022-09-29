const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const doneList = document.querySelector('#doneList')
const noTask = document.querySelector('#noTask');
const noDone = document.querySelector('#noDone');


form.addEventListener('submit', createTask);

tasksList.addEventListener('click', removeTask);

doneList.addEventListener('click', removeTask);


tasksList.addEventListener('click', doneTask);

function createTask(e) {

  e.preventDefault();

  const taskText = taskInput.value

  const taskHtml = `
                    <li class="tasks__item">
                      <span>${taskText}</span>
                      <div class="tasks__btns">
                        <button class="btn tasks__done-btn" type="button">Done</button>
                        <button class="btn" type="button">Remove</button>
                      </div>
                    </li>
                  `;
  tasksList.insertAdjacentHTML('beforeend', taskHtml);

  taskInput.value = '';
  taskInput.focus();

  if (tasksList.children.length > 1) {
    noTask.style.display = 'none';
  };

};

function removeTask(e) {
  if (e.target.innerHTML === 'Remove') {
    e.target.closest('.tasks__item').style.marginLeft = '100vw';
    setTimeout(() => {
      e.target.closest('.tasks__item').remove();
      if (tasksList.children.length === 1) {
        noTask.style.display = 'block';
      };
      if (doneList.children.length === 1) {
        noDone.style.display = 'block';
      };
    }, 200)
  };
};

function doneTask(e) {
  if (e.target.innerHTML === 'Done') {
    doneList.appendChild(e.target.closest('.tasks__item'));
    doneList.querySelector('.tasks__done-btn').remove();
  };
  if (doneList.children.length > 1) {
    noDone.style.display = 'none';
  };
};

