//
// SIDENAV OPEN&CLOSE

function openNav() {
    // mySidenav.style.display = "block";
    document.getElementById("mySidenav").style.width = "100%";
}


/* Set the width of the mySidenav to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
}

//
// OVERLAY ADDING BUTTON

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}

//
// ADDING TASK FUNCTION

// let btnAddTask = document.querySelector('.add-btn');
// let taskName = document.querySelector('#text-input')

// btnAddTask.addEventListener('click', function() {
//     if(!taskName.value){
//         alert('Vui long');
//         return false;
//     }
//     else{
//         off();
//     }
// })

// function mark() {
//     document.getElementById("task-line").style.textDecoration = "line-through";
// }

// function unmark() {
//     document.getElementById("task-line").style.textDecoration = "none";
// }

//
// CHECKED FUNCTION


// SELECTORS

// const taskInput = document.querySelector(".task-input");
// const taskSubmit = document.querySelector(".add-btn");
// const taskList = document.querySelector(".tasks");

// // Event listeners

// taskSubmit.addEventListener('click', addNewTask);

// // Functions

// function addNewTask(event){
//     event.preventDefault();

    
//     if(taskInput.value === '') alert("You must write something!!");
//     else{
//         const taskDiv = document.createElement("div");
//         taskDiv.classList.add("task");
//             // create LI
//         const newtask = document.createElement("div");
//         newtask.innerText = taskInput.value;
//         taskInput.value = '';
//         newtask.classList.add('task-item');
//         newtask.id.add('task-line');

//         taskDiv.appendChild(newtask);

//         const action = document.createElement("div");
//         action.classList.add("actions");

//         // check delete button
//         const deleteButton = document.createElement('button');
//         deleteButton.innerHTML = '<i class="fas fa-xmark">&times</i>';
//         deleteButton.classList.add("delete-btn");
//         action.appendChild(deleteButton);

//         taskDiv.appendChild(action);
//         // append to list 
//         taskList.appendChild(taskDiv);
//         off();
//     }
    
// }