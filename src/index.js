import * as core from "./core_modules";

// create Input Function
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

const toDoPrior = createSlider(
	"todo-prior",
	"Set the priority",
	3,
	1,
	5,
	"todo-prior-div",
);

document.body.appendChild(toDoTitle);

document.body.appendChild(toDoDesc);
document.body.appendChild(toDoDate);
document.body.appendChild(toDoTime);
document.body.appendChild(toDoPrior);
