const taskInput = document.querySelector(".task-row__input");
const addButton = document.querySelector(".task-row__add-button");
const incompleteTaskHolder = document.querySelector(".tasks-list_incompleted");
const completedTasksHolder = document.querySelector(".tasks-list_completed");

const createNewTaskElement = (task) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-item");
    listItem.innerHTML = `
        <input class="list-item__complete-check" type="checkbox">
        <p class="list-item__task">${task}</p>
        <input class="list-item__input_disabled input" type="text">
        <button class="list-item__edit-button button">Edit</button>
        <button class="list-item__remove-button button">
            <img class="list-item__remove-icon" src="./remove.svg" alt="Remove task from list">
        </button>`

    return listItem;
}

const addTask = () => {
    if (!taskInput.value) return;

    const  listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTasksEvents(listItem);
    taskInput.value = "";
}

const editTask = function() {
    const listItem = this.parentNode;
    const editInput = listItem.querySelector(".input");
    const task = listItem.querySelector(".list-item__task");
    const containsClass = editInput.classList.contains("list-item__input_disabled");

    if(containsClass) {
        editInput.value = task.textContent;
        task.textContent = "";
        this.innerText = "Save";
    }
    else {
        task.textContent = editInput.value;
        this.innerText = "Edit";
    }
    editInput.classList.toggle("list-item__input_disabled");
}

const deleteTask = function() {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
}

const toggleTask = function() {
    const listItem = this.parentNode;
    if(this.checked) {
        completedTasksHolder.appendChild(listItem);
    }
    else {
        incompleteTaskHolder.appendChild(listItem);
    }
    this.nextElementSibling.classList.toggle('complete');
}

const bindTasksEvents = (taskListItem) => {
    const editButton = taskListItem.querySelector(".list-item__edit-button");
    const deleteButton = taskListItem.querySelector(".list-item__remove-button");
    const checkBox = taskListItem.querySelector(".list-item__complete-check");

    editButton.addEventListener("click", editTask);
    deleteButton.addEventListener("click", deleteTask);
    checkBox.addEventListener("change", toggleTask);
}

const bindExistingTasksEvents = (list) => list.querySelectorAll(".list-item").forEach(item => bindTasksEvents(item));

bindExistingTasksEvents(completedTasksHolder);
bindExistingTasksEvents(incompleteTaskHolder);

addButton.addEventListener("click", addTask);
