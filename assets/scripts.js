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

btnAddTask.addEventListener('click', function() {
    console.log('btn clicked');
    if(!taskName.value) {
        alert('Hãy nhập task ở bên dưới')
        return false;
    }

    let tasks = []
    tasks.push({ name: taskName.value })
    console.log(tasks)
    taskName.value = ''

    renderTasks(tasks)
})
 
function renderTasks(tasks = []){
    let content = '<ul>'

    tasks.forEach((task) => {

        content += `<li>
                <div id="task" onclick="">
                    <div class="task-content" id="task-line">
                        ${task.name}
                    </div>
                    <div class="actions">
                        <div>
                            <button class="delete-btn">
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