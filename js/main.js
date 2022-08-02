import {ToDo} from './todo.js';
import {ToDoList} from './todoList.js';


let todoList = new ToDoList();
let completedList = new ToDoList();
const getEle = (id) =>{
    return document.getElementById(id);
}

// Ham them todo
const addToDo = () =>{
    let txtToDo = getEle("newTask").value;
    let ulTodo = getEle("todo"); 

    if(txtToDo != ""){
        let td = new ToDo(txtToDo,'todo');
        todoList.addToDo(td);
    }
    // console.log(todoList.tdList);
    // Goi ham
    showToDoList(ulTodo);
    // Clear gia tri vua nhap
    getEle("newTask").value = ""; 
}

getEle("addItem").addEventListener('click',()=>{
    addToDo();
});

// Ham hien thi todo
const showToDoList = (ulTodo) =>{
    ulTodo.innerHTML = todoList.renderToDo();
}
const showCompleteList = (ulCompleted) =>{
    ulCompleted.innerHTML = completedList.renderToDo();
}

// Ham delete todo
const deleteToDo = (e) =>{
    let tdIndex = e.currentTarget.getAttribute("data-index");
    let status = e.currentTarget.getAttribute("data-status");
    let ulToDo = getEle("todo");
    let ulCompleted = getEle("completed");

    if(status == 'todo'){
        todoList.removeToDo(tdIndex);
        showToDoList(ulToDo);
    }else if(status == 'completed'){
        completedList.removeToDo(tdIndex);
        showCompleteList(ulCompleted);
    }else{
        alert("Cannot delete todo!");
    }
}

window.deleteToDo = deleteToDo;

const completeToDo = (e) =>{
    let tdIndex = e.currentTarget.getAttribute("data-index");
    let status = e.currentTarget.getAttribute("data-status");
    let ulToDo = getEle("todo");
    let ulCompleted = getEle("completed");
    if(status == "todo"){
        let completedItem = todoList.tdList.slice(tdIndex, tdIndex+1);
        let objToDo = new ToDo(completedItem[0].textTodo,"completed");

        moveToDo(todoList,completedList,objToDo,tdIndex);
        // console.log(todoList.tdList);
        // console.log(completedList.tdList);
        showToDoList(ulToDo);
        showCompleteList(ulCompleted);
    }else if(status == "completed"){
        let undoItem = completedList.tdList.slice(tdIndex, tdIndex+1);
        let objToDo = new ToDo(undoItem[0].textTodo,"todo");

        moveToDo(completedList,todoList,objToDo,tdIndex);
        showToDoList(ulToDo);
        showCompleteList(ulCompleted);
    }else{
        alert("Cannot move todo");
    }
}

window.completeToDo = completeToDo;

const moveToDo = (depart,arrival,obj,tdIndex) =>{
    // Remove todo from depart
    depart.removeToDo(tdIndex)

    // Add todo to arrival
    arrival.addToDo(obj);
}

const sortASC = (e) =>{
    let ulToDo = getEle("todo");
    todoList.sortToDoList(false);
    showToDoList(ulToDo);
}
const sortDES = (e) =>{
    let ulToDo = getEle("todo");
    todoList.sortToDoList(true);
    showToDoList(ulToDo);
}

window.sortASC = sortASC; 
window.sortDES = sortDES; 