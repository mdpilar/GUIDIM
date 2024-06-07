const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

// Tasks Container
const tasksContainer = document.getElementById('tasksContainer');

const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
    dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
    dateMonth.textContent = date.toLocaleString('es', { month: 'short' });
    dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};

const addNewTask = event => {
    event.preventDefault();
    const { value } = event.target.taskText;
    const maxLength = 40;
    if (!value) return;
    if (value.length > maxLength) {
        alert(`La tarea no puede tener más de ${maxLength} caracteres.`);
        return;
    }
    const task = createTaskElement(value);
    tasksContainer.prepend(task);
    saveTasks();
    event.target.reset();
};

const createTaskElement = (value, isDone = false) => {
    const task = document.createElement('div');
    task.classList.add('task', 'roundBorder');
    if (isDone) {
        task.classList.add('done');
    }
    task.addEventListener('click', changeTaskState);
    task.textContent = value;
    return task;
};

const changeTaskState = event => {
    event.target.classList.toggle('done');
    saveTasks();
};

const saveTasks = () => {
    const tasks = [];
    tasksContainer.childNodes.forEach(task => {
        tasks.push({
            text: task.textContent,
            done: task.classList.contains('done')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskElement = createTaskElement(task.text, task.done);
        tasksContainer.appendChild(taskElement);
    });
};

const order = () => {
    const done = [];
    const toDo = [];
    tasksContainer.childNodes.forEach(el => {
        el.classList.contains('done') ? done.push(el) : toDo.push(el);
    });
    return [...toDo, ...done];
};

const renderOrderedTasks = () => {
    order().forEach(el => tasksContainer.appendChild(el));
};

setDate();
loadTasks();
