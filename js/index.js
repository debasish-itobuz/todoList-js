const inputBox = document.querySelector(".input");
const todoContainer = document.querySelector(".todo-container");
const allTask = document.querySelector(".all-task");
const activeTask = document.querySelector(".active-task");
const completedTask = document.querySelector(".completed-task");
const clearCompletedTask = document.querySelector(".clear-completed-task");
const addItem = document.querySelector("#add-btn");
const array = [];

function check(inputVal, arr) {
  if (!inputVal) {
    inputBox.value = "";
    return false;
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].title === inputVal) {
      alert("Same task already exists...");
      return false;
    }
  }
  return true;
}

function render(array) {
  todoContainer.innerHTML = ""; // Clear existing content to avoid duplicate entries
  for (let i = 0; i < array.length; ++i) {
    const itemDiv = document.createElement("div");
    itemDiv.setAttribute(
      "class",
      "d-flex justify-content-between taskBox p-3 my-2 mx-auto align-items-center"
    );

    const itemTitle = document.createElement("div");
    itemTitle.setAttribute("class", "fs-3 px-2 input-text");

    if (array[i].isEditing) {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = array[i].title;
      editInput.setAttribute("class", "form-control fs-3");
      editInput.setAttribute("onblur", `saveEditTask('${i}', this.value)`);
      editInput.setAttribute(
        "onkeyup",
        `if(event.key === 'Enter') saveEditTask('${i}', this.value)`
      );
      itemTitle.appendChild(editInput);
      editInput.focus(); // Automatically focus the input when editing
    } else {
      itemTitle.innerText = array[i].title;
    }

    if (array[i].completed) {
      itemTitle.classList.add("line-through");
    } else {
      itemTitle.classList.remove("line-through");
    }

    const actionWrapper = document.createElement("div");
    actionWrapper.setAttribute("class", "d-flex gap-3");

    const completedIcon = document.createElement("i");
    completedIcon.setAttribute(
      "class",
      "fa-solid fa-check border border-2 bg-body-secondary p-2 fs-3 completeTask"
    );
    // completedIcon.setAttribute("onclick", `completeTask('${i}')`);
    completedIcon.setAttribute(
      "onclick",
      `completeTask('${array.indexOf(array[i])}')`
    );

    const editIcon = document.createElement("i");
    editIcon.setAttribute(
      "class",
      `fa-solid fa-edit border border-2 bg-body-secondary p-2 fs-3 editTask ${
        array[i].completed ? "disabled" : ""
      }`
    );
    if (!array[i].completed) {
      editIcon.setAttribute("onclick", `editTask('${i}')`);
    }

    const deleteIcon = document.createElement("i");
    deleteIcon.setAttribute(
      "class",
      "fa-solid fa-trash border border-2 bg-body-secondary p-2 fs-3 deleteTask"
    );
    deleteIcon.setAttribute("onclick", `delTask('${i}')`);

    actionWrapper.append(completedIcon, editIcon, deleteIcon);
    itemDiv.append(itemTitle, actionWrapper);

    todoContainer.append(itemDiv);
  }
}

function addTask() {
  const inputVal = inputBox.value.trim();
  if (check(inputVal, array)) {
    array.push({
      title: inputVal,
      completed: false,
      isEditing: false,
    });
  }
  render(array);
  inputBox.value = "";
}

function editTask(i) {
  if (array[i].completed) {
    alert("Cannot edit a completed task!");
    return;
  }
  array[i].isEditing = true; // Set the task to editing mode
  render(array); // Re-render the list to display the input field
}

function saveEditTask(i, newValue) {
  if (newValue.trim()) {
    array[i].title = newValue.trim(); // Update the task's title
  }
  array[i].isEditing = false; // Exit editing mode
  render(array); // Re-render the list to display the updated task
}

function delTask(i) {
  array.splice(i, 1); // Remove the task
  render(array); // Re-render the list
}

function completeTask(i) {
  array[i].completed = !array[i].completed; // Toggle completed status
  render(array); // Re-render the list
}

function filter(filterType) {
  if (filterType === "all") render(array);
  else if (filterType === "active") {
    let active = array.filter((item) => item.completed === false);
    render(active);
  } else if (filterType === "completed") {
    let completed = array.filter((item) => item.completed === true);
    render(completed);
  }
}

// Event listeners for filter buttons
allTask.addEventListener("click", () => {
  filter("all");
});

activeTask.addEventListener("click", () => {
  filter("active");
});

completedTask.addEventListener("click", () => {
  filter("completed");
});

// Event listeners for adding tasks
inputBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addTask();
});

addItem.addEventListener("click", () => {
  addTask();
});
