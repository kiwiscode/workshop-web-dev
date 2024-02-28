console.log("Hello World!");

const participants = [
  {
    name: "Jane",
    id: "1",
    password: "Jane",
    avatarUrl: "./Jane-Doe.jpg",
  },
  {
    name: "John",
    id: "2",
    password: "John",
    avatarUrl: "./John-Doe.jpg",
  },
  {
    name: "Mariposa",
    id: "3",
    password: "Mariposa",
    avatarUrl: "./Mariposa-Luna.jpg",
  },
  {
    name: "David",
    id: "4",
    password: "David",
    avatarUrl: "./David-Brown.jpg",
  },
];

const tasks = [];

console.log("Participants =>", participants);

const logInBtn = document.getElementById("log-in-btn");
const userValidationContainer = document.querySelector(
  ".user-validation-container"
);

// start to check for check boxes
const workCheckbox = document.querySelector("#work");
const personalCheckbox = document.querySelector("#personal");
const familyCheckbox = document.querySelector("#family");
const petCheckbox = document.querySelector("#pet");

function handleCheckboxClick(clickedCheckbox) {
  const checkboxes = [
    workCheckbox,
    personalCheckbox,
    familyCheckbox,
    petCheckbox,
  ];

  checkboxes.forEach((checkbox) => {
    if (checkbox !== clickedCheckbox) {
      checkbox.checked = false;
    }
  });
}

workCheckbox.addEventListener("click", () => handleCheckboxClick(workCheckbox));
personalCheckbox.addEventListener("click", () =>
  handleCheckboxClick(personalCheckbox)
);
familyCheckbox.addEventListener("click", () =>
  handleCheckboxClick(familyCheckbox)
);
petCheckbox.addEventListener("click", () => handleCheckboxClick(petCheckbox));
// finish to check for check boxes

logInBtn.addEventListener("click", () => {
  let usernameInputField = document.getElementById("username").value;
  let passwordInputField = document.getElementById("password").value;

  const welcomeMessage = document.querySelector(".welcome-user-name");
  const addNewTaskMessage = document.querySelector(".add-new-task-message");
  const userCard = document.querySelector(".user-card");
  const userCardImg = document.querySelector(".user-card-image");

  const mainContent = document.querySelector(".main-content");
  const mainContentColumn1 = document.querySelector(".col-1");
  const mainContentColumn2 = document.querySelector(".col-2");

  const findedParticipant = participants.find((eachParticipant) => {
    return eachParticipant.name === usernameInputField;
  });

  const isPasswordMatch = findedParticipant.password === passwordInputField;

  if (findedParticipant && isPasswordMatch) {
    userValidationContainer.classList.add("hide");
    usernameInputField = "";
    passwordInputField = "";

    mainContent.classList.remove("hide");
    mainContent.style.display = "flex";
    mainContentColumn1.classList.remove("hide");
    mainContentColumn2.classList.remove("hide");

    welcomeMessage.innerHTML = "Welcome" + " " + findedParticipant.name;
    addNewTaskMessage.innerHTML =
      "Are you ready to create a new todo? Set a goal and click 'Add New Task' to get started! ✨🚀";
    userCard.classList.remove("hide");
    userCardImg.setAttribute("src", findedParticipant.avatarUrl);
  } else {
    welcomeMessage.innerHTML = "";
    alert("Invalid username or password. Please try again.");
  }
});

function renderTasks() {
  const tasksContainer = document.querySelector(".col-2");

  tasksContainer.innerHTML = "";

  tasks.forEach((eachTask, index) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
   
      <p>${eachTask.task}</p>
      <span class="type-value-${index}">${eachTask.type.value}</span>
    
    `;
    tasksContainer.appendChild(taskItem);

    const typeValue = document.querySelector(`.type-value-${index}`);
    taskItem.style.borderBottom = "1px solid rgba(0,0,0,0.1)";

    if (eachTask.type.value === "work") {
      typeValue.style.backgroundColor = "#ffff00";
      typeValue.style.color = "black";
      typeValue.style.fontWeight = 600;
    } else if (eachTask.type.value === "personal") {
      typeValue.style.backgroundColor = "#800080";
      typeValue.style.color = "white";
      typeValue.style.fontWeight = 600;
    } else if (eachTask.type.value === "family") {
      typeValue.style.backgroundColor = "#1da1f2";
      typeValue.style.color = "black";
      typeValue.style.fontWeight = 600;
    } else if (eachTask.type.value === "pet") {
      typeValue.style.backgroundColor = "#32de84";
      typeValue.style.color = "black";
      typeValue.style.fontWeight = 600;
    }
  });
}
const addNewTaskBtn = document.querySelector(".add-new-task");

addNewTaskBtn.addEventListener("click", () => {
  const newTaskValue = document.querySelector("#new-task").value;

  let workCheckBoxValue = document.querySelector("#work").checked;
  let personalCheckBoxValue = document.querySelector("#personal").checked;
  let familyCheckBoxValue = document.querySelector("#family").checked;
  let petCheckBoxValue = document.querySelector("#pet").checked;

  tasks.push({
    task: newTaskValue,
    type: {
      value: workCheckBoxValue
        ? "work"
        : "" || personalCheckBoxValue
        ? "personal"
        : "" || familyCheckBoxValue
        ? "family"
        : "" || petCheckBoxValue
        ? "pet"
        : "",
    },
  });

  console.log(
    newTaskValue,
    workCheckBoxValue,
    personalCheckBoxValue,
    familyCheckBoxValue,
    petCheckBoxValue
  );

  workCheckBoxValue = false;
  personalCheckBoxValue = false;
  familyCheckBoxValue = false;
  petCheckBoxValue = false;

  renderTasks();

  console.log("Tasks =>", tasks);
});
