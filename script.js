const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks when page opens
window.onload = function () {
    loadTasks();
};

function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#taskList li").forEach((li) => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector("span").classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTask(task, completed = false) {
    const li = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent = task;

    if (completed) {
        taskText.classList.add("completed");
    }

    taskText.addEventListener("click", function () {
        taskText.classList.toggle("completed");
        saveTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function () {
        li.remove();
        saveTasks();
    });

    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function addTask() {
    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    createTask(task);
    saveTasks();

    taskInput.value = "";
    taskInput.focus();
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(task => {
        createTask(task.text, task.completed);
    });
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
const clearBtn = document.getElementById("clearBtn");

clearBtn.addEventListener("click", function () {
    taskList.innerHTML = "";
    localStorage.removeItem("tasks");
});