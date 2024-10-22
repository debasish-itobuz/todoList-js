const todoContainer = document.querySelector(".todo-container");
const inputBox = document.querySelector(".input");
const addBtn = document.querySelector("#add-btn");
const array = [];
const allTask = document.querySelector(".all-task");
const activeTask = document.querySelector(".active-task");
const completedTask = document.querySelector(".completed-task");
const clearCompletedTask = document.querySelector(".clear-completed-task");

function check(inputVal, arr) {
  if (!inputVal) {
    inputBox.value = "";
    return false;
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].title === inputVal) {
      alert("same task....");
      inputBox.value = "";
      return false;
    }
  }
  return true;
}

//print tasks
function render(array) {
  todoContainer.innerHTML = ""; //if not done append will happen(duplicate entries)
  for (let i = 0; i < array.length; ++i) {
    const itemDiv = document.createElement("div");
    itemDiv.setAttribute(
      "class",
      "d-flex justify-content-between taskBox p-3 my-2  mx-auto align-items-center"
    );

    const itemTitle = document.createElement("div");
    itemTitle.setAttribute("class", "fs-3 px-2 input-text");
    itemTitle.innerText = array[i].title;

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
      "fa-solid fa-check border border-2 bg-body-secondary p-2 fs-3  completeTask "
    );
    completedIcon.setAttribute("onclick", `completeTask('${i}')`);

    const deleteIcon = document.createElement("i");
    deleteIcon.setAttribute(
      "class",
      "fa-solid fa-trash border border-2 bg-body-secondary p-2 fs-3  deleteTask"
    );
    deleteIcon.setAttribute("onclick", `delTask('${i}')`);

    actionWrapper.append(completedIcon, deleteIcon);
    itemDiv.append(itemTitle, actionWrapper);

    todoContainer.append(itemDiv);

    //     todoContainer.innerHTML += `<div class=" d-flex justify-content-between taskBox p-3 my-2  mx-auto align-items-center">
    //   <div class="fs-3 px-2 input-text ${
    //     array[i].completed ? "line-through" : ""
    //   }">${array[i].title}</div>
    //   <div class="d-flex gap-3">
    //       <i class="fa-solid fa-check border border-2 bg-body-secondary p-2 fs-3  completeTask " onclick="completeTask('${i}')"></i>
    //       <i class="fa-solid fa-trash border border-2 bg-body-secondary p-2 fs-3  deleteTask" onclick="delTask('${i}')"></i>
    //   </div>
    // </div>`;
  }
}

function addTask() {
  const inputVal = inputBox.value.trim();
  if (check(inputVal, array)) {
    array.push({
      title: inputVal,
      completed: false,
    });
    render(array);
    inputBox.value = "";
  }
}

function filter(filterType) {
  if (filterType === "All") {
    render(array);
  } else if (filterType === "Active") {
    let active = array.filter((item) => item.completed === false);
    // console.log(active);
    render(active);
  } else if (filterType === "Completed") {
    let completed = array.filter((item) => item.completed === true);
    // console.log(completed);
    render(completed);
  }
}

function delTask(i) {
  array.splice(i, 1);
  render(array);
}

function completeTask(i) {
  array[i].completed = !array[i].completed;
  render(array);
}

addBtn.addEventListener("click", () => {
  addTask();
});

inputBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

activeTask.addEventListener("click", () => {
  filter("Active");
});

allTask.addEventListener("click", () => {
  filter("All");
});

completedTask.addEventListener("click", () => {
  filter("Completed");
});

clearCompletedTask.addEventListener("click", () => {
  // array = array.filter((item) => item.completed !== true);   //let array

  //const array
  array.forEach((item, ind) => {
    if (item.completed) {
      array.splice(ind, 1);
    }
  });
  render(array);
});
