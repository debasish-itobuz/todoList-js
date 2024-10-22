const inputBox = document.querySelector(".input");
const todoContainer = document.querySelector(".todo-container");
const allTask = document.querySelector(".all-task");
const activeTask = document.querySelector(".active-task");
const completedTask = document.querySelector(".completed-task");
const clearCompletedTask = document.querySelector(".clear-completed-task");
const addItem = document.querySelector("#add-btn");
let array = [];

function check(inputVal, arr) {
  if (!inputVal) {
    inputBox.value = "";
    return false;
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].title === inputVal) {
      alert("same task...");
      return false;
    }
  }
  return true;
}

function render(arrayToRender) {
  todoContainer.innerHTML = ""; 

  for (let i = 0; i < arrayToRender.length; ++i) {
    const itemDiv = document.createElement("div");
    itemDiv.setAttribute(
      "class",
      "d-flex justify-content-between taskBox p-3 my-2 mx-auto align-items-center"
    );

    const itemTitle = document.createElement("div");
    itemTitle.setAttribute("class", "fs-3 px-2 input-text mr-10");

    if (arrayToRender[i].isEditing) {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = arrayToRender[i].title;
      editInput.setAttribute("class", "form-control fs-3");
      editInput.setAttribute(
        "onblur",
        `saveEditTask('${array.indexOf(arrayToRender[i])}', this.value)`
      );
      editInput.setAttribute(
        "onkeyup",
        `if(event.key === 'Enter') saveEditTask('${array.indexOf(
          arrayToRender[i]
        )}', this.value)`
      );
      itemTitle.appendChild(editInput);
      editInput.focus();
    } else {
      itemTitle.innerText = arrayToRender[i].title;
    }

    if (arrayToRender[i].completed) {
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
    completedIcon.setAttribute(
      "onclick",
      `completeTask('${array.indexOf(arrayToRender[i])}')`
    );

    const editIcon = document.createElement("i");
    editIcon.setAttribute(
      "class",
      "fa-solid fa-edit border border-2 bg-body-secondary p-2 fs-3 editTask"
    );
    editIcon.setAttribute(
      "onclick",
      `editTask('${array.indexOf(arrayToRender[i])}')`
    );

    const deleteIcon = document.createElement("i");
    deleteIcon.setAttribute(
      "class",
      "fa-solid fa-trash border border-2 bg-body-secondary p-2 fs-3 deleteTask"
    );
    deleteIcon.setAttribute(
      "onclick",
      `delTask('${array.indexOf(arrayToRender[i])}')`
    );

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
    // Do not allow editing a completed task
    return;
  }
  array[i].isEditing = true;
  render(array);
}

function saveEditTask(i, newValue) {
  const trimmedNewValue = newValue.trim();

  if (trimmedNewValue) {
    if (trimmedNewValue !== array[i].title) {
      // Only update if the new value is different from the current task title
      array[i].title = trimmedNewValue;
    }
  }

  // Always exit edit mode
  array[i].isEditing = false;
  render(array);
}

function delTask(i) {
  array.splice(i, 1);
  render(array);
}

function completeTask(i) {
  array[i].completed = !array[i].completed; // Toggle completed status
  render(array);
}

function filter(filterType) {
  if (filterType === "all") render(array);
  else if (filterType === "active") {
    const active = array.filter((item) => !item.completed);
    render(active);
  } else if (filterType === "completed") {
    const completed = array.filter((item) => item.completed);
    render(completed);
  }
}

// Clear completed tasks
clearCompletedTask.addEventListener("click", () => {
  console.log("Before clearing completed tasks:", array); // Debug log
  array = array.filter((item) => !item.completed); // Remove completed tasks
  console.log("After clearing completed tasks:", array); // Debug log
  render(array); // Re-render the updated array
});

// Filter task lists
allTask.addEventListener("click", () => {
  filter("all");
});

activeTask.addEventListener("click", () => {
  filter("active");
});

completedTask.addEventListener("click", () => {
  filter("completed");
});

// Handle adding task with Enter key
inputBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addTask();
});

// Handle adding task with button click
addItem.addEventListener("click", () => {
  addTask();
});
