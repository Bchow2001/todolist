import * as core from "./core_modules";
import "./style.css";

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

const displayPriority = () => {
	const priorityDiv = document.querySelector(".priority");
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

const addChecklistItem = () => {
	const checklist = document.querySelector(".checklist");
	const checklistInput = document.querySelector("#add-checklist");
	const checklistInputDiv = document.querySelector("#checklist-input-div");
	if (/\S/.test(checklistInput.value)) {
		const checklistItemWrapper = document.createElement("li");
		const checklistItemLabel = document.createElement("label");
		const checklistItemBox = document.createElement("input");
		checklistItemLabel.setAttribute("for", checklistInput.value);
		checklistItemLabel.innerText = checklistInput.value;
		checklistItemBox.setAttribute("type", "checkbox");
		checklistItemBox.setAttribute("id", checklistInput.value);
		checklistItemBox.setAttribute("name", checklistInput.value);

		checklistItemWrapper.appendChild(checklistItemLabel);
		checklistItemWrapper.appendChild(checklistItemBox);

		checklist.insertBefore(checklistItemWrapper, checklistInputDiv);
	}
	checklistInput.value = "";
};

// create form inputs
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
	priorityDiv.classList.add("priority");
	priorityDiv.innerText = "Normal Priority";
	return priorityDiv;
})();

const addChecklist = (() => {
	const checklistDiv = document.createElement("div");
	const checklistInputDiv = document.createElement("div");
	checklistInputDiv.setAttribute("id", "checklist-input-div");
	const checklist = document.createElement("ul");
	const checklistBtn = document.createElement("button");
	checklistBtn.setAttribute("id", "checklist-btn");
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

document.body.appendChild(toDoTitle);
document.body.appendChild(toDoDesc);
document.body.appendChild(toDoDate);
document.body.appendChild(toDoTime);
document.body.appendChild(toDoPrio);
document.body.appendChild(priorityDisplay);
document.body.appendChild(addChecklist);

const prioSlider = document.querySelector("#todo-prio");
const checklistBtn = document.querySelector("#checklist-btn");

prioSlider.addEventListener("input", displayPriority);
checklistBtn.addEventListener("click", addChecklistItem);
