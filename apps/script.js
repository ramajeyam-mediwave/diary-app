let favdiary = [];

function makediaryDiv(diary) {
  const div = document.createElement("div");
  div.setAttribute("class", "diary-card");
  const id = `diary-${diary["id"]}`;
  div.setAttribute("id", id);

  const textDiv = document.createElement("div");
  textDiv.setAttribute("class", "textDiv");
  div.appendChild(textDiv);
  const h2 = document.createElement("h2");
  h2.innerText = diary["diary_date"];
  //   date.innerText = reverseDate(diary["diary_date"])

  const h3 = document.createElement("h3");
  h3.innerText = diary["diary_steps"];

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", function () {
    removediary(diary["id"]);
  });

  textDiv.appendChild(h2);
  textDiv.appendChild(h3);
  textDiv.appendChild(deleteBtn);

  return div;
}

function removediary(diaryId) {
  console.log("Deleting ", diaryId);
  const filteredArray = favdiary.filter((diary) => diary.id != diaryId);
  favdiary = filteredArray;

  saveToLocalStorage();
  updatediaryListUI();
}

function updatediaryListUI() {
  clearApp();
  //sortarray();
  const diaryApp = document.querySelector("#app");
  for (let i = 0; i < favdiary.length; i++) {
    const diaryDiv = makediaryDiv(favdiary[i]);
    diaryApp.appendChild(diaryDiv);
  }
}

function adddiary(diary) {
  favdiary.push(diary);
  sortarray();
  updatediaryListUI();
  saveToLocalStorage();
}
function sortarray() {
    favdiary.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  }
  


function clear() {
  document.querySelector("#form-div").reset();
}

function clearApp() {
  const app = document.querySelector("#app");
  app.innerHTML = "";
}

function form() {
  const form = document.querySelector("#form-div");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const date = document.querySelector("#date").value;
    const notes = document.querySelector("#notes").value;

    if (!date || !notes) {
      alert("Enter all fields");
    } else {
      const diary = {
        id: new Date().getTime(),
        diary_date: date,
        diary_steps: notes,
      };
      adddiary(diary);
      clear();
    }
  });
}

function saveToLocalStorage() {
  const str = JSON.stringify(favdiary);
  localStorage.setItem("my-diary-list", str);
}
function getFromLocalStorage() {
  const str = localStorage.getItem("my-diary-list");
  if (!str) {
    favdiary = [];
  } else {
    favdiary = JSON.parse(str);
  }
}


//   function reverseDate(date){
//     let d = date.split("-").reverse().join("-");
//     return d;
//   }

getFromLocalStorage();
updatediaryListUI();
form();
