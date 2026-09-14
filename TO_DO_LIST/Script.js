const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");


addBtn.addEventListener("click", function () {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }


    const li = document.createElement("li");
    li.classList.add("task");


    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";


    const span = document.createElement("span");
    span.textContent = taskText;
    span.classList.add("task-text");


    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");


    checkbox.addEventListener("change", function () {

        span.classList.toggle("completed");

    });


    deleteBtn.addEventListener("click", function () {

        li.remove();

    });


    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);


    taskInput.value = "";

});