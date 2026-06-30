let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
localStorage.setItem("tasks", JSON.stringify(tasks));
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value.trim();

    if (task == "") return;

    let now = new Date();

    let time =
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0");

    // 👇 اضافه کردن به آرایه واقعی
    tasks.push({
    id: Date.now(),
    text: task,
    time: time
});

    saveTasks(); // 💾 ذخیره

    renderTasks(); // 🔄 دوباره نمایش

    input.value = "";
    

    
}
function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((t) => {
    let li = document.createElement("li");
    li.className = "task";

    li.innerHTML = `
      <div class="buttons">
        <button onclick="pinTask(${t.id})">📍</button>
        <button onclick="editTask(${t.id})">✏️</button>
        <button onclick="deleteTask(${t.id})">🗑️</button>
      </div>

      <div class="taskInfo">
        <span class="taskText">📌 ${t.text}</span>
        <div class="taskTime">🕒 ${t.time}</div>
      </div>
    `;

    list.appendChild(li);
  });
}

function editTask(id) {
  let task = tasks.find(t => t.id === id);

  let newTask = prompt("کار جدید", task.text);

  if (newTask && newTask.trim() !== "") {
    task.text = newTask.trim();
    saveTasks();
    renderTasks();
  }
}


function pinTask(id) {
  let index = tasks.findIndex(t => t.id === id);

  let task = tasks.splice(index, 1)[0];
  tasks.unshift(task);

  saveTasks();
  renderTasks();
}
function deleteTask(id){

    let index = tasks.findIndex(t => t.id === id);

    if(index === -1) return;

    let element = document.querySelectorAll(".task")[index];

    element.classList.add("removing");

    setTimeout(()=>{

        tasks.splice(index,1);

        saveTasks();

        renderTasks();

    },350);

}
const btn = document.getElementById("themeToggle");

btn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
});
renderTasks();



