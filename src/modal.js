import { createToDo, createProject } from "./core_modules";

// form input creation function
const createInput = (type, id, labelDisplay, divClass, placeHolder) => {
	const inputDiv = document.createElement("div");
	inputDiv.classList.add(divClass);
	const label = document.createElement("label");
	const input = document.createElement("input");
	// set label attributes
	label.setAttribute("for", id);
	label.innerText = labelDisplay;
	// set input attributes
	input.setAttribute("type", type);
	input.setAttribute("id", id);
	input.setAttribute("name", id);
	input.setAttribute("placeholder", placeHolder);
	// return
	inputDiv.appendChild(label);
	inputDiv.appendChild(input);
	return inputDiv;
};

// form textarea creation function
const createTextArea = (id, labelDisplay, divClass, placeHolder) => {
	const textAreaDiv = document.createElement("div");
	textAreaDiv.classList.add(divClass);
	const label = document.createElement("label");
	const textArea = document.createElement("textarea");
	// set label attributes
	label.setAttribute("for", id);
	label.innerText = labelDisplay;
	// set text area attributes
	textArea.setAttribute("id", id);
	textArea.setAttribute("name", id);
	textArea.setAttribute("placeholder", placeHolder);
	// return
	textAreaDiv.appendChild(label);
	textAreaDiv.appendChild(textArea);
	return textAreaDiv;
};

// form slider creation function
const createSlider = (id, labelDisplay, value, min, max, divClass) => {
	const sliderDiv = document.createElement("div");
	sliderDiv.classList.add(divClass);
	const label = document.createElement("label");
	const slider = document.createElement("input");
	// set label attributes
	label.setAttribute("for", id);
	label.innerText = labelDisplay;
	// set slider attributes
	slider.setAttribute("type", "range");
	slider.setAttribute("id", id);
	slider.setAttribute("name", id);
	slider.setAttribute("value", value);
	slider.setAttribute("min", min);
	slider.setAttribute("max", max);
	// return
	sliderDiv.appendChild(label);
	sliderDiv.appendChild(slider);
	return sliderDiv;
};

// Dynamic response functions

// Change displayed priority based on slider
const displayPriority = () => {
	const priorityDiv = document.querySelector("#priority");
	switch (Number(document.querySelector("#todo-prio").value)) {
		case 1:
			priorityDiv.innerText = "Lowest Priority";
			break;
		case 2:
			priorityDiv.innerText = "Low Priority";
			break;
		case 3:
			priorityDiv.innerText = "Normal Priority";
			break;
		case 4:
			priorityDiv.innerText = "High Priority";
			break;
		case 5:
			priorityDiv.innerText = "Highest Priority";
			break;
		default:
			priorityDiv.innerText = "Normal Priority";
			break;
	}
};

// Add checklist items based on user input
const addChecklistItem = () => {
	const checklist = document.querySelector("ul.checklist");
	const checklistInput = document.querySelector("#add-checklist");
	const checklistInputDiv = document.querySelector("#checklist-input-div");

	if (/\S/.test(checklistInput.value)) {
		const checklistItemWrapper = document.createElement("li");
		const checklistItemLabel = document.createElement("label");
		const checklistItemBox = document.createElement("input");
		const deleteCheckListItem = document.createElement("span");

		checklistItemWrapper.classList.add("checklist-item");

		checklistItemLabel.setAttribute("for", checklistInput.value);
		checklistItemLabel.classList.add("checklist-item-label");
		checklistItemLabel.innerText = checklistInput.value;

		checklistItemBox.setAttribute("type", "checkbox");
		checklistItemBox.setAttribute("id", checklistInput.value);
		checklistItemBox.setAttribute("name", checklistInput.value);

		deleteCheckListItem.classList.add("delete-checklist-item");
		deleteCheckListItem.addEventListener("click", () => {
			checklistItemWrapper.remove();
		});
		deleteCheckListItem.innerText = "×";

		checklistItemWrapper.appendChild(checklistItemLabel);
		checklistItemWrapper.appendChild(checklistItemBox);
		checklistItemWrapper.appendChild(deleteCheckListItem);

		checklist.insertBefore(checklistItemWrapper, checklistInputDiv);
	}
	checklistInput.value = "";
};

const clearChecklistItems = () => {
	document.querySelectorAll(".checklist-item").forEach((e) => e.remove());
};

// Change complete status
const changeComplete = () => {
	const completeCheckboxLabel = document.querySelector(
		"#complete-checkbox-label",
	);

	completeCheckboxLabel.innerText =
		completeCheckboxLabel.innerText === "Complete"
			? "Incomplete"
			: "Complete";
};

// create to do modal
const createToDoModal = () => {
	const modalWrapper = document.createElement("div");
	const modalForm = document.createElement("form");
	modalWrapper.classList.add("modal");
	modalWrapper.setAttribute("id", "todo-modal");
	modalForm.classList.add("todo-form");

	const closeModal = document.createElement("span");
	closeModal.classList.add("close");
	closeModal.innerText = "×";
	modalForm.appendChild(closeModal);

	const toDoTitle = createInput(
		"text",
		"todo-title",
		"What's the to do item?",
		"todo-title-div",
		"Buy Milk",
	);

	const toDoDesc = createTextArea(
		"todo-desc",
		"Description",
		"todo-desc-div",
		"Go to Lidl not Waitrose as the milk there is more expensive",
	);

	const toDoDate = createInput("date", "todo-date", "Date", "todo-date-div");
	const toDoTime = createInput("time", "todo-time", "Time", "todo-time-div");

	const toDoPrio = createSlider(
		"todo-prio",
		"Set the priority",
		3,
		1,
		5,
		"todo-prio-div",
	);

	const priorityDisplay = (() => {
		const priorityDiv = document.createElement("div");
		priorityDiv.setAttribute("id", "priority");
		priorityDiv.innerText = "Normal Priority";
		return priorityDiv;
	})();

	const addChecklist = (() => {
		const checklistDiv = document.createElement("div");
		checklistDiv.classList.add("todo-checklist");
		const checklistInputDiv = document.createElement("div");
		checklistInputDiv.setAttribute("id", "checklist-input-div");
		const checklist = document.createElement("ul");
		const checklistBtn = document.createElement("button");
		checklistBtn.setAttribute("id", "checklist-btn");
		checklistBtn.setAttribute("type", "button");
		checklistBtn.innerText = "+";
		checklist.classList.add("checklist");
		const checklistInput = createInput(
			"text",
			"add-checklist",
			"Add a new checklist item",
			"add-checklist-div",
			"Milk",
		);
		checklistInputDiv.appendChild(checklistBtn);
		checklistInputDiv.appendChild(checklistInput);
		checklist.appendChild(checklistInputDiv);
		checklistDiv.appendChild(checklist);

		return checklistDiv;
	})();

	const addCompleteCheck = (() => {
		const completeDiv = document.createElement("div");
		const completeCheckboxLabel = document.createElement("label");
		const completeCheckbox = document.createElement("input");

		completeDiv.classList.add("todo-complete");
		completeCheckboxLabel.setAttribute("for", "complete-checkbox");
		completeCheckboxLabel.setAttribute("id", "complete-checkbox-label");
		completeCheckboxLabel.innerText = "Incomplete";

		completeCheckbox.setAttribute("type", "checkbox");
		completeCheckbox.setAttribute("id", "complete-checkbox");
		completeCheckbox.setAttribute("name", "complete-checkbox");

		completeDiv.appendChild(completeCheckboxLabel);
		completeDiv.appendChild(completeCheckbox);

		return completeDiv;
	})();

	const addSaveToDoBtn = (() => {
		const saveToDoBtn = document.createElement("button");
		saveToDoBtn.setAttribute("type", "button");
		saveToDoBtn.setAttribute("id", "save-todo");
		saveToDoBtn.innerText = "Save Item";
		return saveToDoBtn;
	})();

	modalForm.appendChild(toDoTitle);
	modalForm.appendChild(toDoDesc);
	modalForm.appendChild(toDoDate);
	modalForm.appendChild(toDoTime);
	modalForm.appendChild(toDoPrio);
	modalForm.appendChild(priorityDisplay);
	modalForm.appendChild(addChecklist);
	modalForm.appendChild(addCompleteCheck);
	modalForm.appendChild(addSaveToDoBtn);
	modalWrapper.appendChild(modalForm);
	document.body.appendChild(modalWrapper);

	const prioSlider = document.querySelector("#todo-prio");
	const checklistBtn = document.querySelector("#checklist-btn");
	const completeCheckbox = document.querySelector("#complete-checkbox");

	prioSlider.addEventListener("input", displayPriority);
	checklistBtn.addEventListener("click", addChecklistItem);
	completeCheckbox.addEventListener("change", changeComplete);
};

// function to create project modal
const createProjectModal = () => {
	const modalWrapper = document.createElement("div");
	const modalForm = document.createElement("form");
	modalWrapper.classList.add("modal");
	modalWrapper.setAttribute("id", "project-modal");
	modalForm.classList.add("project-form");

	const closeModal = document.createElement("span");
	closeModal.classList.add("close");
	closeModal.innerText = "×";
	modalForm.appendChild(closeModal);

	const projectTitle = createInput(
		"text",
		"project-title",
		"What's the new project?",
		"project-title-div",
		"Chores",
	);

	const projectDesc = createTextArea(
		"project-desc",
		"Project Description",
		"project-desc-div",
		"Short Description of your project",
	);

	const addSaveProjectBtn = (() => {
		const saveProjectBtn = document.createElement("button");
		saveProjectBtn.setAttribute("type", "button");
		saveProjectBtn.setAttribute("id", "save-project");
		saveProjectBtn.innerText = "Save New Project";
		return saveProjectBtn;
	})();

	modalForm.appendChild(projectTitle);
	modalForm.appendChild(projectDesc);
	modalForm.appendChild(addSaveProjectBtn);
	modalWrapper.appendChild(modalForm);
	document.body.appendChild(modalWrapper);
};

// function to make inputs required
const requireInput = () => {
	const toDoTitleInput = document.querySelector("#todo-title");
	const toDoDateInput = document.querySelector("#todo-date");
	const toDoTimeInput = document.querySelector("#todo-time");
	const projectTitleInput = document.querySelector("#project-title");
	const requiredInputs = [
		toDoTitleInput,
		toDoDateInput,
		toDoTimeInput,
		projectTitleInput,
	];
	requiredInputs.forEach((item) => {
		item.required = true;
	});
};

// Function to save project input data to a project item
const saveProject = () => {
	const projectForm = document.querySelector(".project-form");
	const projectTitle = document.querySelector("#project-title").value;
	const projectDesc = document.querySelector("#project-desc").value;
	projectForm.reset();
	return createProject(projectTitle, projectDesc);
};

// function to save form input data to an to-do item
const saveToDo = () => {
	const title = document.querySelector("#todo-title").value;
	const description = document.querySelector("#todo-desc").value;
	const dueDate = document.querySelector("#todo-date").value;
	const dueTime = document.querySelector("#todo-time").value;
	const priority = document.querySelector("#priority").innerText;
	const checklist = (() => {
		const checklistItems = document.querySelectorAll(
			".checklist-item-label",
		);
		const checklistArray = [];
		checklistItems.forEach((item) => {
			checklistArray.push(item.innerText);
		});
		return checklistArray;
	})();
	const complete = document.querySelector("#complete-checkbox").checked;

	const newToDo = createToDo(
		title,
		description,
		dueDate,
		dueTime,
		priority,
		checklist,
		complete,
	);
	return newToDo;
};

export {
	createToDoModal,
	createProjectModal,
	saveToDo,
	saveProject,
	requireInput,
	clearChecklistItems,
};
