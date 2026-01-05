const form = document.getElementById("todoForm");
const input = document.getElementById("taskInput");
const table = document.getElementById("taskTable");
const themeBtn = document.getElementById("themeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let theme = localStorage.getItem("theme") || "light";

if (theme === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀️ Light Mode";
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render Tasks
function renderTasks() {
  table.innerHTML = "";
  tasks.forEach((task, index) => {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td class="${task.done ? "done" : ""}">${task.text}</td>
        <td>
          <input type="checkbox" ${task.done ? "checked" : ""} 
          onclick="toggleTask(${index})">
        </td>
        <td>
          <button onclick="deleteTask(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Add Task
form.addEventListener("submit", (e) => {
  e.preventDefault();
  tasks.push({ text: input.value, done: false });
  input.value = "";
  saveTasks();
  renderTasks();
});

// Toggle Done
function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

// Delete Task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Theme Toggle
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});

renderTasks();
