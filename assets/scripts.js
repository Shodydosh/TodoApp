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
let marks = getMarkFromLocalStorage();

renderTasks(tasks);

btnAddTask.addEventListener('click', function () {
    console.log('btn clicked');
    if (!taskName.value) {
        alert('Hãy nhập task ở bên dưới!!!')
        return false;
    }

    // Kiem tra xem local storage co task chua, neu 0 thi cho bang mang rong
    // JSON.parse de convert du lieu -> array

    var selectedValue = document.getElementById("type").value;

    if (selectedValue === 'hide') {
        alert('Please choose the type of task')
        // console.log("hide")
        return false;
    }
    else {
        let tasks = getTaskFromLocalStorage();
        let marks = getMarkFromLocalStorage();

        tasks.push({ name: taskName.value })
        marks.push({ name: 0})
        taskName.value = ''

        // ham convert tasks sang string
        localStorage.setItem('tasks', JSON.stringify(tasks))
        localStorage.setItem('marks', JSON.stringify(marks))

        off()
        renderTasks(tasks, marks)
        getSelectValue()
    }
})

function getTaskFromLocalStorage() {
    // neu tasks co thi parse -> array
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
}

function getMarkFromLocalStorage() {
    // neu marks co thi parse -> array
    return localStorage.getItem('marks') ? JSON.parse(localStorage.getItem('marks')) : []
}

function deleteTask(id) {
    // if(confirm('mun xoa 0 z??')){

    // lay tasks tu storage
    let tasks = getTaskFromLocalStorage()
    let marks = getMarkFromLocalStorage()

    // xoa tasks o vi tri id
    tasks.splice(id, 1)
    marks.splice(id, 1)

    // ghi tasks lai vao trong localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('marks', JSON.stringify(marks))

    //chay lai giao dien
    renderTasks(tasks, marks);
    // }
}

// ADDING TOAST MSG & DELETING TOAST MSG

const button = document.getElementById('add-btn')
const toast = document.querySelector('.toast')
const closeToastBtn = document.querySelector('.close')

// function getMarkFromLocalStorage() {
//     return localStorage.getItem()
// }

function renderTasks(tasks = [], marks = []) {

    // if(localStorage.getItem('tasks') === []){
    //     let content = '<p>Chưa có task nào</p>'
    // }
    // else {

    let content = '<ul class="tasks">'

    tasks.forEach((task, index) => {

        console.log(index);

        let marks = getMarkFromLocalStorage()
        // console.log(marks[index].name);
        if(marks[index].name == '1') {
            content += `<li>
                        <div class="taskItem marked" onclick="">
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
        }
        else {
            content += `<li>
                        <div class="taskItem" onclick="">
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
        }

    })

    content += '</ul>'
    // }

    document.querySelector('#result').innerHTML = content

    const toastDelete = document.querySelector('.toast-delete')
    const closeToastBtn = document.querySelector('.delete-close')
    const taskDeleteBtn = document.querySelectorAll('.delete-btn')

    for (let i = 0; i < taskDeleteBtn.length; i++) {
        taskDeleteBtn[i].addEventListener("click", function () {
            toastDelete.classList.add('active');

            setTimeout(() => {
                toastDelete.classList.remove('active');
            }, 3000)

            closeToastBtn.addEventListener('click', () => {
                toastDelete.classList.remove('active');
            })
        })
    }
    
    // MARKED TASK 

    const taskMark = document.querySelectorAll('.task-content');
    const markedTask = document.querySelectorAll('.taskItem');

    for (let i = 0; i < taskMark.length; i++) {
        taskMark[i].addEventListener("click", function () {

            // console.log("marked");
            markedTask[i].classList.toggle("marked");

            let marks = getMarkFromLocalStorage()
        
            // thay tasks o vi tri i
            if(marks[i]){

                if(marks[i].name == '1'){
                    console.log("unmarked");
                    marks.splice(i, 1, {name: 0});
                }
                else{
                    console.log("marked");
                    marks.splice(i, 1, {name: 1});
                }
            }
        
            // ghi tasks lai vao trong localStorage
            localStorage.setItem('marks', JSON.stringify(marks))
        })
    }
}


button.addEventListener('click', () => {
    toast.classList.add('active');

    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000)
})

closeToastBtn.addEventListener('click', () => {
    toast.classList.remove('active');
})


/// SELECT
var selectedValue = document.getElementById("type").value;

function getSelectValue() {
    var selectedValue = document.getElementById("type").value;
    if (selectedValue === 'hide') {
        alert('Please choose the type of task')
        return;
    }
    else {
        console.log(selectedValue)
    }
}

// console.log(localStorage.getItem('marks'))