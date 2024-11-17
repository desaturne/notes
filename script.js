const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes= document.querySelectorAll(".input-box");

function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes");
}

function updateStorage(){
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", ()=>{
    let noteWrapper = document.createElement("div");
    let inputBox = document.createElement("p");
    let img = document.createElement("img");

    noteWrapper.className = "note-wrapper"; // Add a class for styling if needed
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";

    // Append inputBox and img to the wrapper, then append the wrapper to notesContainer
    noteWrapper.appendChild(inputBox);
    noteWrapper.appendChild(img);
    notesContainer.appendChild(noteWrapper);

    updateStorage();
})

notesContainer.addEventListener("click", function(e){
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updateStorage();
    }
    else if(e.target.tagName === "P"){
        notes= document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function(){
                updateStorage();
            }
        })
    }
})

document.addEventListener("keydown", event =>{
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})

showNotes();