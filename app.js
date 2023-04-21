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

const addTask=function() {

    if (!taskInput.value) return;

    const  listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value="";
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
};

const deleteTask=function(){
    console.log("Delete Task...");

    let listItem=this.parentNode;
    let ul=listItem.parentNode;
    ul.removeChild(listItem);

}


const taskCompleted=function(){
    console.log("Complete Task...");
    let listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


const taskIncomplete=function(){
    console.log("Incomplete Task...");
    let listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

addButton.addEventListener("click",addTask);

const bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
    let checkBox=taskListItem.querySelector("input[type=checkbox]");
    let editButton=taskListItem.querySelector("edit-button");
    let deleteButton=taskListItem.querySelector("delete-button");

    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++){
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++){
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
