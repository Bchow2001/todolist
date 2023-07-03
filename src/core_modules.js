import { format, formatDistanceToNowStrict, isFuture } from "date-fns";

// Core functions of To Do

// creates to do object with named properties
export const createToDo = (
	title,
	description,
	dueDate,
	priority,
	checklist,
	complete = false,
) => ({ title, description, dueDate, priority, checklist, complete });

// creates a project with a default to do for users to edit
// returns an array which we can append to dos to
export const createProject = (title, desc) => {
	const project = { title, desc, toDoItems: [] };
	return project;
};

// sets completeness of to do item
export const setComplete = (toDoItem) => {
	// eslint-disable-next-line no-param-reassign
	toDoItem.complete = !toDoItem.complete;
};

// sets priority of to do item
export const setPriority = (toDoItem, newPriority) => {
	toDoItem.priority = newPriority;
};

// changes state of checklist items
export const setChecklist = (toDoItem, checklistItem) => {
	if (toDoItem.checklist[checklistItem] !== undefined) {
		toDoItem.checklist[checklistItem] = toDoItem.checklist[checklistItem]
			? 0
			: 1;
	}
};

// adds checklist items
export const addChecklistItem = (toDoItem, checklistItem) => {
	if (toDoItem.checklist[checklistItem] === undefined) {
		toDoItem.checklist[checklistItem] = 0;
	} else {
		return `${checklistItem} already exists`;
	}
};

// combines date and time inputs to a date object
export const combineDateTime = (dateInput, timeInput) => {
	const dateTime = `${dateInput} ${timeInput}`;
	return new Date(dateTime);
};

// returns a human readable date for displaying due date
export const returnHumanDate = (combinedDateTime) => {
	const date = format(combinedDateTime, "do MMM yyyy");
	const time = format(combinedDateTime, "HH:mm");
	return `${date} at ${time}`;
};

// returns a human readable duration for time to due date
export const returnHumanDuration = (combinedDateTime) => {
	const duration = formatDistanceToNowStrict(combinedDateTime);
	if (isFuture(combinedDateTime)) {
		return `Due in ${duration}`;
	}
	return `Overdue by ${duration}`;
};
