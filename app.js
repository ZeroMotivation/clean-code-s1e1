const taskInput = document.querySelector(".task-row__input");
const addButton = document.querySelector(".task-row__add-button");
const incompleteTaskHolder = document.querySelector(".tasks-list_incompleted");
const completedTasksHolder = document.querySelector(".tasks-list_completed");

const createNewTaskElement = function(taskString) {
    const listItem = document.createElement("li");
    listItem.classList.add("list-item");
    listItem.innerHTML = `
        <input class="list-item__complete-check" type="checkbox">
        <p class="list-item__task">${taskString}</p>
        <input class="list-item__input_disabled input" type="text">
        <button class="list-item__edit-button button">Edit</button>
        <button class="list-item__remove-button button">
            <img class="list-item__remove-icon" src="./remove.svg" alt="">
        </button>`

    return listItem;
}

const addTask = function() {
    if (!taskInput.value) return;
    const  listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem);
    listItem.querySelector(".list-item__complete-check").addEventListener("change", toggleTask);
    taskInput.value = "";
}

const editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    let listItem=this.parentNode;

    let editInput=listItem.querySelector('input[type=text]');
    let label=listItem.querySelector("label");
    let editBtn=listItem.querySelector(".edit-button");
    let containsClass=listItem.classList.contains("editmode");

    if(containsClass){
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    listItem.classList.toggle("editmode");
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
        return;
    }
    incompleteTaskHolder.appendChild(listItem);
}

const bindTaskEvents = function(taskListItem) {
    const editButton = taskListItem.querySelector(".list-item__edit-button");
    const deleteButton = taskListItem.querySelector(".list-item__remove-button");

    editButton.addEventListener("click", editTask);
    deleteButton.addEventListener("click", deleteTask);
}


// for (let i = 0; i < incompleteTaskHolder.children.length; i++){
//     bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
// }

// for (let i = 0; i < completedTasksHolder.children.length; i++){
//     bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
// }

addButton.addEventListener("click", addTask);
