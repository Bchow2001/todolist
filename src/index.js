import * as core from "./core_modules";
import "./style.css";
import {
	createToDoModal,
	createProjectModal,
	saveToDo,
	saveProject,
	requireInput,
	clearChecklistItems,
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
projectsDiv.classList.add("projects-wrapper");

// Add a wrapper for to do item cards
const toDoCardsWrapper = document.createElement("div");
toDoCardsWrapper.classList.add("todo-cards-wrapper");

// Add a wrapper for project description
const projectDescWrapper = document.createElement("div");
projectDescWrapper.classList.add("project-desc-wrapper");

document.body.appendChild(projectsDiv);
document.body.appendChild(projectDescWrapper);
document.body.appendChild(createNewProjectBtn);
document.body.appendChild(createNewToDoBtn);
document.body.appendChild(toDoCardsWrapper);
createToDoModal();
createProjectModal();
requireInput();

const changeCurrentProject = (i) => {
	currentProject = projects[i];
};

const displayProjects = () => {
	const projectsDiv = document.querySelector(".projects-wrapper");
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
				displayProjectDesc();
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
			displayToDoItems();
			displayProjectDesc();
		}),
	);
};

const displayProjectDesc = () => {
	const projectDescWrapper = document.querySelector(".project-desc-wrapper");
	projectDescWrapper.innerText = currentProject.desc;
};

const displayToDoItems = () => {
	const toDoCardsWrapper = document.querySelector(".todo-cards-wrapper");
	const toDoCardsArray = [];
	currentProject.toDoItems.forEach((item, i) => {
		const toDoCard = document.createElement("div");
		const titleDiv = document.createElement("div");
		const descDiv = document.createElement("div");
		const dueDateDiv = document.createElement("div");
		const priorityDiv = document.createElement("div");
		const checklistDiv = document.createElement("div");
		const completeDiv = document.createElement("div");
		const editItemSpan = document.createElement("span");
		const deleteItemSpan = document.createElement("span");

		// Assign data-attribute to toDo Card for reference
		toDoCard.setAttribute("data-todo", i);

		// Assign classes
		toDoCard.classList.add("todo-card");
		titleDiv.classList.add("title");
		descDiv.classList.add("desc");
		dueDateDiv.classList.add("due-date");
		priorityDiv.classList.add("priority");
		checklistDiv.classList.add("checklist");
		completeDiv.classList.add("complete");
		editItemSpan.classList.add("edit-todo");
		deleteItemSpan.classList.add("delete-todo");

		// Loop over checklist items
		item.checklist.forEach((ele) => {
			const checklistItemDivWrapper = document.createElement("div");
			const checklistItemDiv = document.createElement("div");
			const checklistItemDelete = document.createElement("span");

			checklistItemDelete.innerText = "×";
			checklistItemDiv.innerText = ele;
			checklistItemDivWrapper.appendChild(checklistItemDiv);
			checklistItemDivWrapper.appendChild(checklistItemDelete);
			checklistDiv.appendChild(checklistItemDivWrapper);
		});

		// Set div content
		titleDiv.innerText = item.title;
		descDiv.innerText = item.description;
		dueDateDiv.innerText = core.returnHumanDate(item.dueDate);
		priorityDiv.innerText = item.priority;
		completeDiv.innerText = item.complete ? "Complete" : "Incomplete";
		editItemSpan.innerText = "edit";
		deleteItemSpan.innerText = "×";

		// Edit Button Func
		editItemSpan.addEventListener("click", () => {
			editToDoItem();
		});

		// Append children to card
		toDoCard.appendChild(titleDiv);
		toDoCard.appendChild(descDiv);
		toDoCard.appendChild(dueDateDiv);
		toDoCard.appendChild(priorityDiv);
		toDoCard.appendChild(checklistDiv);
		toDoCard.appendChild(completeDiv);
		toDoCard.appendChild(editItemSpan);
		toDoCard.appendChild(deleteItemSpan);

		// Push Card to cards array
		toDoCardsArray.push(toDoCard);
	});
	toDoCardsWrapper.replaceChildren(...toDoCardsArray);
};

const defaultProject = (() => {
	const defaultProject = core.createProject(
		"Quick Notes",
		"Add your quick to dos here",
	);
	projects.push(defaultProject);
	changeCurrentProject(0);
	displayProjects();
	displayProjectDesc();
})();

const saveToDoBtnFunc = () => {
	const toDoForm = document.querySelector(".todo-form");
	const modal = document.querySelector("#todo-modal");
	const completeText = document.querySelector("#complete-checkbox-label");
	const priorityText = document.querySelector("#priority");
	if (toDoForm.checkValidity() === true) {
		currentProject.toDoItems.push(saveToDo());
		displayToDoItems();
		toDoForm.reset();
		modal.style.display = "none";
		completeText.innerText = "Incomplete";
		priorityText.innerText = "Normal Priority";
		clearChecklistItems();
	} else {
		toDoForm.reportValidity();
	}
};

const addToDo = (() => {
	const saveToDoBtn = document.querySelector("#save-todo");
	saveToDoBtn.addEventListener("click", () => {
		saveToDoBtnFunc();
	});
})();

const editToDoItem = () => {
	const modal = document.querySelector("#todo-modal");
	modal.style.display = "block";
};

const saveProjectBtnFunc = () => {
	const projectForm = document.querySelector(".project-form");
	const modal = document.querySelector("#project-modal");
	if (projectForm.checkValidity() === true) {
		modal.style.display = "none";
		projects.push(saveProject());
		changeCurrentProject(projects.length - 1);
		displayProjects();
		displayProjectDesc();
	} else {
		projectForm.reportValidity();
	}
};

const addProject = (() => {
	const saveProjectBtn = document.querySelector("#save-project");
	saveProjectBtn.addEventListener("click", () => {
		saveProjectBtnFunc();
	});
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
