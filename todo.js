'use strict';

const toDoForm = document.querySelector(".js-todo");
const toDoInput = toDoForm.querySelector("input");
const toDoContinue = document.querySelector(".todo-continue");

const CONTINUE_LS = "continue"; //로컬스토리지의 key값

let continueToDos = [];

//html에 리스트 없어져야 함
//로컬스토리지에서도 없어져야 함
function deleteToDo(event){
  const btn = event.target;
  const li = btn.parentNode;
  toDoContinue.removeChild(li);
  const cleanToDos = continueToDos.filter(function(toDo) {
      return toDo.id !== parseInt(li.id);
  });
  console.log(cleanToDos);
  continueToDos = cleanToDos;
  saveContinue();
}

function saveContinue(){
  localStorage.setItem(CONTINUE_LS,JSON.stringify(continueToDos));  //setItem(key,value) 인자 2개 넣어줘야함.
}

function paintToDo(text){
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");  
  const newId = continueToDos.length + 1; //push로 요소를 넣어주기전 배열의 길이가 0이어서 id도 0으로 출력되는데 push해준 다음에 배열에 요소가 있을 때의 길이와 처음 시작의 길이를 맞추기 위해서 +1을 함.
  deleteBtn.innerText="📝"
  deleteBtn.addEventListener("click",deleteToDo);
  span.innerText = text;
  li.appendChild(deleteBtn);
  li.appendChild(span);
  li.id = newId;
  toDoContinue.appendChild(li);
  const continueObj = {
    id : newId,
    text : text
  }
  continueToDos.push(continueObj);
  saveContinue();
}

function handleToDo(event) {  
  event.preventDefault();
  const inputValue = toDoInput.value;
  paintToDo(inputValue);
  toDoInput.value = "";
}

//로컬스토리지에 저장된 값이 있다면 화면에 value의 text 값을 보여준다.
function toDoList() {
  const loadContinue = localStorage.getItem(CONTINUE_LS);
  if( loadContinue !== null){
    const parsedContinue = JSON.parse(loadContinue);
    parsedContinue.forEach(element => {
      paintToDo(element.text);  //오브젝트의 텍스트 값만 나열해주기 위해 .text 
    });
  }
}

function init(){
  toDoList();
  toDoForm.addEventListener("submit",handleToDo); //form에 이벤트리스너 먹여야 함.
}

init();