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

let projects = [];

let currentProject = projects[0];
let editItem;

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

// Add a clear data button
const clearDataNode = document.createElement("button");
clearDataNode.innerText = "Clear All Data";
clearDataNode.setAttribute("id", "clear-data");

document.body.appendChild(projectsDiv);
document.body.appendChild(projectDescWrapper);
document.body.appendChild(createNewProjectBtn);
document.body.appendChild(createNewToDoBtn);
document.body.appendChild(toDoCardsWrapper);
document.body.appendChild(clearDataNode);
createToDoModal();
createProjectModal();
requireInput();

const saveToDoBtn = document.querySelector("#save-todo");
const saveProjectBtn = document.querySelector("#save-project");
const clearDataBtn = document.querySelector("#clear-data");

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
		item.checklist.forEach((ele, i) => {
			const checklistItemDivWrapper = document.createElement("div");
			const checklistItemDiv = document.createElement("div");
			const checklistItemDelete = document.createElement("span");

			checklistItemDivWrapper.setAttribute("data-checklist", i);

			checklistItemDelete.innerText = "×";

			checklistItemDelete.addEventListener("click", (e) => {
				e.stopPropagation();
				const eCheckIndex =
					e.currentTarget.parentNode.getAttribute("data-checklist");
				const eIndex =
					e.currentTarget.parentNode.parentNode.parentNode.getAttribute(
						"data-todo",
					);
				currentProject.toDoItems[eIndex].checklist.splice(
					eCheckIndex,
					1,
				);
				displayToDoItems();
			});
			checklistItemDiv.innerText = ele;
			checklistItemDivWrapper.appendChild(checklistItemDiv);
			checklistItemDivWrapper.appendChild(checklistItemDelete);
			checklistDiv.appendChild(checklistItemDivWrapper);
		});

		// Set div content
		titleDiv.innerText = item.title;
		descDiv.innerText = item.description;
		dueDateDiv.innerText = core.returnHumanDate(
			core.combineDateTime(item.dueDate, item.dueTime),
		);
		priorityDiv.innerText = item.priority;
		completeDiv.innerText = item.complete ? "Complete" : "Incomplete";
		editItemSpan.innerText = "edit";
		deleteItemSpan.innerText = "×";

		// Edit Button Func
		editItemSpan.addEventListener("click", (e) => {
			const toDoModal = document.querySelector("#todo-modal");
			toDoModal.style.display = "block";
			editItem = e.currentTarget.parentNode.getAttribute("data-todo");
			saveToDoBtn.removeEventListener("click", saveToDoBtnFunc);
			saveToDoBtn.addEventListener("click", editToDoItem, { once: true });
		});

		deleteItemSpan.addEventListener("click", (e) => {
			e.stopPropagation();
			const eIndex = e.currentTarget.parentNode.getAttribute("data-todo");
			currentProject.toDoItems.splice(eIndex, 1);
			displayToDoItems();
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

const saveProjectBtnFunc = () => {
	const projectForm = document.querySelector(".project-form");
	const modal = document.querySelector("#project-modal");
	if (projectForm.checkValidity() === true) {
		modal.style.display = "none";
		projects.push(saveProject());
		localStorage.setItem("projectStorage", JSON.stringify(projects));
		changeCurrentProject(projects.length - 1);
		displayProjects();
		displayProjectDesc();
	} else {
		projectForm.reportValidity();
	}
};

const saveToDoBtnFunc = () => {
	const toDoForm = document.querySelector(".todo-form");
	if (toDoForm.checkValidity() === true) {
		currentProject.toDoItems.push(saveToDo());
		localStorage.setItem("projectStorage", JSON.stringify(projects));
		displayToDoItems();
		resetModal();
	} else {
		toDoForm.reportValidity();
	}
};

const editToDoItem = () => {
	const toDoForm = document.querySelector(".todo-form");
	if (toDoForm.checkValidity() === true) {
		currentProject.toDoItems[editItem] = saveToDo();
		saveToDoBtn.addEventListener("click", saveToDoBtnFunc);
		localStorage.setItem("projectStorage", JSON.stringify(projects));
		displayToDoItems();
		resetModal();
	} else {
		toDoForm.reportValidity();
	}
};

const resetModal = () => {
	const toDoForm = document.querySelector(".todo-form");
	const modal = document.querySelector("#todo-modal");
	const completeText = document.querySelector("#complete-checkbox-label");
	const priorityText = document.querySelector("#priority");
	toDoForm.reset();
	modal.style.display = "none";
	completeText.innerText = "Incomplete";
	priorityText.innerText = "Normal Priority";
	clearChecklistItems();
};

const clearData = () => {
	localStorage.clear();
	location.reload();
};

const defaultProjectFunc = (() => {
	const defaultProject = core.createProject(
		"Quick Notes",
		"Add your quick to dos here",
	);
	projects.push(defaultProject);
	changeCurrentProject(0);
	displayProjects();
	displayProjectDesc();
})();

const retrieveData = (() => {
	if (localStorage.getItem("projectStorage") !== null) {
		projects = JSON.parse(localStorage.getItem("projectStorage"));
		currentProject = projects[0];
		displayProjects();
		displayProjectDesc();
		displayToDoItems();
	}
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
		spans[i].onclick = () => {
			modals.forEach((item, i) => {
				if (typeof modals[i].style !== "undefined") {
					modals[i].style.display = "none";
					saveToDoBtn.removeEventListener("click", editToDoItem);
					saveToDoBtn.addEventListener("click", saveToDoBtnFunc);
				}
			});
			alert("Item not saved, please press the save button");
			resetModal();
		};
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = (event) => {
		if (event.target.classList.contains("modal")) {
			modals.forEach((item, i) => {
				if (typeof modals[i].style !== "undefined") {
					modals[i].style.display = "none";
					saveToDoBtn.removeEventListener("click", editToDoItem);
					saveToDoBtn.addEventListener("click", saveToDoBtnFunc);
				}
			});
			alert("Item not saved, please press the save button");
			resetModal();
		}
	};
})();

saveToDoBtn.addEventListener("click", saveToDoBtnFunc);
saveProjectBtn.addEventListener("click", saveProjectBtnFunc);
clearDataBtn.addEventListener("click", clearData);

displayProjects();
displayProjectDesc();
displayToDoItems();
