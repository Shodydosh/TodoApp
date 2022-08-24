//! Chức năng
//! 1. Thêm công việc + loại công việc 
//! 2. Xóa công việc
//! 3. Thay đổi trạng thái công việc

// SIDENAV OPEN&CLOSE

let todos;

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

// Toast msg
const toastAdd = document.querySelector('.toast')
const closeAddToastBtn = document.querySelector('.close')

const toastDelete = document.querySelector('.toast-delete')
const closeDeleteToastBtn = document.querySelector('.delete-close')

function toastDeleteMsg(){
    toastDelete.classList.add('active');

    setTimeout(() => {
        toastDelete.classList.remove('active');
    }, 3000)

    closeDeleteToastBtn.addEventListener('click', () => {
        toastDelete.classList.remove('active');
    })
}

function toastAddMsg(){
    toastAdd.classList.add('active');
    
    setTimeout(() => {
        toastAdd.classList.remove('active');
    }, 3000)

    closeAddToastBtn.addEventListener('click', () => {
        toastAdd.classList.remove('active');
    })
}


//! Truy cập 
let btnAddTask = document.getElementById("add-btn")
let todoInputEl = document.getElementById("text-input");
let todoListEl = document.querySelector(".tasks")

let PTAmount = document.getElementById("PTnum");
let BTAmount = document.getElementById("BTnum");

// API lấy danh sách công việc
let getTodos = async () => {
    try {
        let res = await axios.get("/todos");
        todos = res.data;

        renderTasks(todos);
    } catch (error) {
        console.log(error);
    }
}

const renderTasks = arr => {

    // count amount of task of each type
    let personalTasks = 0;
    let businessTasks = 0;
    if (arr.length != 0){
        arr.forEach(task => {
            if(task.type == "business") businessTasks += 1;
            else personalTasks += 1;
        });
    }
    PTAmount.innerText = personalTasks;
    BTAmount.innerText = businessTasks;

    todoListEl.innerHTML = "";

    // Kiểm tra danh sách công việc có trống hay không
    if (arr.length == 0) {
        todoListEl.innerHTML = `<p class="todos-empty">Không có công việc nào trong danh sách</p>`;
        return;
    }

    // hien thi danh sach
    let content = "";
    arr.forEach(task => {
        content += `
                    <div class="taskItem ${task.status ? "active-task" : ""}">
                        <div class="task-content" id="task-line">
                            <input 
                                class = "check-btn"
                                type="checkbox" ${task.status ? "checked" : ""}
                                onclick="toggleStatus(${task.id})"
                            />
                            ${task.title}
                        </div>
                        <div class="actions">
                            <div>
                                <button class="delete-btn" onclick="deleteTask(${task.id})">
                                    <i class="fas fa-xmark">&times</i>
                                </button>
                            </div>
                        </div>
                    </div>
            `
        }
    )

    todoListEl.innerHTML = content;
}

// Xóa công việc
const deleteTask = async (id) => {
    try {
        // Gọi API --> Xóa trên server
        await axios.delete(`/todos/${id}`);

        // Lọc ra các cv khác id của công việc muốn xóa
        todos = todos.filter(todo => todo.id != id);

        // Hiển thị lại trên giao diện
        toastDeleteMsg()
        renderTasks(todos)
    } catch (error) {
        console.log(error);
    }
}

// Thay đổi trạng thái công việc
const toggleStatus = async (id) => {
    try {
        // Lấy ra cv cần thay đổi
        let todo = todos.find(todo => todo.id == id);

        // Thay đổi trạng thái của cv đó : true -> false , false -> true
        todo.status = !todo.status;

        // Gọi API
        await axios.put(`/todos/${id}`, todo);

        // Hiển thị lên trên giao diện
        renderTasks(todos);
    } catch (error) {
        console.log(error);
    }
}

// Thêm công việc
const addTodo = async () => {
    try {
        // Lấy ra dữ liệu trong ô input
        let title = todoInputEl.value;
        let type = document.getElementById("task-type").value;

        // kiểm tra xem đã chọn loại task hay chưa
        if (type === 'hide') {
            alert('Hãy chọn loại công việc')
            return;
        }

        // Kiểm tra xem tiêu đề có trống hay không
        if (title == "") {
            alert("Tiêu đề công việc không được để trống");
            return;
        }

        // Tạo công việc mới
        let newTodo = {
            title: title,
            status: false, 
            type: type
        }

        // Gọi API tạo mới
        let res = await axios.post("/todos", newTodo);

        // Thêm cv mới vào mảng để quản lý
        todos.push(res.data);

        renderTasks(todos);
        todoInputEl.value = "";
        toastAddMsg();
        off();
    } catch (error) {
        console.log(error);
    }
}

// Thêm công việc bằng nút "THÊM"
btnAddTask.addEventListener("click", () => {
    addTodo();
})

// Thêm công việc bằng phím Enter
todoInputEl.addEventListener("keydown", (event) => {
    if (event.keyCode == 13) {
        addTodo();
    }
})

getTodos();

