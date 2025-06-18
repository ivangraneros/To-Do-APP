
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let currentFilter = 'all';

  function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();
    if (text !== "") {
      tasks.push({ text: text, completed: false });
      input.value = "";
      saveTasks();
    }
  }

  function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
      if (
        currentFilter === 'all' ||
        (currentFilter === 'completed' && task.completed) ||
        (currentFilter === 'pending' && !task.completed)
      ) {
        const li = document.createElement("li");
        li.className = "list-group-item" + (task.completed ? " completed" : "");
        li.innerHTML = `
          <span onclick="toggleComplete(${index})" style="cursor:pointer;">${task.text}</span>
          <div>
            <button class="btn btn-sm btn-success" onclick="toggleComplete(${index})">✔</button>
            <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">🗑️</button>
          </div>
        `;
        list.appendChild(li);
      }
    });
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }

  function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
  }

  window.setFilter = function(filter) {
    currentFilter = filter;
    renderTasks();
  };

  window.addTask = addTask; // Exponé la función al global para que el HTML pueda usarla

  renderTasks();

