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

// #overlay .task-input .text-input{

let btnAddTask = document.getElementById('add-btn')
let taskName = document.querySelector(".text-input");

let tasks = getTaskFromLocalStorage();

renderTasks(tasks);

btnAddTask.addEventListener('click', function() {
    console.log('btn clicked');
    if(!taskName.value) {
        alert('Hãy nhập task ở bên dưới')
        return false;
    }

    // Kiem tra xem local storage co task chua, neu 0 thi cho bang mang rong
    // JSON.parse de convert du lieu -> array
    let tasks = getTaskFromLocalStorage();

    tasks.push({ name: taskName.value })
    taskName.value = ''

    // ham convert tasks sang string
    localStorage.setItem('tasks', JSON.stringify(tasks))

    renderTasks(tasks)
})

function getTaskFromLocalStorage() {
    
    // neu tasks co thi parse -> array
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
}

function markedTask(id){
    
}

function deleteTask(id){
    if(confirm('mun xoa 0')){
        // lay tasks tu storage
        let tasks = getTaskFromLocalStorage()
        
        // xoa tasks o vi tri id
        tasks.splice(id, 1)
        
        // ghi tasks lai vao trong localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks))
        
        //chay lai giao dien
        renderTasks();
    }
}

function renderTasks(tasks = []){
   let content = '<ul class="tasks">'

   tasks.forEach((task, index) => {

       content += `<li>
               <div id="task" onclick="markedTask(${index})">
                   <div class="task-content" id="task-line">
                       ${task.name}
                   </div>
                   <div class="actions">
                       <div>
                           <button class="delete-btn" onclick="deleteTask(${index})">
                               <i class="fas fa-xmark">&times</i>
                           </button>
                       </div>
                   </div>
               </div>
           </li>`
           
   })

   content += '</ul>'

   document.querySelector('#result').innerHTML = content
}
