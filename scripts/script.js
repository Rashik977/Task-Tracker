const taskInput = document.querySelector(".task-input");
const taskAddBtn = document.querySelector(".task-add-btn");
const taskList = document.querySelector(".task-list");
const taskArray = [];

taskAddBtn.addEventListener("click", () => {
  const task = taskInput.value;
  if (task) {
    taskArray.push({
      taskName: task,
      isDone: false,
      createdAt: Date.now(),
    });
  }
  taskInput.value = "";
  sortTasks();
  renderTasks();
});

const renderTasks = () => {
  taskList.innerHTML = "";
  taskArray.forEach((task) => {
    // create elements
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const deleteIcon = document.createElement("img");
    const text = document.createElement("span");

    //delete icon attributes
    deleteIcon.classList.add("delete-icon");
    deleteIcon.src = "./icons/trash.png";
    deleteIcon.addEventListener("click", deleteTask);

    //checkbox attributes
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", toggleDone);

    //append
    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteIcon);

    // list style
    li.classList.add("task-item");

    //check if task is done
    if (task.isDone) {
      checkbox.checked = true;
      li.classList.add("done");
    }

    //add the task name
    text.textContent = task.taskName;

    //append to list
    taskList.appendChild(li);
  });
};

const sortTasks = () => {
  taskArray.sort((a, b) => {
    if (a.isDone === b.isDone) {
      return b.createdAt - a.createdAt;
    } else {
      return a.isDone ? 1 : -1;
    }
  });
};

const deleteTask = (event) => {
  const taskName = event.target.previousElementSibling.textContent;
  taskArray.forEach((task, index) => {
    if (task.taskName === taskName) {
      taskArray.splice(index, 1);
    }
  });
  renderTasks();
};

const toggleDone = (event) => {
  const text = event.target.nextElementSibling.textContent;
  taskArray.forEach((task) => {
    if (task.taskName === text) {
      task.isDone = !task.isDone;
    }
  });
  sortTasks();
  renderTasks();
};
