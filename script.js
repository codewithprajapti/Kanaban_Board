const addBoardBtn = document.querySelector(".add_board_btn");
const mainContainer = document.querySelector(".main_container");
const addTaskBtn = document.querySelector(".add_task_btn");
const mainBoard = document.querySelector("#board1");
const allBoards = document.querySelectorAll(".board");
const allCards = document.querySelectorAll(".cards");

addTaskBtn.addEventListener("click", addNewTask);

addBoardBtn.addEventListener("click", () => {
  const inputBoardName = prompt("Enter Board Name");
  if (!inputBoardName) return;
  const newBoard = document.createElement("div");
  newBoard.classList.add("board");
  mainContainer.appendChild(newBoard);
  const boardTitle = document.createElement("h3");
  boardTitle.classList.add("board_title");
  newBoard.appendChild(boardTitle);
  boardTitle.innerText = inputBoardName;
  newBoard.addEventListener("dragover", () => {
    boardDragOver(newBoard);
  });
});

function addNewTask() {
  const taskText = prompt("Enter Your Task");
  if (!taskText) return;

  const cardMain = document.createElement("div");
  cardMain.classList.add("cards");
  cardMain.setAttribute("draggable", true);
  // console.log(cardMain)

  //Card Text Create

  const cardText = document.createElement("div");
  cardText.classList.add("card_text");
  cardMain.appendChild(cardText);
  cardText.innerText = taskText;

  //Card Input Create

  const cardInput = document.createElement("input");
  cardInput.classList.add("card_input");

  //Card Button Container Create

  const cardBtnContaioner = document.createElement("div");
  cardBtnContaioner.classList.add("card_btn_con");
  cardMain.appendChild(cardBtnContaioner);

  // Card Edit Button Create

  const cardEditBtn = document.createElement("button");
  cardEditBtn.classList.add("card_edit_btn");
  cardEditBtn.innerText = "Edit";

  const editIcon = document.createElement("i");
  editIcon.className = "fa-solid fa-pen fa-lg";
  editIcon.style.color = "#FFFFFF";

  cardEditBtn.appendChild(editIcon);
  cardBtnContaioner.appendChild(cardEditBtn);

  // Card Save Button Create

  const cardSaveBtn = document.createElement("button");
  cardSaveBtn.classList.add("card_save_btn");
  cardSaveBtn.innerText = "Save";

  const saveIcon = document.createElement("i");
  saveIcon.className = "fa-solid fa-check fa-lg";
  saveIcon.style.color = "#FFFFFF";

  cardSaveBtn.appendChild(saveIcon);
  cardBtnContaioner.appendChild(cardSaveBtn);

  //Card Delete Button Create

  const cardDeleteBtn = document.createElement("button");
  cardDeleteBtn.classList.add("card_delete_btn");
  cardDeleteBtn.innerText = "Dlete";

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-trash fa-lg";
  deleteIcon.style.color = "#FFFFFF";

  cardDeleteBtn.appendChild(deleteIcon);
  cardBtnContaioner.appendChild(cardDeleteBtn);

  const addTaskBtn = mainBoard.querySelector(".add_task_btn");
  mainBoard.insertBefore(cardMain, addTaskBtn);

  cardEditBtn.addEventListener("click", () => {
    editTask(cardMain, cardText, cardInput, cardEditBtn, cardSaveBtn);
  });

  cardDeleteBtn.addEventListener("click", () => {
    deleteTask(cardMain);
  });

  // Card Drag And Drop Fuctionality Add

  cardMain.addEventListener("dragstart", () => {
    console.log(cardMain)
    cardDragStart(cardMain);
  });
  cardMain.addEventListener("dragend", () => {
    cardDragEnd(cardMain);
  });
}

function editTask(cardMain, cardText, cardInput, cardEditBtn, cardSaveBtn) {
  cardMain.style.flexDirection = "column";
  cardInput.value = cardText.innerText;
  const cardTextValue = cardText.innerText;
  // console.log(cardTextValue);
  cardText.style.display = "none";
  cardInput.style.display = "block";
  cardMain.insertBefore(cardInput, cardMain.firstChild);
  cardEditBtn.style.display = "none";
  cardSaveBtn.style.display = "block";
  cardMain.insertBefore(cardSaveBtn, cardInput.nextSibling);
  cardInput.focus();
  cardSaveBtn.addEventListener("click", () => {
    saveTask(
      cardMain,
      cardText,
      cardInput,
      cardEditBtn,
      cardSaveBtn,
      cardTextValue
    );
  });
}

function saveTask(
  cardMain,
  cardText,
  cardInput,
  cardEditBtn,
  cardSaveBtn,
  cardTextValue
) {
  if (cardInput.value.length === 0) {
    cardText.innerText = cardTextValue;
    cardInput.style.display = "none";
    cardText.style.display = "block";
    cardSaveBtn.style.display = "none";
    cardEditBtn.style.display = "block";
  } else {
    cardText.innerText = cardInput.value;
    cardInput.style.display = "none";
    cardText.style.display = "block";
    cardSaveBtn.style.display = "none";
    cardEditBtn.style.display = "block";
  }
}

function deleteTask(cardMain) {
  cardMain.remove();
}

function cardDragStart(card) {
  card.classList.add("drag");
  // console.log(card);
}

function cardDragEnd(card) {
  card.classList.remove("drag");
}

function boardDragOver(board) {
  const dragableElement = document.querySelector(".drag");
  if (!dragableElement) return;
  // console.log(board)

  board.appendChild(dragableElement);
}

allCards.forEach((card) => {
  card.draggable = true;
  card.addEventListener("dragstart", () => {
    cardDragStart(card);
  });
  card.addEventListener("dragend", () => {
    cardDragEnd(card);
  });
});

allBoards.forEach((board) => {
  board.addEventListener("dragover", () => {
    boardDragOver(board);
  });
});
