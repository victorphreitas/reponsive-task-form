//get the elements
const form = document.querySelector(".form");
const textInput = document.querySelector(".text-input");
const filterInput = document.querySelector(".filter-input");
const submitButton = document.querySelector(".submit-button");
const ul = document.querySelector(".container");
const clearButton = document.querySelector(".clear-tasks");

//load event listeners
function loadEvents() { 
form.addEventListener("submit", addTask);
document.addEventListener("DOMContentLoaded", loadContent);
clearButton.addEventListener("click", clearTasks);
filterInput.addEventListener("keyup", filterTasks);
}
loadEvents();


function addTask(e){
  let text = textInput.value;

  if (textInput.value !== ""){
  
  //create li elements
  const li = document.createElement("li");
  //give it a class of container item
  li.className = "list-group-item list-group-item-info container-item";
  //append the variable text into it
  li.innerText = text.toLowerCase();
 
  //create a button to delete it 
  const deleteButton = document.createElement("button");
  //append a class to it 
  deleteButton.className = "close";
  //append attributes
  deleteButton.setAttribute("type", "button");
  deleteButton.setAttribute("aria-label", "Close");
  //append an element into it 
  const deleteSpan = document.createElement("span");
  //append atributes 
  deleteSpan.setAttribute("aria-hidden", "true");
  //apend a value
  deleteSpan.innerHTML = "&times;";
  //append span into delete button
  deleteButton.appendChild(deleteSpan);
  //append span into li 
  li.appendChild(deleteButton);
  
  //append it into our ul 
  ul.appendChild(li);
  //adding it into local storage
  addIntoLocal(text.toLowerCase());
  //erasing the text input
  textInput.value = "";

  //event listener on deleting item by item
  deleteButton.addEventListener("click", function(e){
      //I need to delete the parent of the delete button. I mean the correct parent. 
      let confirmation = confirm("Press OK to delete PERMANENTLY\nPress CANCEL to delete TEMPORARILY.");

      if (confirmation === false){
        ul.removeChild(deleteButton.parentElement);
      } else {
        let task;
        if (localStorage.getItem("tasks") === null){
          task = [];
        } else {
          task = JSON.parse(localStorage.getItem("tasks"));
        }
         
        task.forEach(function(item, index){
          if (item + "×" === deleteButton.parentElement.textContent){
            task.splice(index, 1);
          }
        })

        localStorage.setItem("tasks", JSON.stringify(task));
        ul.removeChild(deleteButton.parentElement);
      }
    
      e.preventDefault();
  });
  e.preventDefault();
 } else {
   //create a new li item type alert
   const warning = document.createElement("li")
   //append a class to it 
   warning.className = "list-group-item container-item alert alert-warning"
   //adding text into it 
   warning.innerText = "WARNING: You should add a task!"
   //appending it to its parent
   ul.appendChild(warning)
   setTimeout(()=>{
     warning.remove()
   },3500)
   e.preventDefault();
 }
}


function addIntoLocal(text){
  let tasksArray;
  if (localStorage.getItem("tasks") === null){
    tasksArray = [];
  } else {
    tasksArray = JSON.parse(localStorage.getItem("tasks"));
  }
  tasksArray.push(text);
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}


function loadContent(e){

  let taskArray =  JSON.parse(localStorage.getItem("tasks"));
  if (taskArray.length != null){ 
      for(let i = 0; i < taskArray.length; i++){ 
        //create li elements
        const li = document.createElement("li");
        //give it a class of container item
        li.className = "list-group-item list-group-item-info container-item";
        //append the variable text into it
        li.innerText = taskArray[i].toLowerCase();

        //create a button to delete it 
        const deleteButton = document.createElement("button");
        //append a class to it 
        deleteButton.className = "close";
        //append attributes
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("aria-label", "Close");
        //append an element into it 
        const deleteSpan = document.createElement("span");
        //append atributes 
        deleteSpan.setAttribute("aria-hidden", "true");
        //apend a value
        deleteSpan.innerHTML = "&times;";
        //append span into delete button
        deleteButton.appendChild(deleteSpan);
        //append span into li 
        li.appendChild(deleteButton);
        //append it into our ul 
        ul.appendChild(li);
        //event listener on deleting item by item
        deleteButton.addEventListener("click", function(e){
          //I need to delete the parent of the delete button. I mean the correct parent. 
          
          let confirmation = confirm("Press OK to delete PERMANENTLY\nPress CANCEL to delete TEMPORARILY.");

          if (confirmation === false){
            ul.removeChild(deleteButton.parentElement);
          } else {
            let task;
            if (localStorage.getItem("tasks") === null){
              task = [];
            } else {
              task = JSON.parse(localStorage.getItem("tasks"));
            }
             
            task.forEach(function(item, index){
              if (item + "×" === deleteButton.parentElement.textContent){
                task.splice(index, 1);
              }
            })
    
            localStorage.setItem("tasks", JSON.stringify(task));
            ul.removeChild(deleteButton.parentElement);
          }
        
          e.preventDefault();
      });
      }
  }


  e.preventDefault();
}

function clearTasks(e){

  const liAll = document.querySelectorAll(".container-item");
 
  liAll.forEach(function(element){
    ul.removeChild(element)
  })

  localStorage.clear("tasks");

  e.preventDefault();

}

function filterTasks(e){
  const filteringText = e.target.value.toLowerCase();

  for(let i = 0; i < document.querySelectorAll(".container-item").length; i++){ 
      const textInsideLi = document.querySelectorAll(".container-item")[i].innerText;
      const listItself = document.querySelectorAll(".container-item")[i];
      
      if (textInsideLi.indexOf(filteringText) !== -1){
        listItself.style.display = "block";
      } else {
        listItself.style.display = "none";
      }
 }

  e.preventDefault();
}

function deleteParentList(e){
  //I need to delete the parent of the delete button. I mean the correct parent. 
  
  ul.removeChild(document.querySelector(".container-item"));

  e.preventDefault();
}