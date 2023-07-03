import * as core from "./core_modules";
import "./style.css";
import {
	createToDoModal,
	createProjectModal,
	saveToDo,
	saveProject,
	requireInput,
} from "./modal";

const projects = [];
let currentProject = projects[0];

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

// Add a projects div
const projectsDiv = document.createElement("div");
projectsDiv.classList.add("projects");

document.body.appendChild(createNewProjectBtn);
document.body.appendChild(createNewToDoBtn);
document.body.appendChild(projectsDiv);
createToDoModal();
createProjectModal();
requireInput();

const changeCurrentProject = (i) => {
	currentProject = projects[i];
};

const addToDoItem = (() => {
	const saveToDoBtn = document.querySelector("#save-todo");
	const toDoForm = document.querySelector(".todo-form");
	const modal = document.querySelector("#todo-modal");
	const completeText = document.querySelector("#complete-checkbox-label");
	saveToDoBtn.addEventListener("click", () => {
		if (toDoForm.checkValidity() === true) {
			currentProject.toDoItems.push(saveToDo());
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
	const modal = document.querySelector("#project-modal");
	saveProjectBtn.addEventListener("click", () => {
		if (projectForm.checkValidity() === true) {
			modal.style.display = "none";
			projects.push(saveProject());
			changeCurrentProject(projects.length - 1);
			displayProjects();
		} else {
			projectForm.reportValidity();
		}
	});
})();

const displayProjects = () => {
	const projectsDiv = document.querySelector(".projects");
	const projectsArray = [];
	projects.forEach((item, i) => {
		const projectItemDiv = document.createElement("div");
		const deleteProjectItemBtn = document.createElement("span");

		projectItemDiv.classList.add("project-item");
		projectItemDiv.setAttribute("data-key", i);
		projectItemDiv.innerText = item.title;

		if (i > 0) {
			deleteProjectItemBtn.innerText = "×";
			deleteProjectItemBtn.addEventListener("click", (e) => {
				e.stopPropagation();
				const eKey =
					e.currentTarget.parentNode.getAttribute("data-key");
				changeCurrentProject(eKey - 1);
				projects.splice(eKey, 1);
				displayProjects();
			});
		}

		projectItemDiv.appendChild(deleteProjectItemBtn);
		projectsArray.push(projectItemDiv);
	});
	projectsDiv.replaceChildren(...projectsArray);
	addProjectEventListener();
};

const addProjectEventListener = () => {
	const projectDiv = document.querySelectorAll(".project-item");
	projectDiv.forEach((el) =>
		el.addEventListener("click", (event) => {
			changeCurrentProject(event.target.getAttribute("data-key"));
		}),
	);
};

const defaultProject = (() => {
	const defaultProject = core.createProject(
		"Quick Notes",
		"Add your quick to dos here",
	);
	projects.push(defaultProject);
	changeCurrentProject(0);
	displayProjects();
})();

const modalFunc = (() => {
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
})();
