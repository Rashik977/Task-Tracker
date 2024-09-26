const taskInput = document.querySelector(".task-input");
const taskAddBtn = document.querySelector(".task-add-btn");
const taskList = document.querySelector(".task-list");

const taskArray = JSON.parse(localStorage.getItem("tasks")) || [];

//animation variables
const fadeOut = 500;
const greyOut = 500;

//add task to the array
const addTask = () => {
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
  renderTasks(true);
};

//render tasks from the array
const renderTasks = (addAnimation = false) => {
  //add to local storage
  localStorage.setItem("tasks", JSON.stringify(taskArray));

  //clear task list
  taskList.innerHTML = "";
  taskArray.forEach((task, i) => {
    // create elements
    const li = document.createElement("li");
    const wrapper = document.createElement("div");
    const checkbox = document.createElement("input");
    const deleteIcon = document.createElement("img");
    const text = document.createElement("span");
    const date = document.createElement("span");

    //delete icon attributes
    deleteIcon.classList.add("delete-icon");
    deleteIcon.src = "./icons/trash.png";
    deleteIcon.addEventListener("click", deleteTask);

    //checkbox attributes
    checkbox.classList.add("checkbox");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", toggleDone);

    // list style
    wrapper.classList.add("task-wrapper");
    date.classList.add("hide");
    li.classList.add("task-item");

    //animation for when a task is added
    if (i === 0 && addAnimation) {
      li.classList.add("fade-in");
    } else {
      li.classList.remove("fade-in");
    }

    //check if task is done
    if (task.isDone) {
      checkbox.checked = true;
      li.classList.add("done");
    }

    //add the task name
    text.textContent = task.taskName;
    date.textContent = task.createdAt;

    //append
    wrapper.appendChild(checkbox);
    wrapper.appendChild(text);
    li.appendChild(wrapper);
    li.appendChild(deleteIcon);
    li.appendChild(date);
    taskList.appendChild(li);
  });
};

//sort the tasks based on date and done status
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
  const taskElement = event.target.parentElement;
  const date = taskElement.lastChild.textContent;

  //check and remove fade-in class to not conflict with animation
  if (taskElement.classList.contains("fade-in")) {
    taskElement.classList.remove("fade-in");
  }

  // Apply fade-out class first
  taskElement.classList.add("fade-out");

  // Wait for animation to finish, then remove the task
  setTimeout(() => {
    taskArray.forEach((task, index) => {
      if (task.createdAt.toString() === date) {
        taskArray.splice(index, 1);
      }
    });
    renderTasks();
  }, fadeOut);
};

const toggleDone = (event) => {
  const taskElement = event.target.parentElement.parentElement;
  const date = taskElement.lastChild.textContent;

  //check and remove fade-in class to not conflict with animation
  if (taskElement.classList.contains("fade-in")) {
    taskElement.classList.remove("fade-in");
  }

  // toggling grey in and out animations
  if (taskElement.classList.contains("done")) {
    taskElement.classList.remove("done");
    taskElement.classList.add("grey-in");
  } else {
    taskElement.classList.add("grey-out");
  }

  // Wait for animation to finish, then toggle the task
  setTimeout(() => {
    taskArray.forEach((task) => {
      if (task.createdAt.toString() === date) {
        task.isDone = !task.isDone;
      }
    });
    sortTasks();
    renderTasks();
  }, greyOut);
};

//event listeners
taskAddBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

//initial render
renderTasks();
