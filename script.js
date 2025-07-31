let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const dueDateInput = document.getElementById("dueDate");
  const text = taskInput.value.trim();
  const dueDate = dueDateInput.value;

  if (!text) return alert("Please enter a task.");

  tasks.push({ text, completed: false, dueDate });
  taskInput.value = "";
  dueDateInput.value = "";
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function setFilter(f) {
  filter = f;
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  const taskCounter = document.getElementById("taskCounter");
  taskList.innerHTML = "";

  let filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onclick = () => toggleComplete(index);

    const label = document.createElement("span");
    label.innerText = `${task.text} ${task.dueDate ? "(Due: " + task.dueDate + ")" : ""}`;

    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = () => deleteTask(index);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(actions);
    taskList.appendChild(li);
  });

  taskCounter.textContent = `Tasks: ${filteredTasks.length}`;
}

renderTasks();
