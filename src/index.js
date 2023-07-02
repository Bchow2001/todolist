import * as core from "./core_modules";
import "./style.css";
import {
	createToDoModal,
	createProjectModal,
	saveToDo,
	requireInput,
} from "./modal";

// Add a new project button
const createNewProjectBtn = document.createElement("button");
createNewProjectBtn.classList.add("modal-button");
createNewProjectBtn.setAttribute("href", "#project-modal");
createNewProjectBtn.innerText = "Add a new project";

// Add To Do Button
const createNewToDoBtn = document.createElement("button");
createNewToDoBtn.classList.add("modal-button");
createNewToDoBtn.setAttribute("href", "#todo-modal");
createNewToDoBtn.innerText = "Add a new to do item";

document.body.appendChild(createNewProjectBtn);
document.body.appendChild(createNewToDoBtn);
createToDoModal();
createProjectModal();
requireInput();

const addToDoItem = (() => {
	const saveToDoBtn = document.querySelector("#save-todo");
	const toDoForm = document.querySelector(".todo-form");
	const modal = document.querySelector(".modal");
	const completeText = document.querySelector("#complete-checkbox-label");
	saveToDoBtn.addEventListener("click", () => {
		if (toDoForm.checkValidity() === true) {
			console.log(saveToDo());
			modal.style.display = "none";
			completeText.innerText = "Incomplete";
		} else {
			toDoForm.reportValidity();
		}
	});
})();

const addProject = (() => {
	const saveProjectBtn = document.querySelector("#save-project");
	const projectForm = document.querySelector(".project-form");
	const modal = document.querySelector(".modal");
	saveProjectBtn.addEventListener("click", () => {
		modal.style.display = "none";
		projectForm.reset();
	});
})();

const btn = document.querySelectorAll("button.modal-button");

// All page modals
const modals = document.querySelectorAll(".modal");

// Get the <span> element that closes the modal
const spans = document.getElementsByClassName("close");

btn.forEach((item) => {
	item.onclick = (e) => {
		e.preventDefault();
		const modal = document.querySelector(e.target.getAttribute("href"));
		modal.style.display = "block";
	};
});

// When the user clicks on <span> (x), close the modal
for (let i = 0; i < spans.length; i++) {
	spans[i].onclick = function () {
		for (const index in modals) {
			if (typeof modals[index].style !== "undefined")
				modals[index].style.display = "none";
		}
		alert("Item not saved, please press the save button");
	};
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target.classList.contains("modal")) {
		for (const index in modals) {
			if (typeof modals[index].style !== "undefined")
				modals[index].style.display = "none";
		}
		alert("Item not saved, please press the save button");
	}
};
